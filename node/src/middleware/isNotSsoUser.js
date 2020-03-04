const isNotSsoUser = (req, res, next) => {
	if (!req.user.sso) {
		return next();
	}
	return res.json({
		success: false,
	});
};

export default isNotSsoUser;
