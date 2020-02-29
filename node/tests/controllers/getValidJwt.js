import passport from '../../src/controllers/auth/passport';
import User from '../../src/models/user.model';

const getValidToken = async () => {
	const found = await User.findOne({});
	return passport.getJwtToken(found._id);
};

export default getValidToken;
