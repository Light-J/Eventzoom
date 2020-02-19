import mongoose from 'mongoose';
import uniqueEnforce from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
	email: {
		type: String, required: true, unique: true, lowercase: true,
	},
	password: { type: String, required: true },
});

UserSchema.methods.verifyPassword = async function verifyPassword(password) {
	let result;
	try {
		result = await bcrypt.compare(password, this.password);
	} catch (e) {
		return false;
	}
	return result;
};

UserSchema.plugin(uniqueEnforce);
const User = mongoose.model('User', UserSchema);

export default User;
