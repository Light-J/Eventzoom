import Event from '../models/event.model';

exports.getEvents = async (query) => {
	try {
		return await Event.find(query);
	} catch (e) {
		// Log Errors
		throw Error('Error while getting events');
	}
};

exports.getEventById = async (id) => {
	try {
		return await Event.findById(id);
	} catch (e) {
		throw Error('Error while getting single event');
	}
};
