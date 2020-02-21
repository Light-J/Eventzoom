import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
	title: String,
	description: String,
	image: String,
	speaker: String,
	vaguelocation: String,
	specificlocation: String,
	disabilityAccess: Boolean,
	organiser: String,
	capacity: Number,
	date: { type: Date },


});

const Event = mongoose.model('Event', EventSchema);

export default Event;
