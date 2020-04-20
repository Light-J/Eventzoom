import logModel from '../../src/models/log.model';
import logService from '../../src/services/log.service';

// Mock save. Mongoose save returns the Id of the document saved
const mockSave = jest.fn();
jest.mock('../../src/models/log.model', () => jest.fn().mockImplementation(() => ({ save: mockSave })));


describe('testing logOccurence', () => {
	it('should run successfully', async () => {
		mockSave.mockImplementation(async () => ({ _id: 5 }));
		await logService.logOccurence('test', 'test');
		expect(logModel.mock.calls[0]).toMatchSnapshot();
		expect(mockSave.mock.calls.length).toEqual(1);
	});
});
