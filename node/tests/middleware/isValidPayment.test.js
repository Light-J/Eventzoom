import isValidPayment from '../../src/middleware/isValidPayment';
import eventService from '../../src/services/event.service';
import stripeService from '../../src/services/stripe.service';

describe('testing isValidPayment', () => {
	it('should succeed if stripe validates', async () => {
		const req = { params: { id: 5 }, validated: { intent: 5 } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		eventService.getEventById = jest.fn().mockImplementation(async () => 'test');
		stripeService.validatePayment = jest.fn().mockImplementation(async () => true);
		await isValidPayment(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});
	it('should fail if stripe doesnt validate', async () => {
		const req = { params: { id: 5 }, validated: { intent: 5 } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		eventService.getEventById = jest.fn().mockImplementation(async () => 'test');
		stripeService.validatePayment = jest.fn().mockImplementation(async () => false);
		await isValidPayment(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});
});
