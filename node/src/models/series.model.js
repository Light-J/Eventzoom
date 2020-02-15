import mongoose from 'mongoose';

const SeriesSchema = new mongoose.Schema({
	title: {
		type: String, requred: true,
	},
	description: {
		type: String, requred: true,
	},
	image: {
		type: String, requred: true,
	},

});
const Series = mongoose.model('Series', SeriesSchema);

export default Series;
