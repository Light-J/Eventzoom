import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from './Conditional';
import SeriesResult from './SeriesResult';


class SeriesResults extends Component {
	static propTypes = {
		isLoading: PropTypes.bool,
		results: PropTypes.array,
	};

	render = () => <div>
		<Conditional if={this.props.isLoading}>
			<div>
				<h1>Series are loading</h1>
			</div>
		</Conditional>
		<div className="row">
			{this.props.results.map((result) => {
				const {
					image, title, description, _id,
				} = result;
				return (
					<SeriesResult key={_id} image={image} title={title} description={description} id={_id}/>
				);
			})}
		</div>
		<Conditional if={Object.keys(this.props.results).length === 0}>
			<h2>No Results found :(</h2>
		</Conditional>
	</div>;
}

export default SeriesResults;