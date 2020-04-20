/* eslint-disable max-classes-per-file */
import bcryptjs from 'bcryptjs';
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
				// eslint-disable-next-line no-throw-literal
				throw { errors: { exception1: '123' } };
			};
		};
		await validator('validModel', { model })(req, res, next);
		expect(res.status.mock.calls[0]).toMatchSnapshot();
		expect(res.json.mock.calls[0]).toMatchSnapshot();
		expect(next.mock.calls.length).toEqual(0);
	});
	it('should succeed if field is in exceptions if fields are the same', async () => {
		const req = { validated: {} };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		const model = class Model {
			validate = async () => {
				// eslint-disable-next-line no-throw-literal
				throw { errors: { exception1: '123' } };
			};
		};
		await validator('validModel', { model, excludedFields: ['exception1'] })(req, res, next);
		expect(req.validated.validated).toEqual(true);
		expect(next.mock.calls.length).toEqual(1);
	});
});

describe('testing correctPassword', () => {
	it('should succeed if correct', async () => {
		const req = { body: { password: 'hello' }, user: { password: '$2a$08$3l7YO0UVu3u.xHOspgokQufV9YJYRblkNgfTFmXbHn/L4MdpVHZEK' } };
		const res = { status: jest.fn(), json: jest.fn() };
		bcryptjs.compare = jest.fn().mockImplementation(async () => true);
		const next = jest.fn();
		await validator('correctPassword', { field: 'password' })(req, res, next);
		expect(req.validated.password).toEqual('hello');
	});
	it('should fail if not correct', async () => {
		const req = { body: { password: 'xxx' }, user: { password: '$2a$08$3l7YO0UVu3u.xHOspgokQufV9YJYRblkNgfTFmXbHn/L4MdpVHZEK' } };
		const res = { status: jest.fn(), json: jest.fn() };
		bcryptjs.compare = jest.fn().mockImplementation(async () => false);
		const next = jest.fn();
		await validator('correctPassword', { field: 'password' })(req, res, next);
		expect(req.validated.password).toEqual(undefined);
	});
	it('should fail if null', async () => {
		const req = { body: { }, user: { password: '$2a$08$3l7YO0UVu3u.xHOspgokQufV9YJYRblkNgfTFmXbHn/L4MdpVHZEK' } };
		const res = { status: jest.fn(), json: jest.fn() };
		bcryptjs.compare = jest.fn().mockImplementation(async () => false);
		const next = jest.fn();
		await validator('correctPassword', { field: 'password' })(req, res, next);
		expect(req.validated.password).toEqual(undefined);
	});
});


describe('testing in', () => {
	it('should succeed if correct', async () => {
		const req = { body: { password: 'hello' } };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		await validator('in', { field: 'password', matches: ['hello', 'hi', 'bye'] })(req, res, next);
		expect(req.validated.password).toEqual('hello');
		expect(next.mock.calls.length).toEqual(1);
	});
	it('should fail if not correct', async () => {
		const req = { body: { password: 'not-a-greeting' } };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		await validator('in', { field: 'password', matches: ['hello', 'hi', 'bye'] })(req, res, next);
		expect(req.validated.password).toEqual(undefined);
		expect(next.mock.calls.length).toEqual(0);
	});
});

describe('testing boolean', () => {
	it('should succeed if truthy', async () => {
		const req = { body: { password: 'is here' } };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		await validator('boolean', { field: 'password' })(req, res, next);
		expect(req.validated.password).toEqual(true);
		expect(next.mock.calls.length).toEqual(1);
	});
	it('should succeed if falsey', async () => {
		const req = { body: { password: '' } };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		await validator('boolean', { field: 'password' })(req, res, next);
		expect(req.validated.password).toEqual(false);
		expect(next.mock.calls.length).toEqual(1);
	});
	it('should fail if nonexistent', async () => {
		const req = { body: {} };
		const res = { status: jest.fn(), json: jest.fn() };
		const next = jest.fn();
		await validator('boolean', { field: 'password' })(req, res, next);
		expect(res.json.mock.calls.length).toEqual(1);
	});
});
