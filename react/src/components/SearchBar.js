import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

class SearchBar extends Component {
	static propTypes = {
		toggle: PropTypes.func.isRequired,
		search: PropTypes.func.isRequired,
		updateQuery: PropTypes.func.isRequired,
	};

	render = () => <div>
		<div className="input-group">
			<span className="input-group-prepend">
				<button onClick={this.props.toggle} className="btn btn-info" type="button"><FontAwesomeIcon icon={faFilter}/> Advanced Search</button>
			</span>
			<label htmlFor="searchInput" style={{ display: 'none' }}>Search</label>
			<input id="searchInput" placeholder="Search" type="text" className="form-control" onChange={(event) => this.props.updateQuery(event)} />
			<span className="input-group-append">
				<button className="btn btn-success" type="button" onClick={this.props.search}>Go!</button>
			</span>
		</div>
	</div>
}

export default SearchBar;
