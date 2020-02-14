import validator from '../../src/middleware/validator';

// taken from https://gitlab.cs.cf.ac.uk/c1734384/react-assessment-1/blob/master/assessment-1-server/tests/middleware/validation.test.js
describe('testing required', () => {
	it('should fail if required does not exist', async () => {
		const req = { body: { username: '' } };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		await validator('required', { field: 'username' })(req, res, next);
		expect(res.status.mock.calls[0]).toMatchSnapshot();
		expect(res.json.mock.calls[0]).toMatchSnapshot();
		expect(next.mock.calls.length).toEqual(0);
	});
});
