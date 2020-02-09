import React, { Component } from 'react';

class AttendButton extends Component {
	state = { userAttending: true };

	onAttendChange = () => {
		// Logic for updating users attendance to go here
		this.setState({ userAttending: !this.state.userAttending });
	}

	render = () => <button className={this.state.userAttending ? 'btn btn-success btn-lg btn-block' : 'btn btn-danger btn-lg btn-block' } onClick={this.onAttendChange}>{this.state.userAttending ? 'Attend' : 'Cancel reservation'}</button>;
}

export default AttendButton;
