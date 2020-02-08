import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Event extends Component {
	render = () => <div className={'container'}>
		<div className={'row'}>
			<div className={'col'}>
				<h1>{this.props.title}</h1>
				<p>{this.props.curAttending} out of {this.props.capacity}</p>
			</div>
			<div className={'col'}>
				<div className={'card'}>
					<div className={'card-body'}>
						<h5 className={'card-title'}>Event details</h5>
						<p>Date: {this.props.datetime.toDateString()}</p>
						<p>Speaker: {this.props.speaker}</p>
						<p>Location: {this.props.vagueLocation}</p>
						<p>Disability access: {this.props.disabilityAccess.toString()}</p>
						<p>Organiser: {this.props.organiser}</p>
					</div>
				</div>
			</div>
		</div>
		<div className={'row'}>
			<div className={'col'}>
				<p>{this.props.description}</p>
			</div>
			<div className={'col'}>
				<img src={this.props.image} alt={'Event image'} />
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
