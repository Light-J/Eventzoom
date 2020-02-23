import Event from '../models/event.model';

const getEvents = async (query) => {
	try {
		return await Event.find(query);
	} catch (e) {
		// Log Errors
		throw Error('Error while getting events');
	}
};

const getEventById = async (id) => {
	try {
		return await Event.findById(id);
	} catch (e) {
		throw Error('Error while getting single event');
	}
};

const postEvents = async (query) => {
	try {
		return await ((new Event(query)).save());
	} catch (e) {
		console.log(e);
		throw Error('Error while posting event');
	}
};

export default { getEvents, getEventById, postEvents };
