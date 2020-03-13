import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import SearchSidebar from '../components/SearchSidebar';
import Conditional from '../components/Conditional';
import SearchResults from '../components/SearchResults';
import SortButton from '../components/SortButton';
import serverConfig from '../config/server';

class Search extends Component {
	state = {
		isLoading: true,
		showSidebar: false,
		searchResults: [],
		searchQuery: '',
		advancedSearchQuery: {
			startDate: new Date(),
			endDate: new Date(),
		},
		sort: 'date',
		direction: 'asc',
		hasSetDate: false,
	};

	componentDidMount() {
		if (!this.state.hasSetDate) {
			const endDate = new Date();
			endDate.setMonth(endDate.getMonth() + 1);
			this.setState({
				advancedSearchQuery: { startDate: new Date(), endDate },
				hasSetDate: true,
				searchMethod: this.updateResults,
			});
		}
		this.updateResults();
	}

	onToggle = () => {
		this.setState({ showSidebar: !this.state.showSidebar });
	};

	selectSort = (sort, direction) => {
		this.setState({ sort, direction }, () => this.state.searchMethod());
	};

	updateResults = () => {
		axios.get(`${serverConfig.url}events/`, {
			params: {
				query: this.state.searchQuery,
				sort: this.state.sort,
				direction: this.state.direction,
			},
		})
			.then((res) => {
				this.setState({
					searchResults: res.data,
					isLoading: false,
					searchMethod: this.updateResults,
				});
			});
	};

	updateQuery = (event) => {
		this.setState({ searchQuery: event.target.value });
	};

	updateAdvancedSearchInput = (event) => {
		const { advancedSearchQuery } = this.state;
		advancedSearchQuery[event.target.id] = event.target.value;
		this.setState({ advancedSearchQuery });
	};

	updateAdvancedSearchDates = (ranges) => {
		const advancedSearchQuery = { ...this.state.advancedSearchQuery, ...ranges.selection };
		this.setState({ advancedSearchQuery });
	};

	updateAdvancedResults = () => {
		axios.get(`${serverConfig.url}events/advanced`, {
			params: {
				sort: this.state.sort,
				direction: this.state.direction,
				...this.state.advancedSearchQuery,
			},
		})
			.then((res) => {
				this.setState({
					searchResults: res.data,
					isLoading: false,
					searchMethod: this.updateAdvancedResults,
				});
			});
	};

	render = () => <div className="container mt-3">
		<SearchBar toggle={this.onToggle} search={this.updateResults} updateQuery={this.updateQuery} />
		<SortButton
			selectSort={this.selectSort}
			sortable={this.state.sort}
			direction={this.state.direction}
		/>
		<div className="row mt-3">
			<Conditional if={this.state.showSidebar}>
				<div className="col-md-4 mb-3">
					<SearchSidebar
						updateInput={this.updateAdvancedSearchInput}
						updateDates={this.updateAdvancedSearchDates}
						startDate={this.state.advancedSearchQuery.startDate}
						endDate={this.state.advancedSearchQuery.endDate}
						search={this.updateAdvancedResults} />
				</div>
			</Conditional>
			<div className={this.state.showSidebar ? 'col-md-8' : 'col-md-12'}>
				<SearchResults results={this.state.searchResults} isLoading={this.state.isLoading}/>
			</div>
		</div>
	</div>
}

export default Search;
