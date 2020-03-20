import React, { Component } from 'react';
import axios from 'axios';
import serverConfig from '../config/server';
import SingleStatistic from '../components/SingleStatistic';

export class Statistics extends Component {

	state = {
		statistics: [],
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}statistics`)
			.then((res) => {
				this.setState({ statistics: res.data });
			});
	}


	render = () => <div className='container'>
		{
			this.state.statistics.map((value, key) => <SingleStatistic key={key} data={value} />)
		}
	</div>
}


export default Statistics;
