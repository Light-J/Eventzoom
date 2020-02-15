import Series from '../models/series.model';

const createSeries = async (series) => {
	await ((new Series(series)).save());
	return true;
};


export default { createSeries };
