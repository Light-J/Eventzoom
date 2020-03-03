import request from 'supertest';
import index from '../../src/root';
import seriesService from '../../src/services/series.service';
import fileService from '../../src/services/file.service';
import getValidJwt from './getValidJwt';

jest.mock('../../src/services/series.service');

describe('/', () => {
	it('should calll service and return success true', async () => {
		seriesService.createSeries = jest.fn().mockImplementation(async () => ({ something: true }));
		fileService.uploadFile = jest.fn().mockImplementation(async () => ('http://google.com'));
		const res = await request(index.app)
			.post('/series')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.attach('image', `${__dirname}/image.png`)
			.field('title', 'Cats')
			.field('description', 'Cats');
		await expect(res.status).toBe(200);
		await expect(res.body).toEqual({ success: true });
		await expect(seriesService.createSeries.mock.calls[0]).toMatchSnapshot();
		return expect(fileService.uploadFile.mock.calls[0]).toMatchSnapshot();
	});
});


describe('testing series/1', () => {
	it('should fetch successfully', async () => {
		seriesService.getSeriesById = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		const res = await request(index.app)
			.get('/series/1')
			.send();
		await expect(res.body).toEqual({ test: 'test' });
		return expect(seriesService.getSeriesById.mock.calls[0]).toEqual(['1']);
	});
	it('should fail if service returns error', async () => {
		seriesService.getSeriesById = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/series/1')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		return expect(seriesService.getSeriesById.mock.calls[0]).toEqual(['1']);
	});
});

describe('testing series/subscriptions', () => {
	it('should fetch users series successfully', async () => {
		seriesService.getUserSubscriptions = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		const res = await request(index.app)
			.get('/series/subscriptions')
			.send();
		await expect(res.body).toEqual({ test: 'test' });
		return expect(seriesService.getUserSubscriptions().mock.calls[0]).toEqual([]);
	});
});

describe('testing series/mine', () => {
	it('should fetch successfully', async () => {
		seriesService.getSeriesForUser = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		const res = await request(index.app)
			.get('/series/mine')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send();
		await expect(res.body).toEqual({ test: 'test' });
		return expect(seriesService.getSeriesById.mock.calls[0][0]._id).toMatchSnapshot();
	});
});
