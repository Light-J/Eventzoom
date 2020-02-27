export default (state = { user: null }, action) => {
	switch (action.type) {
	case 'setUser':
		return {
			...state,
			user: action.payload,
		};
	default:
		return state;
	}
};
