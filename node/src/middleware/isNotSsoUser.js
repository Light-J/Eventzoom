const isNotSsoUser = (req, res, next) => {
	if (!req.user.sso) {
		return next();
	}
	return res.json({
		success: false,
	}, 400);
};

export default isNotSsoUser;
