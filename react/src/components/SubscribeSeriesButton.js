import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import serverConfig from '../config/server';


class SubscribeSeriesButton extends Component {
	static propTypes = {
		seriesId: PropTypes.string.isRequired,
	};

	state = {
		isSubscribed: false,
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}series/${this.props.seriesId}/user-subscribed`)
			.then((result) => {
				this.setState({ isSubscribed: result.data });
			});
	}

	onSubscriptionChange = () => {
		axios.post(`${serverConfig.url}series/change-subscription`,
			{ seriesId: this.props.seriesId })
			.then(() => {
				this.setState({ isSubscribed: !this.state.isSubscribed });
			});
	};


	render = () => <button className={this.state.isSubscribed ? 'btn btn-outline-danger' : 'btn btn-outline-success' } onClick={this.onSubscriptionChange}><FontAwesomeIcon icon={faRss} />{this.state.isSubscribed ? 'Unfollow' : 'Follow'}</button>;
}

export default SubscribeSeriesButton;
