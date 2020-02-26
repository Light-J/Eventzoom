import express from 'express';
import EventService from '../services/event.service';
import validator from '../middleware/validator';

const router = express.Router();

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

export default router;
