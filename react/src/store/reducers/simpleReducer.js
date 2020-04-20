export default (state = { status: true }, action) => {
	switch (action.type) {
	case 'setStatus':
		return {
			...state,
			status: action.payload,
		};
	default:
		return state;
	}
};
