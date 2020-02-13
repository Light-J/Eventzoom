import request from 'supertest';
import index from '../../src/index';
import eventService from '../../src/services/event.service';

jest.mock('../../src/services/event.service');

describe('testing events/', () => {
	it('should fetch all event', async () => {
		eventService.getEvents = jest.fn().mockImplementation(async () => ['example1', 'example2']);
		const res = await request(index.app)
			.get('/events')
			.send();
		expect(res.body).toEqual(['example1', 'example2']);
		expect(eventService.getEvents.mock.calls[0]).toEqual([{}]);
	});
	it('should fail if service returns error', async () => {
		eventService.getEvents = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events')
			.send();
		expect(res.body).toEqual({ status: 400, message: 'test' });
		expect(eventService.getEvents.mock.calls[0]).toEqual([{}]);
	});
});


describe('testing events/1', () => {
	it('should fetch successfully', async () => {
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		const res = await request(index.app)
			.get('/events/1')
			.send();
		expect(res.body).toEqual({ test: 'test' });
		expect(eventService.getEventById.mock.calls[0]).toEqual(['1']);
	});
	it('should fail if service returns error', async () => {
		eventService.getEventById = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events/1')
			.send();
		expect(res.body).toEqual({ status: 400, message: 'test' });
		expect(eventService.getEventById.mock.calls[0]).toEqual(['1']);
	});
});


afterAll(async () => {
	await index.server.close();
});
