import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './SearchResult.module.css';

class SearchResult extends Component {
	static propTypes = {
		image: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
	};

	backgroundColor = () => ({
		backgroundImage: `linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(${this.props.image})`,
	});

	onToggle = () => {
		this.setState({ showSidebar: !this.state.showSidebar });
	};

	render = () => <Link to={`/events/${this.props.id}`}><div className="card card-default m-5">
		<div className={`card-body ${classes.cardBody}`} style={this.backgroundColor()}>
			<div className={classes.cardText}>
				<h3>{this.props.title}</h3>
				<h4>{this.props.author}</h4>
			</div>
		</div>
	</div></Link>
}

export default SearchResult;
