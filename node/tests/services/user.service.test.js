import bcryptjs from 'bcryptjs';
import userService from '../../src/services/user.service';

jest.mock('../../src/models/user.model');

describe('testing createUser', () => {
	it('should run successfully', async () => {
		bcryptjs.hashSync = jest.fn().mockReturnValue('qweasd');
		await expect(await userService.createUser({ password: 'qweasd' })).toEqual(true);
		expect(bcryptjs.hashSync.mock.calls[0]).toEqual(['qweasd', 8]);
	});
});
