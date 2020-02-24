import escapeStringRegexp from 'escape-string-regexp';
import Event from '../models/event.model';

const getEvents = async (query) => {
	try {
		if (query) {
			const escapedQuery = escapeStringRegexp(query);
			const regSearch = new RegExp(`${escapedQuery}`, 'i');
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
		const searchQuery = {};
		Object.keys(fields).forEach((key) => {
			const escapedString = fields[key];
			if (key !== 'date') {
				searchQuery[key] = new RegExp(`${escapedString}`, 'i');
			} else {
				searchQuery[key] = new Date(escapedString);
			}
		});
		return await Event.find(searchQuery);
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
