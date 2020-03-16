import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Attachment extends Component {
	static propTypes = {
		filename: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		_id: PropTypes.string.isRequired,
		delete: PropTypes.func.isRequired,
	};

	render = () => <li className="list-group-item">
		<a href={this.props.location}>{this.props.filename}</a>
		<button onClick={() => this.props.delete(this.props._id)}>Delete</button>
	</li>
}

export default Attachment;
