import mongoose from 'mongoose';

const EmailVerificationTokenSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	token: { type: String, required: true },
	date: { type: Date, default: Date.now },
});

const EmailVerificationToken = mongoose.model('EmailVerificationToken', EmailVerificationTokenSchema);

export default EmailVerificationToken;
