import logModel from '../../src/models/log.model';
import eventModel from '../../src/models/event.model';
import statisticsService from '../../src/services/statistics.service';

// Mock save. Mongoose save returns the Id of the document saved
const mockSave = jest.fn();
jest.mock('../../src/models/log.model', () => jest.fn().mockImplementation(() => ({ save: mockSave })));
jest.mock('../../src/models/event.model', () => jest.fn().mockImplementation(() => ({ save: mockSave })));


describe('testing logOccurence', () => {
	it('should run successfully', async () => {
		logModel.aggregate = jest.fn().mockImplementation(async () => 'stuff');
		eventModel.aggregate = jest.fn().mockImplementation(async () => 'stuff1');
		expect(await statisticsService.getStatistics()).toMatchSnapshot();
		expect(logModel.aggregate.mock.calls).toMatchSnapshot();
		expect(eventModel.aggregate.mock.calls).toMatchSnapshot();
	});
});
