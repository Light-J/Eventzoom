import seriesService from '../../src/services/series.service';
import series from '../../src/models/series.model';

jest.mock('../../src/models/series.model');

describe('testing createSeries', () => {
	it('should run successfully', async () => {
		await seriesService.createSeries({ test: 'test' });
		expect(series.mock.calls[0]).toEqual([{ test: 'test' }]);
	});
});


describe('testing getSeriesById', () => {
	it('should work successfully', async () => {
		const result = { populate: jest.fn().mockImplementation(async () => 'test result') };
		series.findById = jest.fn().mockImplementation(() => result);
		await expect(await seriesService.getSeriesById(1)).toEqual('test result');
		await expect(series.findById.mock.calls[0]).toEqual([1]);
	});
	it('should throw error successfully', async () => {
		const result = { populate: jest.fn().mockImplementation(async () => { throw Error('irrelevant'); }) };
		series.findById = jest.fn().mockImplementation(() => result);
		await expect(seriesService.getSeriesById(1)).rejects.toEqual(new Error('Error while getting single series'));
		return expect(series.findById.mock.calls[0]).toEqual([1]);
	});
});

describe('testing getSeriesByUser', () => {
	it('should work successfully', async () => {
		series.find = jest.fn().mockImplementation(async () => 'test result');
		await expect(await seriesService.getSeriesForUser({ _id: 1 })).toEqual('test result');
		await expect(series.find.mock.calls[0]).toEqual([{ user: 1 }]);
	});
});

describe('testing getUserSubscriptions', () => {
	it('should work successfully', async () => {
		const FakeUser = {};
		series.find.populate = jest.fn().mockImplementation(async () => 'test result');
		await expect(await seriesService.getUserSubscriptions({ FakeUser })).toEqual('test result');
		await expect(series.find.mock.calls[0]).toEqual([FakeUser]);
	});
});
