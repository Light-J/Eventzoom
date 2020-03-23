import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serverConfig from '../config/server';
import loadUser from '../utils/loadUser';

class SubscribeSeriesButton extends Component {
	static propTypes = {
		seriesId: PropTypes.string.isRequired,
		user: PropTypes.object,
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
				loadUser.refreshUser();
				window.location.reload(); // makes sure weird one time bug doesn't happen
			});
	};


	render() {
		if (this.props.user) {
			return <button className={this.state.isSubscribed ? 'btn btn-outline-danger' : 'btn btn-outline-success' } onClick={this.onSubscriptionChange}><FontAwesomeIcon icon={faRss} /> {this.state.isSubscribed ? 'Unfollow' : 'Follow'}</button>;
		}
		return <Link to={'/login'}><button className={'btn btn-outline-info'}><FontAwesomeIcon icon={faRss} /> Log in to follow series</button></Link>;
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});
export default connect(mapStateToProps)(SubscribeSeriesButton);
