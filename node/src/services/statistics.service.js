import Log from '../models/log.model';
import Event from '../models/event.model';

const getStatistics = async () => [
	{
		name: 'Most searched terms',
		results: (await Log.aggregate([
			{ $match: { event: 'search' } },
			{ $group: { _id: '$data.term', count: { $sum: 1 } } },
			{ $sort: { count: -1 } },
			{ $limit: 5 },
			{ $project: { count: '$count', title: '$_id' } },
		])),
	},
	{
		name: 'Most viewed events',
		results: (await Log.aggregate([
			{ $match: { event: 'visit' } },
			{ $group: { _id: '$referencedEvent', count: { $sum: 1 } } },
			{ $sort: { count: -1 } },
			{
				$lookup: {
					from: 'events', localField: '_id', foreignField: '_id', as: 'event',
				},
			},
			{ $project: { count: '$count', title: { $arrayElemAt: ['$event.title', 0] } } },
			{ $limit: 5 },
		])),
	},
	{
		name: 'Events with most attendees',
		results: (await Event.aggregate([
			// this has to be an unwind to deal with events with 0 attendees
			{ $unwind: '$attendees' },
			{ $group: { _id: { _id: '$_id', title: '$title' }, count: { $sum: 1 } } },
			{ $sort: { count: -1 } },
			{ $project: { _id: '$_id._id', title: '$_id.title', count: '$count' } },
			{ $limit: 5 },

		])),
	},


];
export default { getStatistics };
