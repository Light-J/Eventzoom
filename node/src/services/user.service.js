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

const setUserPasswordById = async (id, password) => {
	try {
		const hash = await bcrypt.hash(password, 8);
		return await User.findByIdAndUpdate(id, { password: hash });
	} catch (e) {
		throw Error('Error while setting password for single user');
	}
};

const setUserProfileById = async (id, user) => {
	try {
		return await User.findByIdAndUpdate(id, user);
	} catch (e) {
		throw Error('Error while setting profile for single user');
	}
};
const getAllUsers = async () => User.find({});
export default {
	createUser, getUserByEmail, getUserById, setUserPasswordById, setUserProfileById, getAllUsers,
};
