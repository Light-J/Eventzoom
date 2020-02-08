import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchSidebar from './SearchSidebar';

class NavBar extends Component {
	state = {
		showSidebar: false,
	};

	onToggle = () => {
		this.setState({ showSidebar: !this.state.showSidebar });
	}

	render = () => <div className="container mt-3">
		<SearchBar toggle={this.onToggle} />
		<div className="row mt-3">
			{this.state.showSidebar
				? <div className="col-md-3"><SearchSidebar /></div>
				: null}
			<div className={this.state.showSidebar ? 'col-md-9' : 'col-md-12'}>
				Yeet!
			</div>
		</div>
	</div>
}

export default NavBar;
