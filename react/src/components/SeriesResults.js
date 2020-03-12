import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from './Conditional';
import SeriesResult from './SeriesResult';
import { left, right } from './SeriesResult.module.css';


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
		<div className="row align-items-center">
			<div className="col"><i className={left} /></div>
			<div className="col-10 row">
				{this.props.results.map((result) => {
					const {
						image, title, description, _id,
					} = result;
					return (
						<SeriesResult key={_id} image={image} title={title} description={description} id={_id}/>
					);
				})}
			</div>
			<div className="col"><i className={`float-right ${right}`} /></div>
		</div>
		<Conditional if={Object.keys(this.props.results).length === 0}>
			<h2>No Results found :(</h2>
		</Conditional>
	</div>;
}

export default SeriesResults;
