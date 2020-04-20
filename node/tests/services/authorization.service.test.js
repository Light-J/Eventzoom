import authorizationService from '../../src/services/authorization.service';

describe('testing canAccessRsource', () => {
	it('should succeed if no filterable', async () => {
		const instance = { toObject: jest.fn().mockImplementation(() => ({})) };
		const user = {};
		expect(authorizationService.canAccessResource(instance, user)).toBe(true);
	});

	it('should fail if filterable and no user', async () => {
		const instance = {
			toObject: jest.fn().mockImplementation(() => ({
				filterable: {
					staff: true,
					whitelist: [],
				},
			})),
		};
		const user = null;
		expect(authorizationService.canAccessResource(instance, user)).toBe(false);
	});

	it('should fail if filterable and user doesn\'t match', async () => {
		const instance = {
			toObject: jest.fn().mockImplementation(() => ({
				filterable: {
					staff: true,
					whitelist: [],
				},
			})),
		};
		const user = { filterable: { staff: false } };
		expect(authorizationService.canAccessResource(instance, user)).toBe(false);
	});

	it('should pass if filterable and user match', async () => {
		const instance = {
			toObject: jest.fn().mockImplementation(() => ({
				filterable: {
					staff: true,
					whitelist: [],
				},
			})),
		};
		const user = { filterable: { staff: true, thing: false } };
		expect(authorizationService.canAccessResource(instance, user)).toBe(true);
	});
});


describe('testing generateFilterableField', () => {
	it('should work', async () => {
		const instance = {
			restrictToSchool: '1', restrictToStaff: '0', noPublic: '1', whitelist: 'user@example.org,hello@hello.com',
		};
		const user = { email: 'me@hdimitrov.com', filterable: { school: 'comsc' } };
		expect(authorizationService.generateFilterableField(instance, user)).toStrictEqual({ public: false, school: 'comsc', whitelist: ['user@example.org', 'hello@hello.com', 'me@hdimitrov.com'] });
	});
});
