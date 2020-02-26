import escapeStringRegexp from 'escape-string-regexp';
import Event from '../models/event.model';

const getEvents = async (query) => {
	try {
		if (query) {
			const escapedQuery = escapeStringRegexp(query);
			const regSearch = new RegExp(`${escapedQuery}`, 'i');
			return await Event.find({
				$and: [
					{
						$or: [
							{ title: regSearch },
							{ description: regSearch },
							{ speaker: regSearch },
							{ organiser: regSearch },
						],
					},
					{ date: { $gte: Date.now() } },

				],
			});
		}
		return await Event.find({ date: { $gte: Date.now() } });
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
			if (key !== 'startDate' && key !== 'endDate') {
				searchQuery[key] = new RegExp(`${escapedString}`, 'i');
			} else {
				// minimum and maximum JS dates
				// https://stackoverflow.com/questions/11526504/minimum-and-maximum-date
				// 25 Feb 2020
				const startDate = fields.startDate || new Date(-8640000000000000);
				const endDate = new Date(fields.endDate) || new Date(8640000000000000);
				searchQuery.date = { $gte: startDate, $lt: endDate.setDate(endDate.getDate() + 1) };
			}
		});
		// so events from the past aren't shown unless explicitly searched for
		if (!searchQuery.date) {
			searchQuery.date = { $gte: Date.now() };
		}
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

const addEvents = async (query) => {
	try {
		return await ((new Event(query)).save());
	} catch (e) {
		throw Error('Error while posting event');
	}
};

export default { getEvents, getEventById, getEventsAdvanced, addEvents };

