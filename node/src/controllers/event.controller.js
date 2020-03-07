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

const router = express.Router();
const upload = multer();

router.get(
	'/',
	passport.authenticate(['jwt', 'anonymous'], { session: false }),
	async (req, res) => {
		try {
			const { query } = req.query;
			const events = await EventService.getEvents(query);
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
	async (req, res) => {
		try {
			const events = await EventService.getEventsAdvanced(req.validated);
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

export default router;
