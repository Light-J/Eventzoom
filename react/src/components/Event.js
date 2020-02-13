import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DisabilityAccess from './DisabilityAccess';
import AttendButton from './AttendButton';
import serverConfig from '../config/server';


class Event extends Component {
	state = {
		isLoaded: false,
		date: '1970-01-01',
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}events/${this.props.eventid}`)
			.then((res) => {
				this.setState({ isLoaded: true, ...res.data });
			});
	}

	render = () => <div className='container'>
		<div className="container">
			<div className="card border-0 shadow my-5">
				<div className="card-body p-5">
					<h1 className="font-weight-light">{this.state.title}</h1>
					<div className='row'>
						<div className='col'>
							<p>0 out of {this.state.capacity} attending</p>
							<p className="lead">{this.state.description}</p>
							<img src={this.state.image} alt='Event' />
						</div>
						<div className='col'>
							<div className='card'>
								<div className='card-body'>
									<h5 className='card-title'>Event details</h5>
									<DisabilityAccess disabilityAccess={this.state.disabilityAccess} />
									<p>Date: {new Date(this.state.date).toLocaleDateString()}</p>
									<p>Speaker: {this.state.speaker}</p>
									<p>Location: {this.state.vaguelocation}</p>
									<p>Organiser: {this.state.organiser}</p>
								</div>
								<div className="card-footer text-center">
									<AttendButton />
								</div>
							</div>
						</div>
					</div>
					<p className="lead">Discussion board</p>
					<br /><br /><br /><br /><br />
				</div>
			</div>
		</div>
	</div>
}

Event.propTypes = {
	eventid: PropTypes.string.isRequired,
};

export default Event;
