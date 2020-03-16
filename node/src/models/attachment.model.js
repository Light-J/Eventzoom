import mongoose from 'mongoose';

const AttachmentSchema = new mongoose.Schema({
	fileName: { type: String, required: true },
	location: { type: String, required: true },
});

const Attachment = mongoose.model('attachments', AttachmentSchema);

export default Attachment;
