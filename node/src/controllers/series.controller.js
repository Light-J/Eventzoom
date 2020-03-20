import express from 'express';
import passport from 'passport';
import multer from 'multer';
import validator from '../middleware/validator';
import seriesService from '../services/series.service';
import fileService from '../services/file.service';
import authorizationService from '../services/authorization.service';
import isStaff from '../middleware/isStaff';
import Series from '../models/series.model';
import isAllowedToView from '../middleware/isAllowedToView';

const router = express.Router();
const upload = multer();

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	isStaff,
	upload.single('image'),
	validator('required', { field: 'title' }),
	validator('required', { field: 'description' }),
	validator('fileSize', { file: 'file', maxSize: 1e+7 }), // 10MB
	validator('fileType', { file: 'file', types: /^image\/.*$/ }),
	validator('optional', { field: 'restrictToSchool' }),
	validator('optional', { field: 'restrictToStaff' }),
	validator('optional', { field: 'noPublic' }),
	validator('optional', { field: 'whitelist' }),
	async (req, res) => {
		const location = await fileService.uploadFile(req.validated.file);
		await seriesService.createSeries(
			{
				title: req.validated.title,
				description: req.validated.description,
				image: location,
				user: req.user._id,
				filterable: authorizationService.generateFilterableField(req.validated, req.user),
			},
		);
		res.json({ success: true });
	},
);

router.get(
	'/',
	passport.authenticate(['jwt', 'anonymous'], { session: false }),
	async (req, res) => {
		try {
			const { query } = req.query;
			const series = await seriesService.getSeriesByKeyword(query);
			return res.send(authorizationService.filterInaccessible(series, req.user));
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);


router.get(
	'/mine',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const series = await seriesService.getSeriesForUser(req.user);
		res.json(series);
	},
);

router.get(
	'/:id/user-subscribed',
	passport.authenticate('jwt', { session: false }),
	isAllowedToView(Series, 'id'),
	async (req, res) => {
		try {
			return res.send(req.user.subscribedSeries.includes(req.params.id));
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.get(
	'/subscriptions',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const subscriptions = await seriesService.getUserSubscriptions(req.user);
			return res.send(subscriptions);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);


router.get(
	'/:id',
	passport.authenticate(['jwt', 'anonymous'], { session: false }),
	isAllowedToView(Series, 'id'),
	async (req, res) => {
		try {
			const series = await seriesService.getSeriesById(req.params.id);
			series.events = authorizationService.filterInaccessible(series.events, req.user);
			return res.send(series);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);


router.post(
	'/change-subscription/',
	passport.authenticate('jwt', { session: false }),
	validator('required', { field: 'seriesId' }),
	isAllowedToView(Series, 'seriesId', true),
	async (req, res) => {
		const userSubscribed = req.user.subscribedSeries.includes(req.validated.seriesId);
		try {
			await seriesService.changeUserSeriesSubscription(
				req.validated.seriesId,
				req.user,
				!userSubscribed,
			);
			return res.send();
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

export default router;
