import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AttendeesList from '../components/AttendeesList';

class EventAdmin extends Component {
	static propTypes = {
		eventId: PropTypes.string.isRequired,
	};

	render = () => <div className='container'>
		<AttendeesList eventId={this.props.eventId} />
	</div>
}

export default EventAdmin;
