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

	shortenedTitle = () => (this.props.title.length > 45 ? `${this.props.title.substr(0, 40)}...` : this.props.title);

	render = () => <div className="col-md-4 mb-1">
		<Link to={`/events/${this.props.id}`}>
			<div className="card card-default">
				<div className={`card-body ${classes.cardBody}`} style={this.backgroundColor()}>
					<div className={classes.cardText}>
						<h3>{this.shortenedTitle()}</h3>
						<h4>{this.props.author}</h4>
					</div>
				</div>
			</div>
		</Link>
	</div>
}

export default SearchResult;
