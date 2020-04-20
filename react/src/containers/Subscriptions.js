import React, { Component } from 'react';
import axios from 'axios';
import serverConfig from '../config/server';
import Subscription from '../components/Subscription';
import Conditional from '../components/Conditional';

class Subscriptions extends Component {
	state = {
		subscriptions: [],
	};

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
		<Conditional if={this.state.subscriptions.length === 0}>
			<h1>Please use the search page to subscribe to more series.</h1>
		</Conditional>
		{this.state.subscriptions.map((series) => <Subscription
			key={series._id}
			events={series.events}
			id={series._id}
			name={series.title} />)}
	</div>
}

export default Subscriptions;
