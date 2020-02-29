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

export default { createSeries, getSeriesForUser, getSeriesById };
