import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from './Conditional';

class Attachment extends Component {
	static propTypes = {
		filename: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		_id: PropTypes.string.isRequired,
		delete: PropTypes.func,
	};

	render = () => <li className="list-group-item">
		<a href={this.props.location} download>{this.props.filename}.{this.props.location.split('.').pop()}</a>
		<Conditional if={this.props.delete}>
			<button className="btn btn-danger float-right" onClick={() => this.props.delete(this.props._id)}>Delete</button>
		</Conditional>
	</li>
}

export default Attachment;
