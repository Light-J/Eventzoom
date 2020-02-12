import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchSidebar from './SearchSidebar';
import Conditional from './Conditional';
import SearchResults from './SearchResults';

class Search extends Component {
	state = {
		isLoading: true,
		showSidebar: false,
		searchResults: [],
	};

	componentDidMount() {
		axios.get('http://localhost:3001/events/')
			.then((res) => {
				this.setState({ searchResults: res.data, isLoading: false });
			});
	}

	onToggle = () => {
		this.setState({ showSidebar: !this.state.showSidebar });
	}

	render = () => <div className="container mt-3">
		<SearchBar toggle={this.onToggle} />
		<div className="row mt-3">
			<Conditional if={this.state.showSidebar}>
				<div className="col-md-3">
					<SearchSidebar />
				</div>
			</Conditional>
			<div className={this.state.showSidebar ? 'col-md-9' : 'col-md-12'}>
				<SearchResults results={this.state.searchResults} isLoading={this.state.isLoading}/>
			</div>
		</div>
	</div>
}

export default Search;
