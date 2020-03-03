import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import Conditional from './Conditional';

class Subscription extends Component {
	static propTypes = {
		events: PropTypes.array.isRequired,
		name: PropTypes.string.isRequired,
	};

	render = () => <div>
		<h1>{this.props.name}</h1>
		<div className={'row'}>
			<Conditional if={this.props.events.length === 0}>
				<h3>Sorry there are no upcoming events for this series</h3>
			</Conditional>
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
