import request from 'supertest';
import index from '../../src/root';
import zoomService from '../../src/services/zoom.service';
import getValidJwt from './getValidJwt';
import userService from '../../src/services/user.service';

jest.mock('../../src/middleware/isStaff', () => jest.fn().mockImplementation((req, res, next) => next()));

describe('testing GET /', () => {
	it('should get the correct URL', async () => {
		zoomService.getZoomRedirectUrl = jest.fn().mockImplementation(() => 'http://google.com');
		const res = await request(index.app)
			.get(`/zoom?jwt=${await getValidJwt()}`)
			.send();
		await expect(res.header.location).toEqual('http://google.com');
		await expect(res.status).toBe(302);
		await expect(zoomService.getZoomRedirectUrl.mock.calls.length).toBe(1);
	});
});

describe('testing GET /auth', () => {
	it('should call all the services', async () => {
		zoomService.getRefreshTokenFromCodeAndJwt = jest.fn().mockImplementation(() => 'fuck');
		userService.setUserProfileById = jest.fn();
		const res = await request(index.app)
			.get(`/zoom/auth?jwt=${await getValidJwt()}&code=5`)
			.send();
		await expect(zoomService
			.getRefreshTokenFromCodeAndJwt
			.mock
			.calls[0][1]).toEqual('5');

		await expect(userService
			.setUserProfileById
			.mock
			.calls[0][1]).toEqual({ zoom: { refreshToken: 'fuck' } });
		await expect(res.status).toBe(302);
	});
});


describe('testing DELETE /', () => {
	it('should call all the services', async () => {
		userService.setUserProfileById = jest.fn();
		const res = await request(index.app)
			.delete('/zoom')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send();

		await expect(userService
			.setUserProfileById
			.mock
			.calls[0][1]).toEqual({ zoom: undefined });
		await expect(res.status).toBe(200);
	});
});
