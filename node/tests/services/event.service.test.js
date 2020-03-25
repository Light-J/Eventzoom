import eventModel from '../../src/models/event.model';
import seriesModel from '../../src/models/series.model';
import attachmentModel from '../../src/models/attachment.model';
import eventService from '../../src/services/event.service';
import emailService from '../../src/services/email.service';
import authorizationService from '../../src/services/authorization.service';
import passportService from '../../src/services/passport.service';
import urlService from '../../src/services/url.service';
import kmeans from '../../src/services/kmeans.service';
import fileService from '../../src/services/file.service';
import textService from '../../src/services/text.service';

// Mock save. Mongoose save returns the Id of the document saved
const mockSave = jest.fn();
jest.mock('../../src/models/event.model', () => jest.fn().mockImplementation(() => ({ save: mockSave })));
jest.mock('../../src/models/attachment.model', () => jest.fn().mockImplementation(() => ({ save: mockSave })));
jest.mock('../../src/models/series.model');
jest.mock('../../src/models/attachment.model');
jest.mock('../../src/services/email.service');
jest.mock('../../src/services/kmeans.service');
jest.mock('../../src/services/file.service');
jest.mock('../../src/services/text.service');

// cause we mock it later on
const realSortEventQuery = eventService.sortEventQuery;

describe('testing getEvents', () => {
	it('should getMessages successfully', async () => {
		eventModel.find = jest.fn()
			.mockImplementation(() => (
				{ sort: jest.fn().mockImplementation(() => ({ exec: jest.fn().mockImplementation(() => 'test result') })) }
			));
		await expect(await eventService.getEvents('aasdfasdfasdf', 'sort', 'direction')).toEqual('test result');
	});
	it('should throw error successfully', async () => {
		eventModel.find = jest.fn().mockImplementation(async () => { throw Error('irrelevant'); });
		await expect(eventService.getEvents()).rejects.toEqual(new Error('Error while getting events'));
	});
});

describe('testing getEvents for the advanced search', () => {
	it('should getMessages successfully', async () => {
		eventModel.find = jest.fn()
			.mockImplementation(() => (
				{ sort: jest.fn().mockImplementation(() => ({ exec: jest.fn().mockImplementation(() => 'test result') })) }
			));
		await expect(await eventService.getEventsAdvanced({ title: 'test' })).toEqual('test result');
		await expect(eventModel.find.mock.calls[0][0].title).toEqual(/test/i);
	});
	it('should throw error successfully', async () => {
		eventModel.find = jest.fn().mockImplementation(async () => { throw Error('irrelevant'); });
		await expect(eventService.getEventsAdvanced({ title: 'test' })).rejects.toThrow();
		await expect(eventModel.find.mock.calls[0][0].title).toEqual(/test/i);
	});
});

describe('testing getEventByid', () => {
	it('should getMessages successfully', async () => {
		const result = { populate: jest.fn().mockImplementation(async () => 'test result') };
		eventModel.findById = jest.fn().mockImplementation(() => result);
		await expect(await eventService.getEventById(1)).toEqual('test result');
		await expect(eventModel.findById.mock.calls[0]).toEqual([1]);
	});
	it('should throw error successfully', async () => {
		const result = { populate: jest.fn().mockImplementation(async () => { throw Error('irrelevant'); }) };
		eventModel.findById = jest.fn().mockImplementation(() => result);
		await expect(eventService.getEventById(1)).rejects.toEqual(new Error('Error while getting single event'));
		return expect(eventModel.findById.mock.calls[0]).toEqual([1]);
	});
});

describe('testing addEvent', () => {
	it('should run successfully', async () => {
		mockSave.mockImplementation(async () => ({ _id: 5 }));
		await eventService.addEvent({ test: 'test', series: '123' });
		expect(eventModel.mock.calls[0]).toEqual([{ test: 'test', series: '123' }]);
		expect(seriesModel.findByIdAndUpdate.mock.calls[0]).toEqual(['123', { $push: { events: 5 } }]);
	});
});

describe('testing event at capacity', () => {
	it('event is at capacity should should return true', async () => {
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				attendees: [1, 2, 3],
				capacity: 3,
			})),
		};
		eventModel.findById = jest.fn().mockImplementation(() => result);
		const response = await eventService.eventAtCapacity(123);
		expect(response).toEqual(true);
	});
	it('event is not at capacity should should return false', async () => {
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				attendees: [1, 2],
				capacity: 3,
			})),
		};
		eventModel.findById = jest.fn().mockImplementation(() => result);
		const response = await eventService.eventAtCapacity(123);
		expect(response).toEqual(false);
	});
});

describe('testing if user attending event', () => {
	it('user is attending so return true', async () => {
		const fakeUser = { _id: 1 };
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				attendees: [{
					user: {
						equals() {
							return true;
						},
					},
					reminding: true,
				}],
				capacity: 3,
			})),
		};
		eventModel.findById = jest.fn().mockImplementation(() => result);
		const response = await eventService.userAttending(123, fakeUser);
		expect(response).toEqual({ attending: true, reminding: true });
	});
	it('user is not attending so return false', async () => {
		const fakeUser = { _id: 5 };
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				attendees: [{
					user: {
						equals() {
							return false;
						},
					},
					reminding: false,
				}],
				capacity: 3,
			})),
		};
		eventModel.findById = jest.fn().mockImplementation(() => result);
		const response = await eventService.userAttending(123, fakeUser);
		expect(response).toEqual({ attending: false, reminding: false });
	});
});

describe('testing user attending an event', () => {
	it('event under capactity so user can attend', async () => {
		const fakeUser = { _id: 1 };
		emailService.sendEmail = jest.fn();
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				attendees: [2],
				capacity: 3,
				save() {
					return true;
				},
				toICSFormat() {
					return { uid: 123 };
				},
			})),
		};
		eventModel.findById = jest.fn().mockImplementation(() => result);
		const response = await eventService.attendEvent(123, fakeUser, true);
		expect(response).toEqual(true);
	});
	it('event at capactity so user can not attend', async () => {
		const fakeUser = { _id: 1 };
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				attendees: [2],
				capacity: 1,
				save() {
					return true;
				},
			})),
		};
		eventModel.findById = jest.fn().mockImplementation(() => result);
		const response = await eventService.attendEvent(123, fakeUser, true);
		expect(response).toEqual(false);
	});
});


describe('testing sortEventQuery', () => {
	it('should run successfully', async () => {
		eventModel.find = jest.fn()
			.mockImplementation(() => (
				{ sort: jest.fn().mockImplementation(() => ({ exec: jest.fn().mockImplementation(() => 'test result') })) }
			));
		expect(await realSortEventQuery('qweasd', 'qweasd', 'qweasd')).toEqual('test result');
	});
});

describe('testing getEventsAttendeesById', () => {
	it('should run successfully', async () => {
		eventModel.findById = jest.fn()
			.mockImplementation(() => (
				{ populate: jest.fn().mockImplementation(() => ({ attendees: [1, 2, 3] })) }
			));
		const attendeesList = await eventService.getEventsAttendeesById('123');
		expect(attendeesList).toEqual([1, 2, 3]);
	});
});


describe('getting recommendations', () => {
	it('matches snapshots', async () => {
		authorizationService.filterInaccessible = jest.fn().mockImplementation((events) => events);
		eventModel.find = jest.fn()
			.mockImplementation(() => (
				{
					sort: jest.fn().mockImplementation(
						() => ({
							exec: jest.fn().mockImplementation(
								() => [
									{ toJSON: () => ({ _id: '123' }) },
									{ toJSON: () => ({ _id: '123' }) },
								],
							),
						}),
					),
				}
			));
		kmeans.calculate = jest.fn().mockImplementation(() => [[{ _id: '123' }, { _id: 'potato' }], [{ _id: '1234' }, { _id: 'carrot' }]]);
		const rs = await eventService.getRecommendationsForEvent({ _id: '123' });
		expect(kmeans.calculate.mock.calls[0]).toMatchSnapshot();
		expect(rs).toMatchSnapshot();
	});
});


describe('averaging events', () => {
	it('averages right', async () => {
		const events = [
			{
				attendeesAmount: 5,
				capacity: 5,
				title: 'qweasd',
				description: '123456',
			},
			{
				attendeesAmount: 5,
				capacity: 5,
				title: 'qweasd',
				description: '123456',
			},
		];
		expect(eventService.averageEvents(events).attendeesAmount).toBe(5);
		expect(eventService.averageEvents(events).capacity).toBe(5);
	});
});


describe('comparing two events', () => {
	it('compares right', async () => {
		const events = [
			{
				attendeesAmount: 5,
				capacity: 5,
				title: 'qweasd',
				description: '123456',
			},
			{
				attendeesAmount: 5,
				capacity: 5,
				title: 'qweasd',
				description: '123456',
			},
		];
		expect(eventService.compareTwoEvents(events[0], events[1])).toBe(0);
	});
});


describe('getting user events', () => {
	it('matches snapshots', async () => {
		authorizationService.filterInaccessible = jest.fn().mockImplementation((events) => events);
		eventModel.find = jest.fn()
			.mockImplementation(() => (
				{
					sort: jest.fn().mockImplementation(
						() => ({
							exec: jest.fn().mockImplementation(
								() => [
									'event1',
									'event2',
								],
							),
						}),
					),
				}
			));
		const rs = await eventService.getUserAttendingEvents({ _id: '123' });
		await expect(eventModel.find.mock.calls[0]).toMatchSnapshot();
		return expect(rs).toMatchSnapshot();
	});
});

describe('testing attachments with an event', () => {
	it('Should add an attachment to an event', async () => {
		const event = {
			attachments: [],
			save() {
				return 321;
			},
		};
		eventModel.findById = jest.fn().mockImplementation(() => event);
		mockSave.mockImplementation(async () => ({ _id: 123 }));
		const attachment = {
			filename: 'test',
			location: 'www.google.com',
		};
		const returnedId = await eventService.addAttachmentToEvent(123, attachment);
		expect(returnedId).toEqual({ _id: 123 });
	});
	it('Should remove an attachment from an event', async () => {
		fileService.removeFile = jest.fn().mockImplementation(async () => true);
		const event = {
			attachments: [12345],
			save() {
				return true;
			},
		};
		event.attachments.pull = jest.fn().mockImplementation(() => {
			const index = event.attachments.indexOf(12345);
			if (index !== -1) event.attachments.splice(index, 1);
		});
		eventModel.findById = jest.fn().mockImplementation(() => event);
		attachmentModel.findById = jest.fn().mockImplementation(() => ({ location: 'irrelevent' }));
		const returnedId = await eventService.removeAttachmentFromEvent(123, 12345);
		expect(returnedId).toEqual(true);
	});
});


describe('testing updateEvent', () => {
	it('should run successfully', async () => {
		eventModel.findByIdAndUpdate = jest.fn()
			.mockImplementation(async () => ({ series: [1, 2, 3] }));
		seriesModel.findByIdAndUpdate = jest.fn();
		await eventService.updateEvent('123', { test: 'test', series: '123' });
		await expect(eventModel.findByIdAndUpdate.mock.calls.length).toEqual(1);
		expect(seriesModel.findByIdAndUpdate.mock.calls.length).toEqual(2);
	});
});

describe('testing sendUpdateEMail', () => {
	it('should run successfully', async () => {
		emailService.sendEmail = jest.fn();

		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				attendees: [{ user: { email: 'test@test.com' } }],
				capacity: 3,
				save() {
					return true;
				},
				toICSFormat() {
					return { uid: 123 };
				},
			})),
		};
		eventModel.findById = jest.fn().mockImplementation(() => result);
		await eventService.sendUpdateEmail('123');
		await expect(eventModel.findById.mock.calls.length).toEqual(1);
		await expect(emailService.sendEmail.mock.calls.length).toEqual(1);
	});
});

describe('testing send event reminder', () => {
	it('should run successfully and send 1 text', async () => {
		textService.sendText = jest.fn();
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				title: 'irrelevent',
				attendees: [{ user: { email: 'test@test.com', phoneNumber: 123 }, reminding: true }],
				date: new Date(),
				specificLocation: 'irrelevent',

			})),
		};
		passportService.getJwtToken = jest.fn().mockImplementation(async () => '5');
		urlService.shorten = jest.fn().mockImplementation(async () => '5');
		eventModel.findById = jest.fn().mockImplementation(() => result);
		await eventService.sendReminders('123');
		await expect(eventModel.findById.mock.calls.length).toEqual(1);
		await expect(passportService.getJwtToken.mock.calls.length).toEqual(1);
		await expect(urlService.shorten.mock.calls.length).toEqual(1);

		await expect(textService.sendText.mock.calls.length).toEqual(1);
	});
	it('should run successfully but not send texts', async () => {
		textService.sendText = jest.fn();
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				title: 'irrelevent',
				attendees: [{ user: { email: 'test@test.com', phoneNumber: 123 }, reminding: false }],
				date: new Date(),
				specificLocation: 'irrelevent',

			})),
		};
		eventModel.findById = jest.fn().mockImplementation(() => result);
		await eventService.sendReminders('123');
		await expect(eventModel.findById.mock.calls.length).toEqual(1);
		await expect(textService.sendText.mock.calls.length).toEqual(0);
	});
});
