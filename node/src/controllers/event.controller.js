import express from 'express';
import Event from '../models/event.model';

const router = express.Router();

router.get(
	'/',
	(req, res) => {
		const event = new Event({
			title: 'Cats!',
			description: 'This is the description of my test event',
			image: 'https://i.imgur.com/ZccahuC.jpg',
			speaker: 'John cat-a-person',
			location: 'Cardiff',
			disabilityaccess: true,
			organiser: 'Catty catface',
			capacity: 50,
			date: new Date('03-03-2020'),
		});
		res.send(event);
	},
);

export default router;
