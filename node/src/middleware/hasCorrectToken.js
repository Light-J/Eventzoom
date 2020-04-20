import serverConfig from '../../config/server';

const hasCorrectToken = (req, res, next) => {
	if (req.header('Secret') === serverConfig.secret) {
		return next();
	}
	return res.json({
		success: false,
	}, 400);
};

export default hasCorrectToken;
