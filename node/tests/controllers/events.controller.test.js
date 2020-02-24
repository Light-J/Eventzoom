import request from 'supertest';
import index from '../../src/root';
import eventService from '../../src/services/event.service';

jest.mock('../../src/services/event.service');

describe('testing events/', () => {
	it('should fetch all event', async () => {
		eventService.getEvents = jest.fn().mockImplementation(async () => ['example1', 'example2']);
		const res = await request(index.app)
			.get('/events')
			.send();
		await expect(res.body).toEqual(['example1', 'example2']);
		return expect(eventService.getEvents.mock.calls[0]).toEqual([{}]);
	});
	it('should fail if service returns error', async () => {
		eventService.getEvents = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		return expect(eventService.getEvents.mock.calls[0]).toEqual([{}]);
	});
});

describe('testing events/advanced', () => {
	it('should fetch an event', async () => {
		eventService.getEventsAdvanced = jest.fn().mockImplementation(async () => ['example1']);
		const res = await request(index.app)
			.get('/events/advanced?title=title')
			.send();
		await expect(res.body).toEqual(['example1']);
		return expect(eventService.getEvents.mock.calls[0]).toEqual([{}]);
	});
	it('should fail if service returns error', async () => {
		eventService.getEventsAdvanced = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events/advanced')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		return expect(eventService.getEvents.mock.calls[0]).toEqual([{}]);
	});
});


describe('testing events/1', () => {
	it('should fetch successfully', async () => {
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		const res = await request(index.app)
			.get('/events/1')
			.send();
		await expect(res.body).toEqual({ test: 'test' });
		return expect(eventService.getEventById.mock.calls[0]).toEqual(['1']);
	});
	it('should fail if service returns error', async () => {
		eventService.getEventById = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events/1')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		return expect(eventService.getEventById.mock.calls[0]).toEqual(['1']);
	});
});
