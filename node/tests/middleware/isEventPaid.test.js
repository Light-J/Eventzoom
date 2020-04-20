import isEventPaid from '../../src/middleware/isEventPaid';
import eventService from '../../src/services/event.service';

describe('testing isEventPaid', () => {
	it('should succeed if event is free', async () => {
		const req = { params: { id: 5 } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ price: true }));
		await isEventPaid(true)(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});
	it('should fail if event is not free', async () => {
		const req = { params: { id: 5 } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ price: false }));
		await isEventPaid(true)(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});
});
