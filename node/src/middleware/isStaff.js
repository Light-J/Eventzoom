const isStaff = (req, res, next) => {
	if (req.user.sso && req.user.filterable.staff) {
		return next();
	}
	return res.json({
		success: false,
	}, 400);
};

export default isStaff;
