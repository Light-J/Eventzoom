import escapeStringRegexp from 'escape-string-regexp';
import * as ics from 'ics';
import stringSimilaritiy from 'string-similarity';
import Event from '../models/event.model';
import kmeans from './kmeans.service';
import Series from '../models/series.model';
import emailService from './email.service';


// eslint-disable-next-line max-len
const sortEventQuery = async (query, sort, direction) => Event.find(query).sort({ [sort]: direction }).exec();
const getEvents = async (query, sort, direction) => {
	try {
		const escapedQuery = escapeStringRegexp(query);
		const regSearch = new RegExp(escapedQuery, 'i');
		return await sortEventQuery({
			$and: [
				{
					$or: [
						{ title: regSearch },
						{ description: regSearch },
						{ speaker: regSearch },
					],
				},
				{ date: { $gte: Date.now() } },

			],
		}, sort, direction);
	} catch (e) {
		// Log Errors
		throw Error('Error while getting events');
	}
};

const getEventsAdvanced = async (fields, sort, direction) => {
	try {
		const searchQuery = {};
		Object.keys(fields).forEach((key) => {
			const escapedString = fields[key];
			if (key !== 'startDate' && key !== 'endDate' && key !== 'sort' && key !== 'direction') {
				searchQuery[key] = new RegExp(escapedString, 'i');
			} else if (key === 'startDate' || key === 'endDate') {
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
		return await sortEventQuery(searchQuery, sort, direction);
	} catch (e) {
		// Log Errors
		throw Error(e.stack);
	}
};

const getEventById = async (id) => {
	try {
		return await Event.findById(id).populate('series organiser');
	} catch (e) {
		throw Error('Error while getting single event');
	}
};

const addEvent = async (eventDetails) => {
	try {
		const event = await ((new Event(eventDetails)).save());
		await Series.findByIdAndUpdate(eventDetails.series, { $push: { events: event._id } });
		return event;
	} catch (e) {
		throw Error('Error while adding event');
	}
};

const attendEvent = async (eventId, user, attend) => {
	try {
		const event = await getEventById(eventId);
		if (attend) {
			if (event.attendees.length < event.capacity) {
				event.attendees.push(user._id);
				const icsString = await ics.createEvent(event.toICSFormat());
				emailService.sendEmail(user.email, 'event-confirmation', { event }, {
					icalEvent: {
						method: 'publish',
						content: icsString.value,
					},
				});
			} else {
				return false;
			}
		} else {
			event.attendees.pull(user._id);
		}
		event.save();
		return true;
	} catch (e) {
		throw Error('Error while adding user to attendees list');
	}
};

const userAttending = async (eventId, user) => {
	try {
		const event = await getEventById(eventId);
		return event.attendees.includes(user._id);
	} catch (e) {
		throw Error('Error while retrieving data');
	}
};

const eventAtCapacity = async (eventId) => {
	try {
		const event = await getEventById(eventId);
		return (event.attendees.length >= event.capacity);
	} catch (e) {
		throw Error('Error while calculating events attendance');
	}
};

const getRecommendationsForEvent = async (event, user) => {
	console.log('getting called!');

	//TODO: take into account user!
	const events = (await getEvents('', 'date', 'asc')).map((e) => e.toJSON());
	const result = kmeans.calculate(events, [events[0], events[3]], (event1, event2) => {
		const attendanceSimilarity = (event1.attendeesAmount / event1.capacity - event2.attendeesAmount / event2.capacity) / 100;
		const titleSimilarity = 1 - stringSimilaritiy.compareTwoStrings(event1.title.toLowerCase(), event2.title.toLowerCase());
		const descriptionSimilarity = 1 - stringSimilaritiy.compareTwoStrings(event1.description.toLowerCase(), event2.description.toLowerCase());
		// console.log(attendanceSimilarity + titleSimilarity + descriptionSimilarity);
		return attendanceSimilarity + titleSimilarity + descriptionSimilarity;
	}, (eventsToAverage) => {
		const attendeesAmount = eventsToAverage.reduce((init, e) => init + e.attendeesAmount, 0) / eventsToAverage.length;
		// reference: https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
		// accessed 12 March 2020
		const title = eventsToAverage[Math.floor(Math.random() * eventsToAverage.length)].title;
		const description = eventsToAverage[Math.floor(Math.random() * eventsToAverage.length)].description;
		const capacity = eventsToAverage.reduce((init, e) => init + e.capacity, 0) / eventsToAverage.length;
		// console.log(attendeesAmount,
		// 	title,
		// 	description,
		// 	capacity);
		return {
			...eventsToAverage[0],
			attendeesAmount,
			title,
			description,
			capacity,
		};
	});
	return result;
};


export default {
	getEvents,
	getEventById,
	getEventsAdvanced,
	addEvent,
	attendEvent,
	userAttending,
	eventAtCapacity,
	sortEventQuery,
	getRecommendationsForEvent,
};
