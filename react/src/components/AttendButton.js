import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import Pay from './Pay';
import formatCurrency from '../helpers/formatCurrency';

export class AttendButton extends React.Component {
	static propTypes = {
		full: PropTypes.bool.isRequired,
		user: PropTypes.object,
		userAttending: PropTypes.bool,
		userCancelled: PropTypes.bool,
		onAttendChange: PropTypes.func,
		eventId: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
	};


	render() {
		if (new Date(this.props.date) < new Date()) {
			return <button className="btn btn-info btn-lg btn-block">Event is now over</button>;
		}
		if (this.props.userCancelled) {
			return <button className="btn btn-info btn-lg btn-block">You have successfully cancelled</button>;
		}
		if (this.props.userAttending && this.props.price) {
			return <button className="btn btn-info btn-lg btn-block">Ticket booked successfully.</button>;
		}

		if (this.props.userAttending) {
			return <button className="btn btn-danger btn-lg btn-block" onClick={() => this.props.onAttendChange()}>Cancel reservation</button>;
		}
		if (this.props.full) {
			return <button className="btn btn-info btn-lg btn-block">Sorry, this event is full</button>;
		}
		if (this.props.price && this.props.user) {
			return <div>
				<Modal id="payModal" title="Pay" showButton={false}>
					Please pay {formatCurrency(this.props.price)} to be able to attend this event.
					<Pay eventId={this.props.eventId}/>
				</Modal>
				<button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#payModal">
					Buy ticket for {formatCurrency(this.props.price)}
				</button>
			</div>;
		}
		if (this.props.user) {
			return <button className="btn btn-success btn-lg btn-block" onClick={() => this.props.onAttendChange()}>Attend</button>;
		}
		return <Link to="/login"><button className="btn btn-outline-info"><FontAwesomeIcon icon={faRss} /> Log in to attend event</button></Link>;
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(AttendButton);
