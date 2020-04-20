import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './SeriesResult.module.css';

class SeriesResult extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		height: PropTypes.number,
	};


	backgroundColor = () => ({
		backgroundImage: `background-repeat:no-repeat; background-position: center; background-image:url(${this.props.image}); background-size: cover;`,
	});


	render = () => <div className="col">
		<Link className="text-decoration-none text-reset" to={`/series/${this.props.id}`} >
			<section className="card" style={{ height: `${this.props.height}px` }}>
				<img className={`card-img-top ${classes.restrictImageMobile}`} src={this.props.image} alt={this.props.title} />
				<div className="card-body" style={{ height: `${this.props.height}px` }}>
					<h5 className="card-title">{this.props.title}</h5>
					<p className="card-text">{this.props.description}</p>
				</div>
			</section>
		</Link>
	</div>
}

export default SeriesResult;
