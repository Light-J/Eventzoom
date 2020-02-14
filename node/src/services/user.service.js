import User from '../models/user.model';

const createUser = async (user) => {
	await ((new User(user)).save());
	return true;
};


export default { createUser };
