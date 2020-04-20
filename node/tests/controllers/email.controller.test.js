import request from 'supertest';
import index from '../../src/root';
import userService from '../../src/services/user.service';
import seriesService from '../../src/services/series.service';
import emailService from '../../src/services/email.service';

describe('testing emails', () => {
	it('should send successfully', async () => {
		userService.getAllUsers = jest.fn().mockImplementation(() => [
			[{ events: ['qwerty'] }],
			[{ events: [] }],
		]);
		seriesService.getUserSubscriptions = jest.fn().mockImplementation((stuff) => stuff);
		emailService.sendEmail = jest.fn();
		const res = await request(index.app)
			.get('/emails')
			.set('Secret', 'cats')
			.send();
		await expect(res.body).toEqual({ success: true });
		await expect(userService.getAllUsers.mock.calls).toMatchSnapshot();
		await expect(seriesService.getUserSubscriptions.mock.calls).toMatchSnapshot();
		await expect(emailService.sendEmail.mock.calls).toMatchSnapshot();
	});
});
