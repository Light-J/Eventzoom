import mongoose from 'mongoose';

const AttachmentSchema = new mongoose.Schema({
	filename: { type: String, required: true },
	location: { type: String, required: true },
});

const Attachment = mongoose.model('Attachment', AttachmentSchema);

export default Attachment;
