import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { DiscussionEmbed } from 'disqus-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DisabilityAccess from '../components/DisabilityAccess';
import AttendButton from '../components/AttendButton';
import serverConfig from '../config/server';
import disqusConfig from '../config/disqus';
import Conditional from '../components/Conditional';
import SearchResults from '../components/SearchResults';

export class Event extends Component {
	state = {
		isLoaded: false,
		date: '1970-01-01',
		error: false,
		disqusShortname: disqusConfig.shortname,
		userAttending: false,
		userCancelled: false,
		recommendations: [],
		userOwner: false,
	};

	static propTypes = {
		eventId: PropTypes.string.isRequired,
		user: PropTypes.object,
	};

	firstThreeRecommendations = () => this.state.recommendations.filter((v, i) => i < 3);

	updateComponent = () => {
		axios.get(`${serverConfig.url}events/${this.props.eventId}`)
			.then((res) => {
				if (this.props.user) {
					this.setState({ userOwner: this.props.user.email === res.data.organiser.email });
				}
				this.setState({ isLoaded: true, ...res.data });
			}).catch(() => {
				this.setState({ error: true });
			});
		axios.get(`${serverConfig.url}events/${this.props.eventId}/recommendations`)
			.then((res) => {
				this.setState({ recommendations: res.data });
			});

		axios.get(`${serverConfig.url}events/${this.props.eventId}/user-attending`)
			.then((result) => {
				this.setState({ userAttending: result.data });
			});
	};

	componentDidMount = () => {
		this.updateComponent();
	};

	componentDidUpdate = () => {
		if (this.state._id && this.state._id !== this.props.eventId) {
			this.updateComponent();
		}
	};

	onAttendChange = () => {
		axios.post(`${serverConfig.url}events/${this.props.eventId}/attend`,
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
		url: `${disqusConfig.domain}events/${this.props.eventId}`,
		identifier: this.props.eventId,
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
												? <p>Organiser:
													<a href={`mailto:${this.state.organiser.email}`}>
														{this.state.organiser.name || this.state.organiser.email}</a>
												</p>
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
									<Conditional if={this.state.userOwner}>
										<Link to={`/events/admin/${this.props.eventId}`} className="btn btn-primary">Go to admin view</Link>
									</Conditional>
								</div>
							</div>
						</div>
						<Conditional if={this.state.recommendations.length !== 0}>
							<h3 className="m-2">You may also like</h3>
							<SearchResults results={this.firstThreeRecommendations()} isLoading={false}/>
						</Conditional>
						<h3>Discussion board</h3>
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

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(Event);
