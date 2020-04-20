import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import SearchSidebar from '../components/SearchSidebar';
import Conditional from '../components/Conditional';
import SearchResults from '../components/SearchResults';
import SortButton from '../components/SortButton';
import serverConfig from '../config/server';
import SeriesCarousel from '../components/SeriesCarousel';

export class Search extends Component {
	state = {
		isLoadingEvents: true,
		isLoadingSeries: true,
		showSidebar: false,
		eventSearchResults: [],
		seriesSearchResults: [],
		searchQuery: '',
		advancedSearchQuery: {
			startDate: new Date(),
			endDate: new Date(),
		},
		sort: 'date',
		direction: 'asc',
		hasSetDate: false,
	};

	static propTypes = {
		user: PropTypes.object,
	}

	componentDidMount() {
		if (!this.state.hasSetDate) {
			const endDate = new Date();
			endDate.setMonth(endDate.getMonth() + 1);
			this.setState({
				advancedSearchQuery: { startDate: new Date(), endDate },
				hasSetDate: true,
				searchMethod: this.updateEventsResults,
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

	updateEventsResults = () => {
		axios.get(`${serverConfig.url}events/`, {
			params: {
				query: this.state.searchQuery,
				sort: this.state.sort,
				direction: this.state.direction,
			},
		})
			.then((res) => {
				this.setState({
					eventSearchResults: res.data,
					isLoadingEvents: false,
					searchMethod: this.updateEventsResults,
				});
			});
	};

	updateSeriesResults = () => {
		axios.get(`${serverConfig.url}series/`, {
			params: {
				query: this.state.searchQuery,
			},
		})
			.then((res) => {
				this.setState({
					seriesSearchResults: res.data,
					isLoadingSeries: false,
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
					eventSearchResults: res.data,
					isLoadingEvents: false,
					searchMethod: this.updateAdvancedResults,
				});
			});
	};

	updateResults = () => {
		this.updateEventsResults();
		this.updateSeriesResults();
	};

	render = () => <div className="container mt-3">
		<Conditional if={!this.props.user}>
			<div className="alert alert-info">Please log in to be able to access your subscriptions and private events.</div>
		</Conditional>
		<Conditional if={!this.state.showSidebar}>
			<SearchBar
				toggle={this.onToggle}
				search={this.updateResults}
				updateQuery={this.updateQuery}
			/>
		</Conditional>
		<div className="row mt-3">
			<Conditional if={this.state.showSidebar}>
				<div className="col-md-4 mb-3">
					<SearchSidebar
						toggle={this.onToggle}
						updateInput={this.updateAdvancedSearchInput}
						updateDates={this.updateAdvancedSearchDates}
						startDate={this.state.advancedSearchQuery.startDate}
						endDate={this.state.advancedSearchQuery.endDate}
						search={this.updateAdvancedResults} />
				</div>
			</Conditional>
			<div className={this.state.showSidebar ? 'col-md-8' : 'col-md-12'}>
				<Conditional if={!this.state.showSidebar}>
					<h1>Series</h1>
					<SeriesCarousel
						results={this.state.seriesSearchResults}
						isLoading={this.state.isLoadingSeries}/>
				</Conditional>
				<h1>Events</h1>
				<SortButton
					selectSort={this.selectSort}
					sortable={this.state.sort}
					direction={this.state.direction}
				/>
				<SearchResults
					results={this.state.eventSearchResults}
					isLoading={this.state.isLoadingEvents}/>
			</div>
		</div>
	</div>;
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});


export default connect(mapStateToProps)(Search);
