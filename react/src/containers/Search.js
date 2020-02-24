import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import SearchSidebar from '../components/SearchSidebar';
import Conditional from '../components/Conditional';
import SearchResults from '../components/SearchResults';
import serverConfig from '../config/server';

class Search extends Component {
	state = {
		isLoading: true,
		showSidebar: false,
		searchResults: [],
		searchQuery: '',
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}events/`)
			.then((res) => {
				this.setState({ searchResults: res.data, isLoading: false });
			});
	}

	onToggle = () => {
		this.setState({ showSidebar: !this.state.showSidebar });
	};

	updateResults = () => {
		axios.get(`${serverConfig.url}events/?query=${this.state.searchQuery}`)
			.then((res) => {
				this.setState({ searchResults: res.data, isLoading: false });
			});
	};

	updateQuery = (event) => {
		this.setState({ searchQuery: event.target.value });
	};

	render = () => <div className="container mt-3">
		<SearchBar toggle={this.onToggle} search={this.updateResults} updateQuery={this.updateQuery} />
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
