import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from './Conditional';

class SingleStatistic extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
	};


	render = () => <div className="card mb-2">
		<div className="card-header">{this.props.data.name}</div>
		<Conditional if={!this.props.data.results.length}>
			<div className="card-body">
				No data found :(
			</div>
		</Conditional>
		<Conditional if={this.props.data.results.length}>
			<div className="m-2">
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.data.results.map((e, key) => <tr key={key}>
								<td>{e.title}</td>
								<td>{e.count}</td>
							</tr>)
						}
					</tbody>
				</table>

			</div>
		</Conditional>
	</div>
}


export default SingleStatistic;
