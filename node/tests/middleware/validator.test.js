/* eslint-disable max-classes-per-file */
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


describe('testing sameAs', () => {
	it('should succeed if fields are the same', async () => {
		const req = { body: { password: '123', passwordConfirm: '123' } };
		const res = {};
		const next = jest.fn();
		await validator('sameAs', { field: 'password', otherField: 'passwordConfirm' })(req, res, next);
		expect(req.validated.password).toEqual('123');
		expect(next.mock.calls.length).toEqual(1);
	});
	it('should fail if fields are the same', async () => {
		const req = { body: { password: '123', passwordConfirm: '1235' } };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		await validator('sameAs', { field: 'password', otherField: 'passwordConfirm' })(req, res, next);
		expect(res.status.mock.calls[0]).toMatchSnapshot();
		expect(res.json.mock.calls[0]).toMatchSnapshot();
		expect(next.mock.calls.length).toEqual(0);
	});
});

describe('testing regex', () => {
	it('should succeed if regex is matched', async () => {
		const req = { body: { email: '123@gmail.com' } };
		const res = {};
		const next = jest.fn();
		await validator('regex', { field: 'email', regex: /[^@]+@[^.]+\..+/ })(req, res, next);
		expect(req.validated.email).toEqual('123@gmail.com');
		expect(next.mock.calls.length).toEqual(1);
	});
	it('should fail if regex is wrong', async () => {
		const req = { body: { email: '123' } };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		await validator('regex', { field: 'email', regex: /[^@]+@[^.]+\..+/ })(req, res, next);
		expect(res.status.mock.calls[0]).toMatchSnapshot();
		expect(res.json.mock.calls[0]).toMatchSnapshot();
		expect(next.mock.calls.length).toEqual(0);
	});
});

describe('testing validModel', () => {
	it('should succeed if valid', async () => {
		const req = { validated: {} };
		const res = {};
		const next = jest.fn();
		const model = class Model {
			validate = async () => true;
		};
		await validator('validModel', { model })(req, res, next);
		expect(req.validated.validated).toEqual(true);
		expect(next.mock.calls.length).toEqual(1);
	});
	it('should fail if fields are the same', async () => {
		const req = { validated: {} };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		const model = class Model {
			validate = async () => {
				throw Error('test error');
			};
		};
		await validator('validModel', { model })(req, res, next);
		expect(res.status.mock.calls[0]).toMatchSnapshot();
		expect(res.json.mock.calls[0]).toMatchSnapshot();
		expect(next.mock.calls.length).toEqual(0);
	});
});
