import bcrypt from 'bcryptjs';
import User from '../models/user.model';

const createUser = async (user) => {
	let userToRegister;
	if (user.password) {
		const hash = await bcrypt.hash(user.password, 8);
		userToRegister = { ...user, password: hash };
	} else {
		userToRegister = user;
	}
	return ((new User(userToRegister)).save());
};

const getUserByEmail = async (email) => {
	try {
		return await User.findOne({ email });
	} catch (e) {
		throw Error('Error while getting single user');
	}
};

const getUserById = async (id) => {
	try {
		return await User.findById(id);
	} catch (e) {
		throw Error('Error while getting single user');
	}
};


export default {
	createUser, getUserByEmail, getUserById,
};
