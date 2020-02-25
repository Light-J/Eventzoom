import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchSidebar extends Component {
	static propTypes = {
		updateQuery: PropTypes.func.isRequired,
		search: PropTypes.func.isRequired,
	};

	render = () => <div className="card">
		<div className="card-header">Search</div>
		<div className="card-body">
			Talk title:
			<input type="text" className="form-control" placeholder="My new horse" id="title" onChange={(event) => this.props.updateQuery(event)} />
			Speaker:
			<input type="text" className="form-control" placeholder="Horsey McHorseman" id="speaker" onChange={(event) => this.props.updateQuery(event)} />
			Organiser:
			<input type="text" className="form-control" placeholder="My new horse" id="organiser" onChange={(event) => this.props.updateQuery(event)} />
			Date:
			<input type="date" className="form-control" id="date" onChange={(event) => this.props.updateQuery(event)} />
			<button className="btn btn-success mt-2" onClick={this.props.search}>Search</button>
		</div>
	</div>
}

export default SearchSidebar;
