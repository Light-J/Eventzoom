import request from 'supertest';
import index from '../../src/root';
import statisticsService from '../../src/services/statistics.service';
import getValidJwt from './getValidJwt';

jest.mock('../../src/middleware/isStaff', () => jest.fn().mockImplementation((req, res, next) => next()));


describe('testing GET statistics/', () => {
	it('should fetch whatever the service returns', async () => {
		statisticsService.getStatistics = jest.fn().mockImplementation(async () => ['example1', 'example2']);
		const res = await request(index.app)
			.get('/statistics')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send();
		await expect(res.body).toEqual(['example1', 'example2']);
		return expect(statisticsService.getStatistics.mock.calls.length).toEqual(1);
	});
});
