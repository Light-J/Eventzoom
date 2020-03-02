import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubscribeSeriesButton extends Component {
	static propTypes = {
		seriesId: PropTypes.string.isRequired,
	};

	state = {
		isSubscribed: false,
	};


	onSubscriptionChange = () => {
		// Logic for updating users attendance to go here
		this.setState({ isSubscribed: !this.state.isSubscribed });
	};


	render = () => <button className={this.state.isSubscribed ? 'btn btn-danger btn-lg btn-block' : 'btn btn-success btn-lg btn-block' } onClick={this.onSubscriptionChange}>{this.state.isSubscribed ? 'Unfollow' : 'Follow'}</button>;
}

export default SubscribeSeriesButton;
