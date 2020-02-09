import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisabilityAccess from './DisabilityAccess';
import AttendButton from './AttendButton';


class Event extends Component {
	render = () => <div className='container'>
		<div className="container">
			<div className="card border-0 shadow my-5">
				<div className="card-body p-5">
					<h1 className="font-weight-light">{this.props.title}</h1>
					<div className='row'>
						<div className='col'>
							<p>{this.props.curAttending} out of {this.props.capacity} attending</p>
							<p className="lead">{this.props.description}</p>
							<img src={this.props.image} alt='Event image' />
						</div>
						<div className='col'>
							<div className='card'>
								<div className='card-body'>
									<h5 className='card-title'>Event details</h5>
									<DisabilityAccess disabilityAccess={this.props.disabilityAccess} />
									<p>Date: {this.props.datetime.toDateString()}</p>
									<p>Speaker: {this.props.speaker}</p>
									<p>Location: {this.props.vagueLocation}</p>
									<p>Organiser: {this.props.organiser}</p>
								</div>
								<div className="card-footer text-center">
									<AttendButton userAttending={true}/>
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
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
	datetime: PropTypes.instanceOf(Date),
	speaker: PropTypes.string,
	vagueLocation: PropTypes.string,
	disabilityAccess: PropTypes.bool,
	organiser: PropTypes.string,
	curAttending: PropTypes.number,
	capacity: PropTypes.number,
};

export default Event;
