import request from 'supertest';
import index from '../../src/root';
import userService from '../../src/services/user.service';
// eslint-disable-next-line no-unused-vars
import validator from '../../src/middleware/validator';

jest.mock('../../src/services/user.service');
// this horrific line mocks the validator middleware, and makes it skip everything
jest.mock('../../src/middleware/validator', () => jest.fn().mockImplementation(() => async (req, res, next) => { next(); }));

describe('/', () => {
	it('should call service and return success true', async () => {
		userService.createUser = jest.fn().mockImplementation(async () => ({ something: true }));
		// mock validator so it always passes
		// eslint-disable-next-line no-unused-expressions
		const res = await request(index.app)
			.post('/users')
			.send({ username: 'fuck' });
		await expect(res.body).toEqual({ success: true });
		await expect(userService.createUser.mock.calls[0]).toEqual([undefined]);
	});
});
