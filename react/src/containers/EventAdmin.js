import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import AttendeesList from '../components/AttendeesList';
import serverConfig from '../config/server';
import Conditional from '../components/Conditional';
import classes from './EventAdmin.module.css';

export class EventAdmin extends Component {
	static propTypes = {
		eventId: PropTypes.string.isRequired,
		user: PropTypes.object.isRequired,
	};

	state = {
		isLoaded: false,
		attendees: [],
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}events/${this.props.eventId}`)
			.then((res) => {
				this.setState({ isLoaded: true, ...res.data });
			}).catch(() => {
				this.setState({ error: true });
			});
		axios.get(`${serverConfig.url}events/${this.props.eventId}/attendees`)
			.then((result) => {
				this.setState({ attendees: result.data });
			});
	}

	backgroundColor = () => ({
		backgroundImage: `linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 150%), url(${this.state.image})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100%',
		backgroundPosition: 'center',
	});

	render = () => <div className='container'>
		<Conditional if={this.state.isLoaded}>
			<div className={`jumbotron ${classes.clearText}`} style={this.backgroundColor()}>
				<h1>Admin page | {this.state.title}</h1>
				<p>{this.state.description}</p>
			</div>
			<AttendeesList attendees={this.state.attendees} />
		</Conditional>
	</div>
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(EventAdmin);
