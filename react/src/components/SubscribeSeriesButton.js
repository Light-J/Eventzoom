import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import serverConfig from '../config/server';

class SubscribeSeriesButton extends Component {
	static propTypes = {
		seriesId: PropTypes.string.isRequired,
	};

	state = {
		isSubscribed: false,
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}series/user-subscribed`,
			{
				params: {
					seriesId: this.props.seriesId,
				},
			}).then((result) => {
			this.setState({ isSubscribed: result });
		});
	}


	onSubscriptionChange = () => {
		axios.post(`${serverConfig.url}series/change-subscription`,
			{ seriesId: this.props.seriesId })
			.then(() => {
				this.setState({ isSubscribed: !this.state.isSubscribed });
			});
	};


	render = () => <button className={this.state.isSubscribed ? 'btn btn-danger btn-lg btn-block' : 'btn btn-success btn-lg btn-block' } onClick={this.onSubscriptionChange}>{this.state.isSubscribed ? 'Unfollow' : 'Follow'}</button>;
}

export default SubscribeSeriesButton;
