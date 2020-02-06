
export const syncActionExample = (status) => ({
	type: 'setStatus',
	payload: status,
});

export const asyncActionExample = (status) => (dispatch) => {
	dispatch({ type: 'setStatus', payload: status });
};
