
import eventService from '../services/event.service';
import stripeService from '../services/stripe.service';
// this is a single use middleware, so reusability will be low by design
const isValidPayment = async (req, res, next) => {
	const event = await eventService.getEventById(req.params.id);
	const success = await stripeService.validatePayment(req.validated.intent, event, req.user);
	if (success) {
		return next();
	}
	return res.json({ success: false }, 400);
};

export default isValidPayment;
