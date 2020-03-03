import React, { Component } from 'react';
import axios from 'axios';
import serverConfig from '../config/server';
import Subscription from '../components/Subscription';

class Subscriptions extends Component {
	state = {
		subscriptions: [],
	};
	//
	// static propTypes = {
	//
	// };

	componentDidMount = async () => {
		try {
			axios.get(`${serverConfig.url}series/subscriptions`).then((result) => {
				this.setState({ subscriptions: result.data });
			});
		} catch {
			this.setState({ error: true });
		}
	};

	render = () => <div className="container mt-3">
		<h1>This is your subscriptions page</h1>
		{this.state.subscriptions.map((series) => <Subscription
			key={series._id}
			events={series.events}
			name={series.title} />)}
	</div>
}

export default Subscriptions;
