import React, { Component } from 'react';

class AttendButton extends Component {
	state = { userAttending: false };

	onAttendChange = () => {
		// Logic for updating users attendance to go here
		this.setState({ userAttending: !this.state.userAttending });
	}

	render = () => <button className={this.state.userAttending ? 'btn btn-danger btn-lg btn-block' : 'btn btn-success btn-lg btn-block' } onClick={this.onAttendChange}>{this.state.userAttending ? 'Cancel reservation' : 'Attend'}</button>;
}

export default AttendButton;
