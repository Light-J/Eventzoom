import Event from '../models/event.model';

const getEvents = async (query) => {
	try {
		if (query) {
			const regSearch = new RegExp(`${query}`, 'i');
			return await Event.find({
				$or: [
					{ title: regSearch },
					{ description: regSearch },
					{ speaker: regSearch },
					{ organiser: regSearch },
				],
			});
		}
		return await Event.find({});
	} catch (e) {
		// Log Errors
		throw Error('Error while getting events');
	}
};

const getEventsAdvanced = async (fields) => {
	try {
		// eslint-disable-next-line array-callback-return
		Object.keys(fields).map((field) => {
			const fieldValue = fields[field];
			// eslint-disable-next-line no-param-reassign
			fields[field] = new RegExp(`${fieldValue}`, 'i');
		});
		return await Event.find(fields);
	} catch (e) {
		// Log Errors
		throw Error(e.stack);
	}
};

const getEventById = async (id) => {
	try {
		return await Event.findById(id);
	} catch (e) {
		throw Error('Error while getting single event');
	}
};

export default { getEvents, getEventById, getEventsAdvanced };
