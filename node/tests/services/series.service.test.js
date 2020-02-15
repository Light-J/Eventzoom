import seriesService from '../../src/services/series.service';
import series from '../../src/models/series.model';

jest.mock('../../src/models/series.model');

describe('testing createSeries', () => {
	it('should run successfully', async () => {
		await seriesService.createSeries({ test: 'test' });
		expect(series.mock.calls[0]).toEqual([{ test: 'test' }]);
	});
});
