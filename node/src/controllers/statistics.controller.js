import express from 'express';
import passport from 'passport';
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
