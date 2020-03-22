
import eventService from '../services/event.service';
// this is a single use middleware, so reusability will be low by design
const isValidAttendance = async (req, res, next) => {
	const userAttendingAlreadyAttended = req.validated.attend
		&& (await eventService.userAttending(req.params.id, req.user)).attending;
	const event = await eventService.getEventById(req.params.id);
	if (
		event.date < new Date()
		|| userAttendingAlreadyAttended
	) {
		return res.json({ success: false }, 400);
	}
	return next();
};

export default isValidAttendance;
