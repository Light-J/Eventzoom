
// Used to determine if the request user owns the event or series
// Based on Hristos isAllowedToView middleware
const isOwner = (model, paramId, isValidated) => async (req, res, next) => {
	const param = isValidated ? req.validated[paramId] : req.params[paramId];
	const instance = await model.findById(param).populate();
	// not my problem if there's no instance
	if (!instance) {
		return next();
	}

	// Accommodates both events and series
	if (
		(instance.organiser && instance.organiser.equals(req.user._id))
			|| (instance.user && instance.user.equals(req.user._id))) {
		return next();
	}

	return res.json({ success: false }, 401);
};

export default isOwner;
