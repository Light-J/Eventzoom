import isOwner from '../../src/middleware/isOwner';

describe('testing isOwner', () => {
	it('should fail if model is null', async () => {
		const model = { findById: jest.fn() };
		const result = { populate: jest.fn().mockImplementation(async () => 'test result') };
		model.findById = jest.fn().mockImplementation(() => result);
		const req = { params: { username: 'test' } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		await isOwner(model, 'username')(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});

	it('should pass if model is valid and owner present', async () => {
		const model = { findById: jest.fn() };
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				organiser: {
					_id: '123',
					equals(id) {
						return id === this._id;
					},
				},
			})),
		};
		model.findById = jest.fn().mockImplementation(() => result);
		const req = { params: { id: '123' }, user: { _id: '123' } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		await isOwner(model, 'id')(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});

	it('should pass if model is valid and owner not present', async () => {
		const model = { findById: jest.fn() };
		const result = {
			populate: jest.fn().mockImplementation(async () => ({
				organiser: {
					_id: '321',
					equals(id) {
						return id === this._id;
					},
				},
			})),
		};
		model.findById = jest.fn().mockImplementation(() => result);
		const req = { params: { id: '123' }, user: { _id: '123' } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		await isOwner(model, 'id')(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});
});
