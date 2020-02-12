import express from 'express';
import EventService from '../services/event.service';

const router = express.Router();

router.get(
	'/',
	async (req, res) => {
		try {
			const events = await EventService.getEvents({});
			return res.status(200).json({ status: 200, data: events });
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

export default router;
