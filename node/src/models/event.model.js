import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
	title: String,
	description: String,
	image: String,
	speaker: String,
	location: String,
	disabilityaccess: Boolean,
	organiser: String,
	capacity: Number,
	date: { type: Date },


});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
