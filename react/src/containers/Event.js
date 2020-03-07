import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { DiscussionEmbed } from 'disqus-react';
import { Link } from 'react-router-dom';
import DisabilityAccess from '../components/DisabilityAccess';
import AttendButton from '../components/AttendButton';
import serverConfig from '../config/server';
import disqusConfig from '../config/disqus';
import Conditional from '../components/Conditional';

class Event extends Component {
	state = {
		isLoaded: false,
		date: '1970-01-01',
		error: false,
		disqusShortname: disqusConfig.shortname,
		userAttending: false,
		userCancelled: false,
	};

	static propTypes = {
		eventid: PropTypes.string.isRequired,
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}events/${this.props.eventid}`)
			.then((res) => {
				this.setState({ isLoaded: true, ...res.data });
			}).catch(() => {
				this.setState({ error: true });
			});
		axios.get(`${serverConfig.url}events/${this.props.eventid}/user-attending`)
			.then((result) => {
				this.setState({ userAttending: result.data });
			});
	}

	onAttendChange = () => {
		axios.post(`${serverConfig.url}events/${this.props.eventid}/attend`,
			{ attend: !this.state.userAttending })
			.then(() => {
				this.setState({
					userAttending: !this.state.userAttending,
					userCancelled: this.state.userAttending,
				});
				this.updateAttendeesAmount(this.state.userAttending ? 1 : -1);
			});
	};


	getDisqusConfig = () => ({
		url: `${disqusConfig.domain}events/${this.props.eventid}`,
		identifier: this.props.eventid,
		title: this.state.title,
	});

	updateAttendeesAmount = (amount) => {
		this.setState({ attendeesAmount: this.state.attendeesAmount + amount });
	};

	render = () => <div className='container'>
		<div className="container">
			<div className="card border-0 shadow my-5">
				<Conditional if={this.state.error}>
					<div className="card-body p-5">

						<div className="d-flex align-items-center">
							<img src={'https://pluspng.com/img-png/kitten-png--243.png'} alt='Sad kitten'/>
							<h1>Sorry this event could not be found</h1>
						</div>
					</div>
				</Conditional>
				<Conditional if={this.state.isLoaded}>
					<div className="card-body p-5">
						<h1 className="font-weight-light">{this.state.title}</h1>
						<div className='row'>
							<div className='col-md-7'>
								<p>{this.state.attendeesAmount} out of {this.state.capacity} attending</p>
								<p className="lead">{this.state.description}</p>
								<img src={this.state.image} alt='Event' className="img-responsive mw-100"/>
							</div>
							<div className='col-md-5'>
								<div className='card'>
									<div className='card-body'>
										<h5 className='card-title'>Event details</h5>
										<DisabilityAccess disabilityAccess={this.state.disabilityAccess} />
										<p>Date: {new Date(this.state.date).toLocaleString()}</p>
										<p>Speaker: {this.state.speaker}</p>
										<p>Location: {this.state.vagueLocation}</p>
										{
											this.state.organiser
												? <p>Organiser: {this.state.organiser.email}</p>
												: <p>No organiser</p>
										}
										{
											this.state.series
												? <p>Series: <Link to={`/series/${this.state.series._id}`}>{this.state.series.title}</Link></p>
												: <p>Not a part of a series</p>
										}
									</div>
									<div className="card-footer text-center">
										<AttendButton
											full={this.state.capacity === this.state.attendeesAmount}
											userAttending={this.state.userAttending}
											userCancelled={this.state.userCancelled}
											onAttendChange={this.onAttendChange}/>
									</div>
								</div>
							</div>
						</div>
						<p className="lead">Discussion board</p>
						<DiscussionEmbed
							config={this.getDisqusConfig()}
							shortname={this.state.disqusShortname}
						/>
					</div>
				</Conditional>
			</div>
		</div>
	</div>
}

export default Event;
