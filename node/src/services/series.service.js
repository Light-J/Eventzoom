import escapeStringRegexp from 'escape-string-regexp';
import Series from '../models/series.model';
import authorizationService from './authorization.service';
import seriesConfig from '../../config/series';

const createSeries = async (series) => {
	await ((new Series(series)).save());
	return true;
};

const getSeriesForUser = async ({ _id }) => Series.find({ user: _id });

const getSeriesById = async (id) => {
	try {
		return await Series.findById(id)
			.populate({ path: 'events', options: { sort: { date: 1 } } })
			.populate('user');
	} catch (e) {
		throw Error('Error while getting single series');
	}
};

const changeUserSeriesSubscription = async (seriesId, user, subscribe) => {
	if (subscribe) {
		// Suscribe user
		user.subscribedSeries.push(seriesId);
		user.save();
	} else {
		// Unsubscribe user
		user.subscribedSeries.pull(seriesId);
		user.save();
	}
};

const getUserSubscriptions = async (user) => {
	const curDate = new Date();
	let foundSeries = await Series
		.find({ _id: { $in: user.subscribedSeries } }, '_id title events')
		.populate({
			path: 'events',
			match: { date: { $gte: curDate } },
			options: { limit: seriesConfig.eventsPerSubscription, sort: { date: 1 } },
		});
	foundSeries = await authorizationService.filterInaccessible(foundSeries, user);
	foundSeries = foundSeries.map((subscription) => ({
		...subscription.toObject(),
		events: authorizationService.filterInaccessible(subscription.events, user),
	}));
	return foundSeries;
};

const getSeriesByKeyword = async (query = '') => {
	try {
		const escapedQuery = escapeStringRegexp(query);
		const regSearch = new RegExp(escapedQuery, 'i');
		return await Series.find({
			$or: [
				{ title: regSearch },
				{ description: regSearch },
			],

		}).limit(20);
	} catch (e) {
		throw Error('Error while querying for series');
	}
};

export default {
	getSeriesByKeyword,
	createSeries,
	getSeriesForUser,
	getSeriesById,
	changeUserSeriesSubscription,
	getUserSubscriptions,
};
