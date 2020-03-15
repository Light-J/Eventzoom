const isStaff = (req, res, next) => {
	if (req.user.sso && req.user.filterable.staff) {
		return next();
	}
	return res.json({
		success: false,
	}, 401);
};

export default isStaff;
