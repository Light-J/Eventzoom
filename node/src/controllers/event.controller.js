import express from 'express';
import multer from 'multer';
import validator from '../middleware/validator';
import EventService from '../services/event.service';
import fileService from '../services/file.service';

const router = express.Router();
const upload = multer();

router.get(
	'/',
	async (req, res) => {
		try {
			const { query } = req.query;
			const events = await EventService.getEvents(query);
			return res.send(events);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.get(
	'/advanced',
	validator('optional', { field: 'title' }),
	validator('optional', { field: 'speaker' }),
	validator('optional', { field: 'startDate' }),
	validator('optional', { field: 'endDate' }),
	validator('optional', { field: 'organiser' }),
	async (req, res) => {
		try {
			const events = await EventService.getEventsAdvanced(req.validated);
			return res.send(events);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.get(
	'/:id',
	async (req, res) => {
		try {
			const event = await EventService.getEventById(req.params.id);
			return res.send(event);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.post(
	'/add-event',
	upload.single('file'),
	validator('required', { field: 'title' }),
	validator('required', { field: 'description' }),
	validator('required', { field: 'speaker' }),
	validator('fileSize', { file: 'file', maxSize: 1e+7 }), // 10MB
	validator('fileType', { file: 'file', types: 'image/*' }),
	validator('required', { field: 'vaguelocation' }),
	validator('required', { field: 'specificlocation' }),
	validator('required', { field: 'disabilityAccess' }),
	validator('required', { field: 'organiser' }),
	validator('required', { field: 'capacity' }),
	validator('required', { field: 'date' }),
	async (req, res) => {
		try {
			const location = await fileService.uploadFile(req.validated.file);
			req.validated.image = location;
			const event = await EventService.addEvent(req.validated);
			return res.send(event);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

export default router;
