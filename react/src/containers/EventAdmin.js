import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import AttendeesList from '../components/AttendeesList';
import serverConfig from '../config/server';
import Conditional from '../components/Conditional';
import classes from './EventAdmin.module.css';

class EventAdmin extends Component {
	static propTypes = {
		eventId: PropTypes.string.isRequired,
		user: PropTypes.object.isRequired,
	};

	state = {
		isLoaded: false,
	};

	componentDidMount() {
		// This is no a security measure. It is a UX feature
		// Authorisation is handled on the server
		if (!this.props.user) {
			window.location.href = '/';
		}
		axios.get(`${serverConfig.url}events/${this.props.eventId}`)
			.then((res) => {
				if (this.props.user.email !== res.data.organiser.email) {
					window.location.href = '/';
				}
				this.setState({ isLoaded: true, ...res.data });
			}).catch(() => {
				this.setState({ error: true });
			});
	}

	backgroundColor = () => ({
		backgroundImage: `linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 150%), url(${this.state.image})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100%',
	});

	render = () => <div className='container'>
		<Conditional if={this.state.isLoaded}>
			<div className={`jumbotron ${classes.clearText}`} style={this.backgroundColor()}>
				<h1>Admin page | {this.state.title}</h1>
				<p>{this.state.description}</p>
			</div>
			<AttendeesList eventId={this.props.eventId} />
		</Conditional>
	</div>
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(EventAdmin);
