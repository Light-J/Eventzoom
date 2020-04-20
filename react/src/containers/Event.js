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
import Attachment from '../components/Attachment';
import RemindMeSwitch from '../components/RemindMeSwitch';

export class Event extends Component {
	state = {
		isLoaded: false,
		date: '1970-01-01',
		error: false,
		disqusShortname: disqusConfig.shortname,
		attending: false,
		reminding: false,
		userCancelled: false,
		recommendations: [],
		userOwner: false,
		attachments: [],
	};

	static propTypes = {
		eventId: PropTypes.string.isRequired,
		user: PropTypes.object,
	};

	firstThreeRecommendations = () => this.state.recommendations.filter((v, i) => i < 3);

	updateComponent = async () => {
		await axios.get(`${serverConfig.url}events/${this.props.eventId}`)
			.then((res) => {
				if (this.props.user) {
					this.setState({ userOwner: this.props.user.email === res.data.organiser.email });
				}
				this.setState({
					isLoaded: true, ...res.data, userCancelled: false, attending: false, reminding: false,
				});
			}).catch(() => {
				this.setState({ error: true });
			});
		axios.get(`${serverConfig.url}events/${this.props.eventId}/recommendations`)
			.then((res) => {
				this.setState({ recommendations: res.data });
			});

		axios.get(`${serverConfig.url}events/${this.props.eventId}/user-attending`)
			.then((result) => {
				this.setState(result.data);
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
			{ attend: !this.state.attending })
			.then(() => {
				this.setState({
					attending: !this.state.attending,
					userCancelled: this.state.attending,
				});
				this.updateAttendeesAmount(this.state.attending ? 1 : -1);
			});
	};

	remindMe = () => {
		axios.put(`${serverConfig.url}events/${this.props.eventId}/remind`,
			{ remind: !this.state.reminding })
			.then(() => {
				this.setState({
					reminding: !this.state.reminding,
				});
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

	attachments = () => this.state.attachments.map((attachment) => <Attachment
		key={attachment._id}
		filename={attachment.filename}
		location={attachment.location}
		_id={attachment._id} />);

	render = () => <div className='container'>
		<div className="container">
			<div className="card border-0 shadow my-5">
				<Conditional if={this.state.error}>
					<div className="card-body p-5">

						<div className="d-flex align-items-center">
							<img src="https://pluspng.com/img-png/kitten-png--243.png" alt='Sad kitten'/>
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
											this.state.zoomUrl
												? <span>
													<p>Zoom: <a href={this.state.zoomUrl}>{this.state.zoomUrl}</a></p>
													<p className="font-italic small">Click link above to join meeting</p>
												</span>
												: null
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
											userAttending={this.state.attending}
											price={this.state.price}
											userCancelled={this.state.userCancelled}
											onAttendChange={this.onAttendChange}
											userReminding={this.state.reminding}
											eventId={this.props.eventId}
											date={this.state.date}
										/>
										<div className="mt-2">
											<Conditional if={this.state.attending && this.props.user.phoneNumber}>
												<RemindMeSwitch
													reminding={this.state.reminding}
													onRemindChange={this.remindMe} />
											</Conditional>
										</div>
									</div>
								</div>
								<Conditional if={this.state.attachments.length > 0}>
									<div className="card mb-2 mt-2">
										<div className="card-header">Attachments for this event</div>
										<ul className="list-group list-group-flush">
											{this.attachments()}
										</ul>
									</div>
								</Conditional>
								<Conditional if={this.state.userOwner}>
									<Link to={`/events/admin/${this.props.eventId}`} className="btn btn-primary mt-2 d-block">Go to admin view</Link>
								</Conditional>
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
