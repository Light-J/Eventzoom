import Series from '../models/series.model';

const createSeries = async (series) => {
	await ((new Series(series)).save());
	return true;
};

const getSeriesForUser = async ({ _id }) => Series.find({ user: _id });

const getSeriesById = async (id) => {
	try {
		return await Series.findById(id).populate('events user');
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
	const endDate = new Date(curDate).setMonth(curDate.getMonth() + 1);
	return Series
		.find({ _id: { $in: user.subscribedSeries } }, '_id title events')
		.populate({
			path: 'events',
			match: { date: { $gte: curDate, $lt: endDate } },
		});
};


export default {
	createSeries,
	getSeriesForUser,
	getSeriesById,
	changeUserSeriesSubscription,
	getUserSubscriptions,
};
