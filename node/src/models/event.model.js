import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String, required: true },
	speaker: { type: String, required: true },
	vagueLocation: { type: String, required: true },
	specificLocation: { type: String, required: true },
	disabilityAccess: { type: Boolean, required: true },
	organiser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	capacity: { type: Number, required: true, min: [1, 'You need at least 1 person'] },
	date: { type: Date },
	series: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Series' },
	attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attendees' }],
});


EventSchema.methods.toJSON = function retract() {
	const object = this.toObject();
	object.attendeesAmount = object.attendees.length;
	delete object.attendees;
	return object;
};

const Event = mongoose.model('Event', EventSchema);

export default Event;
