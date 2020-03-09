import emailConfig from '../../config/email';

const hasCorrectToken = (req, res, next) => {
	if (req.header('Secret') === emailConfig.secret) {
		return next();
	}
	return res.json({
		success: false,
	});
};

export default hasCorrectToken;