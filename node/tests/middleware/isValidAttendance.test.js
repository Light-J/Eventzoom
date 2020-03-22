import eventService from '../../src/services/event.service';
import isValidAttendance from '../../src/middleware/isValidAttendance';

describe('testing isValidAttendance', () => {
	it('should fail if event is in the past', async () => {
		const date = new Date();
		date.setFullYear(date.getFullYear() - 5);

		const req = { user: { _id: 5 }, validated: { attend: true }, params: { id: 5 } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ date }));
		eventService.userAttending = jest.fn().mockImplementation(async () => false);
		await isValidAttendance(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});

	it('should fail if event is in the future but already attending', async () => {
		const date = new Date();
		date.setFullYear(date.getFullYear() + 5);
		const req = { user: { _id: 5 }, validated: { attend: true }, params: { id: 5 } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ date }));
		eventService.userAttending = jest.fn().mockImplementation(async () => ({ attending: true }));
		await isValidAttendance(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});

	it('should pass if event is in the future and not already attending', async () => {
		const date = new Date();
		date.setFullYear(date.getFullYear() + 5);
		const req = { user: { _id: 5 }, validated: { attend: true }, params: { id: 5 } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ date }));
		eventService.userAttending = jest.fn().mockImplementation(async () => ({ attending: false }));
		await isValidAttendance(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});
});
