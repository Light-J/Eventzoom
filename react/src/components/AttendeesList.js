import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from './Conditional';

class AttendeesList extends Component {
	static propTypes = {
		attendees: PropTypes.array.isRequired,
	};


	render = () => <div className="card mb-2">
		<div className="card-header">Users attending</div>
		<Conditional if={!this.props.attendees.length}>
			<div className="card-body">
				No attendees yet :(
			</div>
		</Conditional>
		<Conditional if={this.props.attendees.length > 0}>
			<ul className="list-group list-group-flush">
				{this.props.attendees.map((user) => <li key={user._id} className="list-group-item"><a href={`mailto:${user.email}`}>{user.name || user.email}</a></li>)}
			</ul>
		</Conditional>
	</div>
}


export default AttendeesList;
