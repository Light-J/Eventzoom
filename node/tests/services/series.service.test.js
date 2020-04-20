import seriesService from '../../src/services/series.service';
import series from '../../src/models/series.model';
import authorizationService from '../../src/services/authorization.service';

jest.mock('../../src/models/series.model');

describe('testing createSeries', () => {
	it('should run successfully', async () => {
		await seriesService.createSeries({ test: 'test' });
		expect(series.mock.calls[0]).toEqual([{ test: 'test' }]);
	});
});

describe('testing getSeriesById', () => {
	it('should work successfully', async () => {
		const populateMock = { populate: () => 'test result' };
		const result = {
			populate: () => populateMock,
		};
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


describe('testing getSeriesByUser', () => {
	it('should work successfully', async () => {
		series.find = jest.fn().mockImplementation(async () => 'test result');
		await expect(await seriesService.getSeriesForUser({ _id: 1 })).toEqual('test result');
		await expect(series.find.mock.calls[0]).toEqual([{ user: 1 }]);
	});
});

describe('testing getSeriesByKeyword', () => {
	it('should work successfully', async () => {
		series.find = jest.fn().mockImplementation(() => ({ limit: jest.fn().mockImplementation(() => 'test result') }));
		await expect(await seriesService.getSeriesByKeyword('test')).toEqual('test result');
	});
	it('should work successfully without providing a query', async () => {
		series.find = jest.fn().mockImplementation(() => ({ limit: jest.fn().mockImplementation(() => 'test result') }));
		await expect(await seriesService.getSeriesByKeyword()).toEqual('test result');
	});
	it('should throw an error', async () => {
		series.find = jest.fn().mockImplementation(async () => { throw Error('Some kind of mongoose error'); });
		await expect(seriesService.getSeriesByKeyword()).rejects.toEqual(new Error('Error while querying for series'));
	});
});

describe('testing getUserSubscriptions', () => {
	it('should work successfully', async () => {
		// eslint-disable-next-line max-len
		authorizationService.filterInaccessible = jest.fn().mockImplementation((something) => something);
		const fakeUser = { subscribedSeries: [1, 2, 3] };
		const result = {
			populate: jest.fn().mockImplementation(
				async () => [
					{
						toObject: jest.fn().mockImplementation(() => ({ test: 'test' })),
					},
				],
			),
		};
		series.find = jest.fn().mockImplementation(() => result);
		await seriesService.getUserSubscriptions(fakeUser);
		await expect(series.find.mock.calls[0][0]._id.$in).toEqual([1, 2, 3]);
	});
});


describe('testing update user subscriptions', () => {
	it('should subscribe user successfully', async () => {
		const fakeUser = { subscribedSeries: [1, 2, 3] };
		fakeUser.save = jest.fn().mockImplementation(async () => 'test');
		await seriesService.changeUserSeriesSubscription(123, fakeUser, true);
		await expect(fakeUser.subscribedSeries).toEqual([1, 2, 3, 123]);
	});
	it('should unsubscribe user successfully', async () => {
		const fakeUser = { subscribedSeries: [1, 2, 3] };
		fakeUser.save = jest.fn().mockImplementation(async () => 'test');
		fakeUser.subscribedSeries.pull = jest.fn().mockImplementation(() => {
			const index = fakeUser.subscribedSeries.indexOf(2);
			if (index !== -1) fakeUser.subscribedSeries.splice(index, 1);
		});
		await seriesService.changeUserSeriesSubscription(2, fakeUser, false);
		await expect(fakeUser.subscribedSeries.includes(2)).toEqual(false);
	});
});
