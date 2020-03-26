import mongoose from 'mongoose';

const PasswordResetTokenSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	token: { type: String, required: true },
	date: { type: Date, default: Date.now },
});

const PasswordResetToken = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);

export default PasswordResetToken;
