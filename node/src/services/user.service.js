import bcrypt from 'bcryptjs';
import User from '../models/user.model';

const createUser = async (user) => {
	await ((new User({ ...user, password: bcrypt.hashSync(user.password, 8) })).save());
	return true;
};


export default { createUser };
