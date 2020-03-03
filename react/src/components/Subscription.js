import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';

class Subscription extends Component {
	static propTypes = {
		events: PropTypes.array.isRequired,
		name: PropTypes.string.isRequired,
	};

	render = () => <div>
		<h1>{this.props.name}</h1>
		<div className={'row'}>
			{this.props.events.map((event) => (
				<SearchResult
					key={event._id}
					image={event.image}
					title={event.title}
					author={event.author}
					id={event._id} />))}
		</div>
	</div>
}

export default Subscription;
