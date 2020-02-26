import express from 'express';
import multer from 'multer';
import EventService from '../services/event.service';
import validator from '../middleware/validator';


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
	'/addEvent',
	upload.single('image'),
	validator('required', { field: 'title' }),
	validator('required', { field: 'description' }),
	validator('required', { field: 'image' }),
	validator('required', { field: 'speaker' }),
	validator('required', { field: 'vaguelocation' }),
	validator('required', { field: 'specificlocation' }),
	validator('required', { field: 'disabilityaccess' }),
	validator('required', { field: 'organiser' }),
	validator('required', { field: 'capacity' }),
	validator('required', { field: 'date' }),
	async (req, res) => {
		try {
			const location = await fileService.uploadFile(req.validated.file);
			const event = await EventService.addEvents(
				{
					title: req.validated.title,
					description: req.validated.description,
					image: location,
					speaker: req.validated.speaker,
					vaguelocation: req.validated.vaguelocation,
					specificlocation: req.validated.specificlocation,
					disabilityaccess: req.validated.disabilityaccess,
					organiser: req.validated.organiser,
					capacity: req.validated.capacity,
					date: req.validated.date,
				},
			);
			return res.send(event);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

export default router;
