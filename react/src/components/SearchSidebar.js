import React, { Component } from 'react';

class SearchSidebar extends Component {
	render = () => <div className="card">
		<div className="card-header">Search</div>
		<div className="card-body">
			Talk name:
			<input type="text" className="form-control" placeholder="My new horse" />
			Speaker:
			<input type="text" className="form-control" placeholder="Horsey McHorseman" />
			Keywords:
			<input type="text" className="form-control" placeholder="physics, maths" />
			Description:
			<input type="text" className="form-control" placeholder="My new horse" />
			Date:
			<input type="date" className="form-control" />
			<button className="btn btn-success mt-2">Search</button>

		</div>
	</div>
}

export default SearchSidebar;
