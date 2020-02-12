import Event from '../models/event.model';

exports.getEvents = async (query) => {
	try {
		return await Event.find(query);
	} catch (e) {
		// Log Errors
		throw Error('Error while getting events');
	}
};
