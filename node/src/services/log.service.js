import Log from '../models/log.model';

const logOccurence = async (event, data = null, referencedEvent = null) => {
	const log = new Log({ event, data, referencedEvent });
	return log.save();
};
export default { logOccurence };
