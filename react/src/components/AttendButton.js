import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import serverConfig from '../config/server';

class AttendButton extends Component {
	static propTypes = {
		eventId: PropTypes.string.isRequired,
	};

	state = { userAttending: false };

	onAttendChange = () => {
		// Logic for updating users attendance to go here
		axios.post(`${serverConfig.url}events/${this.props.eventId}/attend`,
			{ attend: !this.state.userAttending })
			.then(() => {
				this.setState({ userAttending: !this.state.userAttending });
			});
	};

	render = () => <button className={this.state.userAttending ? 'btn btn-danger btn-lg btn-block' : 'btn btn-success btn-lg btn-block' } onClick={this.onAttendChange}>{this.state.userAttending ? 'Cancel reservation' : 'Attend'}</button>;
}

export default AttendButton;
