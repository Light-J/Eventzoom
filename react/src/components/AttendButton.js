import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';

export class AttendButton extends React.Component {
	static propTypes = {
		full: PropTypes.bool.isRequired,
		user: PropTypes.object,
		userAttending: PropTypes.bool,
		userCancelled: PropTypes.bool,
		onAttendChange: PropTypes.func,
	};

	render() {
		if (this.props.userCancelled) {
			return <button className="btn btn-info btn-lg btn-block">You have successfully cancelled</button>;
		} if (this.props.userAttending) {
			return <button className="btn btn-danger btn-lg btn-block" onClick={() => this.props.onAttendChange()}>Cancel reservation</button>;
		} if (this.props.full) {
			return <button className="btn btn-info btn-lg btn-block">Sorry, this event is full</button>;
		} if (this.props.user) {
			return <button className="btn btn-success btn-lg btn-block" onClick={() => this.props.onAttendChange()}>Attend</button>;
		}
		return <Link to={'/login'}><button className="btn btn-outline-info"><FontAwesomeIcon icon={faRss} /> Log in to attend event</button></Link>;
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(AttendButton);
