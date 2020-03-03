import React, { Component } from 'react';
import axios from 'axios';
import serverConfig from '../config/server';

class Subscriptions extends Component {
	// state = {
	//
	// };
	//
	// static propTypes = {
	//
	// };

	componentDidMount = async () => {
		try {
			axios.get(`${serverConfig.url}series/subscriptions`);
		} catch {
			this.setState({ error: true });
		}
	};

	render = () => <div className="container mt-3">
		<h1>This is your subscriptions page</h1>
	</div>
}

export default Subscriptions;
