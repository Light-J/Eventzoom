import eventModel from '../../src/models/event.model';
import seriesModel from '../../src/models/series.model';
import eventService from '../../src/services/event.service';

const mockSave = jest.fn();
jest.mock('../../src/models/event.model', () => jest.fn().mockImplementation(() => ({ save: mockSave })));
jest.mock('../../src/models/series.model');


describe('testing getEvents', () => {
	it('should getMessages successfully', async () => {
		eventModel.find = jest.fn().mockImplementation(async () => 'test result');
		await expect(await eventService.getEvents()).toEqual('test result');
	});
	it('should throw error successfully', async () => {
		eventModel.find = jest.fn().mockImplementation(async () => { throw Error('irrelevant'); });
		await expect(eventService.getEvents()).rejects.toEqual(new Error('Error while getting events'));
	});
});

describe('testing getEvents for the advanced search', () => {
	it('should getMessages successfully', async () => {
		eventModel.find = jest.fn().mockImplementation(async () => 'test result');
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
