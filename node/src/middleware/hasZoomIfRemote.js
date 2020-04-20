// single use middleware
const hasZoomIfRemote = async (req, res, next) => {
	if (
		(req.validated.remoteEvent && req.user.zoom)
		|| !req.validated.remoteEvent
	) {
		return next();
	}
	return res.json({ success: false }, 400);
};

export default hasZoomIfRemote;
