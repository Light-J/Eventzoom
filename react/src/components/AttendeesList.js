import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from './Conditional';

class AttendeesList extends Component {
	static propTypes = {
		eventId: PropTypes.string.isRequired,
	};

	state = {
		attendees: [],
	};


	render = () => <div className="card mb-2">
		<div className="card-header">Users attending</div>
		<Conditional if={!this.state.attendees.length}>
			<div className="card-body">
				No attendees yet :(
			</div>
		</Conditional>
		<Conditional if={this.state.attendees.length > 0}>
			<ul className="list-group list-group-flush">
				<li className="list-group-item">Cras justo odio</li>
				<li className="list-group-item">Dapibus ac facilisis in</li>
				<li className="list-group-item">Morbi leo risus</li>
				<li className="list-group-item">Porta ac consectetur ac</li>
				<li className="list-group-item">Vestibulum at eros</li>
			</ul>
		</Conditional>
	</div>
}


export default AttendeesList;
