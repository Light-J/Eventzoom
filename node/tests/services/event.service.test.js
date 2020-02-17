import eventModel from '../../src/models/event.model';
import eventService from '../../src/services/event.service';

jest.mock('../../src/models/event.model');


describe('testing getEvents', () => {
	it('should getMessages successfully', async () => {
		eventModel.find = jest.fn().mockImplementation(async () => 'test result');
		await expect(await eventService.getEvents({})).toEqual('test result');
		await expect(eventModel.find.mock.calls[0]).toEqual([{}]);
	});
	it('should throw error successfully', async () => {
		eventModel.find = jest.fn().mockImplementation(async () => { throw Error('irrelevant'); });
		await expect(eventService.getEvents({})).rejects.toEqual(new Error('Error while getting events'));
		await expect(eventModel.find.mock.calls[0]).toEqual([{}]);
	});
});


describe('testing getEventByid', () => {
	it('should getMessages successfully', async () => {
		eventModel.findById = jest.fn().mockImplementation(async () => 'test result');
		await expect(await eventService.getEventById(1)).toEqual('test result');
		await expect(eventModel.findById.mock.calls[0]).toEqual([1]);
	});
	it('should throw error successfully', async () => {
		eventModel.findById = jest.fn().mockImplementation(async () => { throw Error('irrelevant'); });
		await expect(eventService.getEventById(1)).rejects.toEqual(new Error('Error while getting single event'));
		return expect(eventModel.findById.mock.calls[0]).toEqual([1]);
	});
});
