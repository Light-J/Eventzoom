import isStaff from '../../src/middleware/isStaff';


describe('testing isStaff', () => {
	it('should fail if sso is false', async () => {
		const req = { user: { sso: false } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		isStaff(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});
	it('should succeed if sso is trus', async () => {
		const req = { user: { sso: true, filterable: { staff: true } } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		isStaff(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});
});
