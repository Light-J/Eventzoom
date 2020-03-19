import express from 'express';
import multer from 'multer';
import passport from 'passport';
import validator from '../middleware/validator';
import EventService from '../services/event.service';
import fileService from '../services/file.service';
import Event from '../models/event.model';
import authorizationService from '../services/authorization.service';
import isAllowedToView from '../middleware/isAllowedToView';
import isStaff from '../middleware/isStaff';
import cacheService from '../services/cache.service';
import isOwner from '../middleware/isOwner';
import hasCorrectToken from '../middleware/hasCorrectToken';


const router = express.Router();
const upload = multer();

router.get(
	'/send-reminders',
	hasCorrectToken,
	async (req, res) => {
		// Gets todays date and time and also todays date but till end of the day
		const startDate = new Date();
		const endDate = new Date();
		endDate.setDate(endDate.setHours(23, 59, 59, 999));
		const events = await EventService.getEventsAdvanced({ startDate, endDate }, 'date', 'asc');
		await Promise.all(events.map((event) => EventService.sendReminders(event._id)));
		res.send({ success: true });
	},
);

router.get(
	'/',
	validator('in', { field: 'sort', matches: ['date', 'attendees'] }),
	validator('in', { field: 'direction', matches: ['asc', 'desc'] }),
	passport.authenticate(['jwt', 'anonymous'], { session: false }),
	async (req, res) => {
		try {
			const { query } = req.query;
			const events = await EventService.getEvents(query, req.query.sort, req.query.direction);
			return res.send(authorizationService.filterInaccessible(events, req.user));
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.get(
	'/advanced',
	passport.authenticate(['jwt', 'anonymous'], { session: false }),
	validator('optional', { field: 'title' }),
	validator('optional', { field: 'speaker' }),
	validator('optional', { field: 'startDate' }),
	validator('optional', { field: 'endDate' }),
	validator('in', { field: 'sort', matches: ['date', 'attendees'] }),
	validator('in', { field: 'direction', matches: ['asc', 'desc'] }),
	async (req, res) => {
		try {
			const events = await EventService.getEventsAdvanced(
				req.validated,
				req.validated.sort,
				req.validated.direction,
			);
			return res.send(authorizationService.filterInaccessible(events, req.user));
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.get(
	'/:id',
	passport.authenticate(['jwt', 'anonymous'], { session: false }),
	isAllowedToView(Event, 'id'),
	async (req, res) => {
		try {
			const event = await EventService.getEventById(req.params.id);
			// eslint-disable-next-line max-len
			event.series = authorizationService.canAccessResource(event.series, req.user) ? event.series : null;
			return res.send(event);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);


router.get(
	'/:id/recommendations',
	passport.authenticate(['jwt', 'anonymous'], { session: false }),
	isAllowedToView(Event, 'id'),
	async (req, res) => {
		const userId = req.user ? req.user._id : 'anonymous';
		const event = await EventService.getEventById(req.params.id);
		const recommendations = await cacheService.remember(
			`user.${userId}.events.${event._id}.recommendations`,
			3600,
			async () => EventService.getRecommendationsForEvent(event, req.user),
		);
		res.send(recommendations);
	},
);

router.get(
	'/:id/attendees',
	passport.authenticate(['jwt'], { session: false }),
	isOwner(Event, 'id'),
	async (req, res) => {
		res.send(await EventService.getEventsAttendeesById(req.params.id));
	},
);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	isStaff,
	upload.single('file'),
	validator('required', { field: 'title' }),
	validator('required', { field: 'description' }),
	validator('required', { field: 'speaker' }),
	validator('fileSize', { file: 'file', maxSize: 1e+7 }), // 10MB
	validator('fileType', { file: 'file', types: 'image/*' }),
	validator('required', { field: 'vagueLocation' }),
	validator('required', { field: 'specificLocation' }),
	validator('required', { field: 'disabilityAccess' }),
	validator('required', { field: 'series' }),
	validator('required', { field: 'capacity' }),
	validator('required', { field: 'date' }),
	validator('optional', { field: 'restrictToSchool' }),
	validator('optional', { field: 'restrictToStaff' }),
	validator('optional', { field: 'noPublic' }),
	validator('validModel', { model: Event, excludedFields: ['image', 'organiser'] }),
	async (req, res) => {
		try {
			const location = await fileService.uploadFile(req.validated.file);
			await EventService.addEvent({
				...req.validated,
				filterable: authorizationService.generateFilterableField(req.validated, req.user),
				image: location,
				organiser: req.user._id,
			});
			return res.json({ success: true });
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.post(
	'/:id/attend',
	validator('required', { field: 'attend' }),
	passport.authenticate('jwt', { session: false }),
	isAllowedToView(Event, 'id'),
	async (req, res) => {
		try {
			const result = await EventService.attendEvent(req.params.id, req.user, req.validated.attend);
			if (!result) {
				// If the result is false then the event was probably at capacity
				return res.json({ success: false });
			}
			return res.json({ success: true });
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.put(
	'/:id/remind',
	passport.authenticate('jwt', { session: false }),
	validator('required', { field: 'remind' }),
	isAllowedToView(Event, 'id'),
	async (req, res) => res.send(EventService.updateUserReminding(
		req.user,
		req.params.id,
		req.validated.remind,
	)),
);

router.get(
	'/:id/user-attending',
	passport.authenticate('jwt', { session: false }),
	isAllowedToView(Event, 'id'),
	async (req, res) => {
		try {
			return res.send(await EventService.userAttending(req.params.id, req.user));
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.post(
	'/:id/attachments',
	upload.single('file'),
	passport.authenticate('jwt', { session: false }),
	validator('required', { field: 'filename' }),
	// This regex accepts all audio, image and video files as well as pdfs
	validator('fileType', { file: 'file', types: 'video\\/[a-z]*|image\\/[a-z]*|application\\/pdf|audio\\/[a-z]*' }),
	isOwner(Event, 'id'),
	async (req, res) => {
		try {
			const location = await fileService.uploadFile(req.validated.file);
			const result = await EventService.addAttachmentToEvent(req.params.id, {
				filename: req.validated.filename,
				location,
			});
			return res.send(result);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.delete(
	'/:id/attachments/:attachmentId',
	passport.authenticate('jwt', { session: false }),
	isOwner(Event, 'id'),
	async (req, res) => {
		try {
			const removed = await EventService.removeAttachmentFromEvent(
				req.params.id,
				req.params.attachmentId,
			);
			return res.send(removed);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);


export default router;
