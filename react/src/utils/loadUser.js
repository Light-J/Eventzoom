import axios from 'axios';
import { setUser } from '../store/actions/actions';
import serverConfig from '../config/server';

let store = null;

const setStore = (newStore) => {
	store = newStore;
};

const refreshUser = () => {
	axios.get(`${serverConfig.url}users/me`).then((response) => {
		if (response.data.user) {
			store.dispatch(setUser(response.data.user));
		}
	}).catch(() => {});
};

export default { setStore, refreshUser };
