import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Event extends Component {
	render = () => <div>
		<p>{this.props.title}</p>
		<p>{this.props.description}</p>
		<img src={this.props.image} alt={'Event image'} />
		<p>{this.props.datetime.toDateString()}</p>
		<p>{this.props.speaker}</p>
		<p>{this.props.vagueLocation}</p>
		<p>{this.props.disabilityAccess}</p>
		<p>{this.props.organiser}</p>
		<p>{this.props.curAttending} out of {this.props.capacity}</p>
	</div>
}

Event.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
	datetime: PropTypes.instanceOf(Date),
	speaker: PropTypes.string,
	vagueLocation: PropTypes.string,
	disabilityAccess: PropTypes.bool,
	organiser: PropTypes.string,
	curAttending: PropTypes.number,
	capacity: PropTypes.number,
};

export default Event;
