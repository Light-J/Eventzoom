import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Conditional from './Conditional';

class EventList extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		events: PropTypes.array.isRequired,
	};

	loopEvents = () => this.props.events.map((event) => <li key={event._id} className="list-group-item">
		<Link to={`/events/${event._id}`}>
			{event.title} - {new Date(event.date).toLocaleDateString()}
		</Link>
	</li>);

	render = () => <div className="card mb-2">
		<div className="card-header">{this.props.title}</div>
		<Conditional if={!this.props.events.length}>
			<div className="card-body">
				No events to show!
			</div>
		</Conditional>
		<Conditional if={this.props.events.length > 0}>
			<ul className="list-group list-group-flush">
				{this.loopEvents()}
			</ul>
		</Conditional>
	</div>
}

export default EventList;
