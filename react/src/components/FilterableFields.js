import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from './Conditional';

class FilterableFields extends Component {
	static propTypes = {
		noPublic: PropTypes.number.isRequired,
		restrictToSchool: PropTypes.number.isRequired,
		restrictToStaff: PropTypes.number.isRequired,
		updateParentState: PropTypes.func.isRequired,
		whitelist: PropTypes.string.isRequired,
	};


	// these have to be numbers because of FormData shortfalls with booleans
	handleChange = (e) => {
		this.props.updateParentState({ [e.target.name]: Number(e.target.checked) });
	};

	updatePublic = (e) => {
		if (e.target.checked) {
			this.props.updateParentState({ noPublic: 1 });
		} else {
			this.props.updateParentState(
				{
					noPublic: 0,
					restrictToStaff: 0,
					restrictToSchool: 0,
				},
			);
		}
	}

	updateWhitelist = (e) => {
		this.props.updateParentState({ whitelist: e.target.value });
	}


	render = () => <div className="mt-2">
		<h5>Access controls:</h5>
		Whitelisted people (leave empty for everyone, comma seperated):
		<input type="text" className="form-control" onChange={this.updateWhitelist} value={this.props.whitelist} placeholder="user@example.org, hello@example.org"/>
		<Conditional if={!this.props.whitelist || this.props.whitelist.length < 0}>
			<div className="form-check">
				<input className="form-check-input" id="noPublic" name="noPublic" checked={this.props.noPublic} type="checkbox" onChange={this.updatePublic}/>
				<label className="form-check-label" htmlFor="noPublic">Block public from attending</label>

			</div>
			<Conditional if={this.props.noPublic}>
				<div className="form-check">
					<input className="form-check-input" id="restrictToSchool" name="restrictToSchool" type="checkbox" checked={this.props.restrictToSchool} onChange={this.handleChange}/>
					<label className="form-check-label" htmlFor="restrictToSchool">Restrict to my school</label>
				</div>
				<div className="form-check">
					<input className="form-check-input" name="restrictToStaff" id="restrictToStaff"type="checkbox" checked={this.props.restrictToStaff} onChange={this.handleChange}/>
					<label className="form-check-label" htmlFor="restrictToStaff">Restrict to staff only</label>
				</div>

			</Conditional>
		</Conditional>
	</div>
}

export default FilterableFields;
