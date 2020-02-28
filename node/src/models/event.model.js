import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String },
	speaker: { type: String, required: true },
	vagueLocation: { type: String, required: true },
	specificLocation: { type: String, required: true },
	disabilityAccess: { type: Boolean, required: true },
	organiser: { type: String, required: true },
	capacity: { type: Number, required: true, min: [1, 'You need at least 1 person'] },
	date: { type: Date },


});

const Event = mongoose.model('Event', EventSchema);

export default Event;
