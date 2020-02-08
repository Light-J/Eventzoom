import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Event extends Component {
	render = () => <div>
		<p>{this.props.title}</p>
		<p>{this.props.description}</p>
		<img src={this.props.image} alt={'Event image'} />
	</div>
}

Event.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
};

export default Event;
