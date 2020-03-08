import express from 'express';
import userService from '../services/user.service';
import seriesService from '../services/series.service';
import emailService from '../services/email.service';
import hasCorrectToken from '../middleware/hasCorrectToken';

const router = express.Router();

router.get(
	'/',
	hasCorrectToken,
	async (req, res) => {
		const users = await userService.getAllUsers();
		await Promise.all(users.map((async (user) => {
			const series = await seriesService.getUserSubscriptions(user);
			series.filter((entry) => entry.events.length > 0);
			if (!series.length) {
				return;
			}
			await emailService.sendEmail(user.email, 'subscriptions', { series });
		})));
		res.send({ success: true });
	},
);
export default router;
