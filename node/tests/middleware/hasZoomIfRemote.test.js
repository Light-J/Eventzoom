import hasZoomIfRemote from '../../src/middleware/hasZoomIfRemote';


describe('testing isStaff', () => {
	it('should pass with zoom and remote event', async () => {
		const req = { user: { zoom: true }, validated: { remoteEvent: true } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		hasZoomIfRemote(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});
	it('should pass with no zoom and no remote event', async () => {
		const req = { user: { zoom: false }, validated: { remoteEvent: false } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		hasZoomIfRemote(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(0);
		await expect(next.mock.calls.length).toEqual(1);
	});
	it('should fail with no zoom and remote event', async () => {
		const req = { user: { zoom: false }, validated: { remoteEvent: true } };
		const res = { json: jest.fn() };
		const next = jest.fn();
		hasZoomIfRemote(req, res, next);
		await expect(res.json.mock.calls.length).toEqual(1);
		await expect(next.mock.calls.length).toEqual(0);
	});
});
