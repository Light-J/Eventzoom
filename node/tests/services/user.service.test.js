import bcryptjs from 'bcryptjs';
import userService from '../../src/services/user.service';

jest.mock('../../src/models/user.model');

describe('testing createUser', () => {
	it('should run successfully', async () => {
		bcryptjs.hash = jest.fn().mockImplementation(async () => 'qweasd');
		await expect(await userService.createUser({ password: 'qweasd' })).toEqual(undefined);
		expect(bcryptjs.hash.mock.calls[0]).toEqual(['qweasd', 8]);
	});
});
