import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './SearchResult.module.css';

class SeriesResult extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	};


	render = () => <div className="col-md-4 mb-1">
		<Link to={`/series/${this.props.id}`}>
			<div className="card flex-row flex-wrap">
				<div className="card-header border-0">
					<img src="//placehold.it/200" alt="" />
				</div>
				<div className="card-block px-2">
					<h4 className="card-title">Title</h4>
					<p className="card-text">Description</p>
					<a href="#" className="btn btn-primary">BUTTON</a>
				</div>
				<div className="w-100"></div>
				<div className="card-footer w-100 text-muted">
					FOOTER
				</div>
			</div>
		</Link>
	</div>
}

export default SeriesResult;
