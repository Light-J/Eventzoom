import mongoose from 'mongoose';

const SeriesSchema = new mongoose.Schema({
	title: {
		type: String, required: true,
	},
	description: {
		type: String, required: true,
	},
	image: {
		type: String, required: true,
	},

});
const Series = mongoose.model('Series', SeriesSchema);

export default Series;
