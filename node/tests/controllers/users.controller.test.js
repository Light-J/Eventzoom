import request from 'supertest';
import index from '../../src/root';
import userService from '../../src/services/user.service';
// eslint-disable-next-line no-unused-vars
import validator from '../../src/middleware/validator';
import getValidJwt from './getValidJwt';
import eventService from '../../src/services/event.service';

jest.mock('../../src/services/user.service');
// this horrific line mocks the validator middleware, and makes it skip everything
jest.mock('../../src/middleware/validator', () => jest.fn().mockImplementation(() => async (req, res, next) => { next(); }));

describe('testing posting to /users', () => {
	it('should call service and return success true', async () => {
		userService.createUser = jest.fn().mockImplementation(async () => ({ something: true }));
		// mock validator so it always passes
		// eslint-disable-next-line no-unused-expressions
		const res = await request(index.app)
			.post('/users')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send({ username: 'fuck' });
		await expect(res.body).toEqual({ success: true });
		return expect(userService.createUser.mock.calls[0]).toEqual([undefined]);
	});
});

describe('testing putting to users/me', () => {
	it('should call services and return success true and a user', async () => {
		userService.setUserProfileById = jest.fn().mockImplementation();
		userService.getUserById = jest.fn().mockImplementation(async () => ({ name: 'test', email: 'test@test' }));

		// mock validator so it always passes
		// eslint-disable-next-line no-unused-expressions
		const res = await request(index.app)
			.put('/users/me')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send({ name: 'test', email: 'test@test' });
		await expect(res.body.success).toEqual(true);
		await expect(res.body.user.email).toEqual('test@test');
		await expect(userService.getUserById.mock.calls.length).toEqual(2);
		return expect(userService.setUserProfileById.mock.calls.length).toEqual(1);
	});
});

describe('testing putting to users/me/password', () => {
	it('should call setUserPasswordById service and return success true', async () => {
		userService.setUserPasswordById = jest.fn().mockImplementation();

		// mock validator so it always passes
		// eslint-disable-next-line no-unused-expressions
		const res = await request(index.app)
			.put('/users/me/password')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send({ currentPassword: 'hello', newPasswordConfirmation: 'hello123', newPassword: 'hello123' });
		await expect(userService.setUserPasswordById.mock.calls.length).toEqual(1);
		return expect(res.body.success).toEqual(true);
	});
});


describe('testing getting to users/me/attending', () => {
	it('should call services and return result', async () => {
		eventService.getUserAttendingEvents = jest.fn().mockImplementation(() => [{ qwe: 'asd' }]);
		const res = await request(index.app)
			.get('/users/me/attending')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send();
		await expect(res.body).toEqual([{ qwe: 'asd' }]);
		return expect(eventService.getUserAttendingEvents.mock.calls.length).toEqual(1);
	});
});
