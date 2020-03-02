import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchResult extends Component {
	static propTypes = {
		image: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	};

	render = () => <div className="card">
		<img src={this.props.image} className="card-img-top" alt={this.props.title}/>
		<div className="card-body">
			<h4 className="card-title">{this.props.title} by <a href="#">{this.props.author}</a></h4>
			<p className="card-text">{this.props.description}</p>
		</div>
	</div>
}

export default SearchResult;
