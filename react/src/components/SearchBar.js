import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

class SearchBar extends Component {
	static propTypes = {
		toggle: PropTypes.func.isRequired,
	};

	render = () => <div>
		<div className="input-group">
			<span className="input-group-btn">
				<button onClick={this.props.toggle} className="btn btn-info" type="button"><FontAwesomeIcon icon={faFilter}/></button>
			</span>
			<input type="text" className="form-control" />
			<span className="input-group-btn">
				<button className="btn btn-success" type="button">Go!</button>
			</span>
		</div>
	</div>
}

export default SearchBar;
