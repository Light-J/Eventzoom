
import eventService from '../services/event.service';
// this is a single use middleware, so reusability will be low by design
const isEventPaid = (isPaid) => async (req, res, next) => {
	const event = await eventService.getEventById(req.params.id);
	if (!!event.price === isPaid) {
		return next();
	}
	return res.json({ success: false }, 400);
};

export default isEventPaid;
