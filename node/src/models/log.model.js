import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
	event: { type: String, required: true },
	date: { type: Date, default: Date.now },
	data: { type: mongoose.Schema.Types.Mixed },
	referencedEvent: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Event' },
});

const Log = mongoose.model('Log', LogSchema);

export default Log;
