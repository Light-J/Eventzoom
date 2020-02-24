import request from 'supertest';
import index from '../../src/root';
import seriesService from '../../src/services/series.service';
import fileService from '../../src/services/file.service';

jest.mock('../../src/services/series.service');

describe('/', () => {
	it('should calll service and return success true', async () => {
		seriesService.createSeries = jest.fn().mockImplementation(async () => ({ something: true }));
		fileService.uploadFile = jest.fn().mockImplementation(async () => ('http://google.com'));
		// eslint-disable-next-line no-unused-expressions
		const res = await request(index.app)
			.post('/series')
			.attach('image', `${__dirname}/image.png`)
			.field('title', 'Cats')
			.field('description', 'Cats');
		await expect(res.body).toEqual({ success: true });
		await expect(seriesService.createSeries.mock.calls[0]).toMatchSnapshot();
		await expect(fileService.uploadFile.mock.calls[0]).toMatchSnapshot();
	});
});
