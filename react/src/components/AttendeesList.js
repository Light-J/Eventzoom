import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Conditional from './Conditional';
import serverConfig from '../config/server';

class AttendeesList extends Component {
	static propTypes = {
		eventId: PropTypes.string.isRequired,
	};

	state = {
		attendees: [],
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}events/${this.props.eventId}/attendees`)
			.then((result) => {
				this.setState({ attendees: result.data });
			});
	}

	render = () => <div className="card mb-2">
		<div className="card-header">Users attending</div>
		<Conditional if={!this.state.attendees.length}>
			<div className="card-body">
				No attendees yet :(
			</div>
		</Conditional>
		<Conditional if={this.state.attendees.length > 0}>
			<ul className="list-group list-group-flush">
				{this.state.attendees.map((user) => <li key={user._id} className="list-group-item">{user.email}</li>)}
			</ul>
		</Conditional>
	</div>
}


export default AttendeesList;
