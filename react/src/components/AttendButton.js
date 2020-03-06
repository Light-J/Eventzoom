import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import serverConfig from '../config/server';

export class AttendButton extends React.Component {
	static propTypes = {
		eventId: PropTypes.string.isRequired,
		full: PropTypes.bool.isRequired,
		user: PropTypes.object,
		updateAttendeesAmount: PropTypes.func,
	};

	state = {
		userAttending: false,
		userCancelled: false,
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}events/${this.props.eventId}/user-attending`)
			.then((result) => {
				this.setState({ userAttending: result.data });
			});
	}

	onAttendChange = () => {
		axios.post(`${serverConfig.url}events/${this.props.eventId}/attend`,
			{ attend: !this.state.userAttending })
			.then(() => {
				this.setState({
					userAttending: !this.state.userAttending,
					userCancelled: this.state.userAttending,
				});
				if (this.props.updateAttendeesAmount) {
					this.props.updateAttendeesAmount(this.state.userAttending ? 1 : -1);
				}
			});
	};

	render() {
		if (this.state.userCancelled) {
			return <button className={ 'btn btn-info btn-lg btn-block' } >You have successfully cancelled</button>;
		} if (this.state.userAttending) {
			return <button className={'btn btn-danger btn-lg btn-block'} onClick={this.onAttendChange}>Cancel reservation</button>;
		} if (this.props.full) {
			return <button className={'btn btn-info btn-lg btn-block'}>Sorry this event is full</button>;
		} if (this.props.user) {
			return <button className={ 'btn btn-success btn-lg btn-block' } onClick={this.onAttendChange}>Attend</button>;
		}
		return <Link to={'/login'}><button className={'btn btn-outline-info'}><FontAwesomeIcon icon={faRss} /> Log in to attend series</button></Link>;
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(AttendButton);
