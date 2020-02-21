import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import App from './containers/App';
import configureStore from './store/store';
import { setUser } from './store/actions/actions';
import serverConfig from './config/server';

axios.interceptors.request.use((config) => {
	// eslint-disable-next-line no-param-reassign
	config.headers.Authorization = `Bearer ${localStorage.getItem('JWT')}`;
	return config;
});

const store = configureStore();

axios.get(`${serverConfig.url}users/me`).then((response) => {
	if (response.data.user) {
		store.dispatch(setUser(response.data.user));
	}
});

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById('root'),
);
