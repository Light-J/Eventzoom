import mongoose from 'mongoose';
import uniqueEnforce from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
	email: {
		type: String, requred: true, unique: true, lowercase: true,
	},
	password: { type: String, required: true },

});
UserSchema.plugin(uniqueEnforce);
const User = mongoose.model('User', UserSchema);

export default User;