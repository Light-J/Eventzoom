import mongoose from 'mongoose';
import uniqueEnforce from 'mongoose-unique-validator';
import filterableFields from '../mixins/filterable';

const UserSchema = new mongoose.Schema({
	email: {
		type: String, required: true, unique: true, lowercase: true,
	},
	password: { type: String },
	subscribedSeries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'series' }],
	name: { type: String, required: false },
	sso: { type: Boolean, required: false },
	verified: { type: Boolean, required: false },
	mfaSecret: { type: String, required: false },
	mfaEnabled: { type: Boolean, required: false },
	filterable: { ...filterableFields },
	phoneNumber: { type: String, required: false },
	zoom: { refreshToken: { type: String, required: false } },
});

UserSchema.plugin(uniqueEnforce);

UserSchema.methods.toJSON = function removePassword() {
	const object = this.toObject();
	delete object.password;
	return object;
};
const User = mongoose.model('User', UserSchema);

export default User;
