import React, { Component } from 'react';

class AttendButton extends Component {
	state = { userAttending: true };

	onAttendChange = () => {
		// Logic for updating users attendance to go here
		this.setState({ userAttending: !this.state.userAttending });
	}

	render = () => <button onClick={this.onAttendChange}>{this.state.userAttending ? 'Attend' : 'Cancel reservation'}</button>;
}

export default AttendButton;
