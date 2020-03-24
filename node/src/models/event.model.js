import mongoose from 'mongoose';
import filterableFields from '../mixins/filterable';

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
	attendees: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, reminding: { type: Boolean } }],
	filterable: { ...filterableFields },
	price: {
		type: Number, required: true, min: [0, 'Negative prices aren\'t allowed'], default: 0,
	},
	attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
});

EventSchema.methods.toICSFormat = function getInIcsFormat() {
	const event = this.populate('organiser');
	const date = new Date(event.date);
	return {
		start: [date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes()],
		duration: { hours: 1 }, // We dont collect duration so default to 1 so event shows in calendar
		title: event.title,
		description: event.description,
		location: event.specificLocation,
		status: 'CONFIRMED',
		busyStatus: 'BUSY',
		organizer: {
			email: event.organiser.email,
			name: event.organiser.name || event.organiser.email,
		},
	};
};

EventSchema.methods.toJSON = function retractAttendeesList() {
	const object = this.toObject();
	object.attendeesAmount = object.attendees.length;
	delete object.attendees;
	delete object.specificLocation;
	object.location = object.vagueLocation;
	return object;
};

EventSchema.methods.tolocationlogin = function retractAttendeesList() {
	const object = this.toObject();
	delete object.attendees;
	delete object.vagueLocation;
	object.location = object.specificLocation;
	return object;
};

const Event = mongoose.model('Event', EventSchema);

export default Event;
