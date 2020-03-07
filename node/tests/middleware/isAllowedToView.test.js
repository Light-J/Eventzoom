import authorizationService from '../../src/services/authorization.service';
import isAllowedToView from '../../src/middleware/isAllowedToView';

jest.mock('../../src/services/authorization.service');
describe('testing isALlowedToView', () => {
	it('should pass if model is null', async () => {
		const model = { findById: jest.fn() };
		model.findById.mockImplementation(async () => null);
		const req = { params: { username: 'fuck' } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		await isAllowedToView(model, 'username')(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});

	it('should pass if model is accesible', async () => {
		const model = { findById: jest.fn() };
		model.findById.mockImplementation(async () => 'not null');
		const req = { params: { username: 'fuck' } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		authorizationService.canAccessResource = jest.fn().mockImplementation(() => true);
		await isAllowedToView(model, 'username')(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});

	it('should fail if model is not accessible', async () => {
		const model = { findById: jest.fn() };
		model.findById.mockImplementation(async () => 'not null');
		const req = { params: { username: 'fuck' } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		authorizationService.canAccessResource = jest.fn().mockImplementation(() => false);
		await isAllowedToView(model, 'username')(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});
});
