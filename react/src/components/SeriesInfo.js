import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubscribeSeriesButton from './SubscribeSeriesButton';

class SearchResult extends Component {
	static propTypes = {
		seriesId: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		author: PropTypes.object.isRequired,
		description: PropTypes.string.isRequired,
	};

	render = () => <div className="card">
		<img src={this.props.image} className="card-img-top" alt={this.props.title}/>
		<div className="card-body">
			<h4 className="card-title">{this.props.title} by <a href={`mailto:${this.props.author.email}`}>{this.props.author.name || this.props.author.email}</a></h4>
			<p className="card-text">{this.props.description}</p>
			<SubscribeSeriesButton seriesId={this.props.seriesId} />
		</div>
	</div>
}

export default SearchResult;
