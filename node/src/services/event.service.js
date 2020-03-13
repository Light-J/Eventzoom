import escapeStringRegexp from 'escape-string-regexp';
import * as ics from 'ics';
import stringSimilaritiy from 'string-similarity';
import Event from '../models/event.model';
import kmeans from './kmeans.service';
import Series from '../models/series.model';
import emailService from './email.service';
import authorizationService from './authorization.service';
import recommendationsConfig from '../../config/recommendations';


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

const compareTwoEvents = (event1, event2) => {
	const attendanceSimilarity =			(
		event1.attendeesAmount / event1.capacity
			- event2.attendeesAmount / event2.capacity
	)
		/ 100;
	const titleSimilarity = 1 - stringSimilaritiy.compareTwoStrings(
		event1.title.toLowerCase(),
		event2.title.toLowerCase(),
	);
	const descriptionSimilarity = 1 - stringSimilaritiy.compareTwoStrings(
		event1.description.toLowerCase(),
		event2.description.toLowerCase(),
	);
	return attendanceSimilarity + titleSimilarity + descriptionSimilarity;
};

const averageEvents = (eventsToAverage) => {
	// average out these two
	const attendeesAmount = eventsToAverage.reduce((init, e) => init + e.attendeesAmount, 0)
	/ eventsToAverage.length;
	const capacity = eventsToAverage.reduce((init, e) => init + e.capacity, 0)
	/ eventsToAverage.length;
	// this just picks out a random title
	// ideally this would be some form of average
	// like https://link.springer.com/article/10.1007/s10044-002-0184-4
	// unfortunately I don't understand what this paper says.
	const title = eventsToAverage[Math.floor(Math.random() * eventsToAverage.length)].title;
	// eslint-disable-next-line max-len
	const description = eventsToAverage[Math.floor(Math.random() * eventsToAverage.length)].description;
	return {
		...eventsToAverage[0],
		attendeesAmount,
		title,
		description,
		capacity,
	};
};

const getRecommendationsForEvent = async (event, user) => {
	const events = authorizationService.filterInaccessible((await getEvents('', 'date', 'asc')), user)
		.map((e) => e.toJSON());
	const centroids = events.filter(
		(e, index) => index % recommendationsConfig.numberOfRecommendations === 0,
	);
	const result = kmeans.calculate(events, centroids, compareTwoEvents, averageEvents);
	return result.find(
		(e) => e.some(
			(foundEvent) => foundEvent._id.toString() === event._id.toString(),
		),
	).filter((e) => e._id.toString() !== event._id.toString());
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
	averageEvents,
	compareTwoEvents,
};
