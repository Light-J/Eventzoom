import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import Conditional from './Conditional';


class SearchResults extends Component {
	static propTypes = {
		isLoading: PropTypes.bool,
		results: PropTypes.array,
	};

	render = () => <div>
		<Conditional if={this.props.isLoading}>
			<div>
				<h1>Events are loading</h1>
			</div>
		</Conditional>
		{(()=>{ if(this.props.showRadiusHeading && this.props.results.length && this.props.location && this.props.location.name){
			return (<div className="radius-heading">
			Showing events happening within <span>{this.props.location.maxDistance} km</span> of <span>{this.props.location.name}</span>.
			</div>)}})()}
		<div className="row">
			{this.props.results.map((result) => {
				const {
					image, title, speaker, _id,
				} = result;
				return (
					<SearchResult key={_id} image={image} title={title} author={speaker} id={_id}/>
				);
			})}
		</div>
		<Conditional if={Object.keys(this.props.results).length === 0}>
			<h2>No Results found :(</h2>
		</Conditional>
	</div>;
}

export default SearchResults;
