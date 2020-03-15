import authorizationService from '../services/authorization.service';

const isAllowedToView = (model, paramId, isValidated = false) => async (req, res, next) => {
	const param = isValidated ? req.validated[paramId] : req.params[paramId];
	const instance = await model.findById(param);
	// not my problem if there's no instance
	if (!instance) {
		return next();
	}

	if (authorizationService.canAccessResource(instance, req.user)) {
		return next();
	}
	return res.json({ success: false }, 401);
};

export default isAllowedToView;
