import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import App from './containers/App';
import configureStore from './store/store';
import loadUser from './utils/loadUser';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './registerServiceWorker';
import './scss/main.scss';

axios.interceptors.request.use((config) => {
	// eslint-disable-next-line no-param-reassign
	config.headers.Authorization = `Bearer ${localStorage.getItem('JWT')}`;
	return config;
});

const store = configureStore();
loadUser.setStore(store);
loadUser.refreshUser();

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById('root'),
);
