import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchResults from '../components/SearchResults';
import SeriesInfo from '../components/SeriesInfo';
import serverConfig from '../config/server';
import Conditional from '../components/Conditional';

class Series extends Component {
	state = {
		user: { email: '' },
		description: '',
		image: '',
		title: '',
		isLoading: true,
		error: false,
		events: [],
	};

	static propTypes = {
		seriesId: PropTypes.string.isRequired,
	};

	componentDidMount = async () => {
		try {
			const rs = await axios.get(`${serverConfig.url}series/${this.props.seriesId}`);
			this.setState({ isLoading: false, ...rs.data });
		} catch {
			this.setState({ error: true });
		}
	};

	render = () => <div className="container mt-3">
		<Conditional if={this.state.errors}>
			<h1>An error has occured. We are sorry.</h1>
		</Conditional>
		<SeriesInfo
			seriesId={this.props.seriesId}
			title={this.state.title}
			author={this.state.user}
			description={this.state.description}
			image={this.state.image}

		/>
		<div className="row mt-3">
			<div className="col-md-12">
				<h5 className="text-center">Events in this series</h5>
				<SearchResults isLoading={this.state.isLoading} results={this.state.events} />
			</div>
		</div>
	</div>
}

export default Series;
