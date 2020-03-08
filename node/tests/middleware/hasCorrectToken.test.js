import hasCorrectToken from '../../src/middleware/hasCorrectToken';


describe('testing hasCorrectToken', () => {
	it('should fail if secret is wrong', async () => {
		const req = { header: jest.fn().mockImplementation(() => 'dogs') };
		const res = { json: jest.fn() };
		const next = jest.fn();
		hasCorrectToken(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});
	it('should succeed if sso is trus', async () => {
		const req = { header: jest.fn().mockImplementation(() => 'cats') };
		const res = { json: jest.fn() };
		const next = jest.fn();
		hasCorrectToken(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});
});
