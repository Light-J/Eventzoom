import express from 'express';
import passport from 'passport';
import userService from '../services/user.service';
import seriesService from '../services/series.service';
import emailService from '../services/email.service';
import isStaff from '../middleware/isStaff';
import statisticsService from '../services/statistics.service';

const router = express.Router();

router.get(
	'/',
	passport.authenticate(['jwt'], { session: false }),
	isStaff,
	async (req, res) => {
		res.send(await statisticsService.getStatistics());
	},
);
export default router;
