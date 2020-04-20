import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

class SortButton extends Component {
	static propTypes = {
		selectSort: PropTypes.func.isRequired,
		sortable: PropTypes.string.isRequired,
		direction: PropTypes.string.isRequired,
	};

	buttonString = () => this.strings[`${this.props.sortable}${this.props.direction}`];

	strings = {
		attendeesasc: <span><FontAwesomeIcon icon={faArrowUp} className="mr-1"/>Popularity (asc.)</span>,
		attendeesdesc: <span><FontAwesomeIcon icon={faArrowDown} className="mr-1"/>Popularity (desc.)</span>,
		dateasc: <span><FontAwesomeIcon icon={faArrowUp} className="mr-1"/>Upcoming (asc.)</span>,
	}

	render = () => <div className="mt-2 mb-1 clearfix">
		<div className="dropdown float-right">
			<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				{this.buttonString()}
			</button>
			<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<button className="dropdown-item" href="#" onClick={() => this.props.selectSort('attendees', 'asc')}>{this.strings.attendeesasc}</button>
				<button className="dropdown-item" href="#" onClick={() => this.props.selectSort('attendees', 'desc')}>{this.strings.attendeesdesc}</button>
				<button className="dropdown-item" href="#" onClick={() => this.props.selectSort('date', 'asc')}>{this.strings.dateasc}</button>
			</div>
		</div>
	</div>
}

export default SortButton;
