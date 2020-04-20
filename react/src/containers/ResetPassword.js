import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';

export default class ResetPassword extends React.Component {
	state = {
		token: '',
		newPassword: '',
		newPasswordConfirmation: '',
		success: false,
		error: false,
	};

	static propTypes = {
		token: PropTypes.string.isRequired,
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentDidMount() {
		this.setState({ token: this.props.token });
	}

	submitForm = async () => {
		try {
			await axios.post(`${serverConfig.url}users/reset-password`, this.state);
			this.setState({ success: true });
		} catch (e) {
			this.setState({ error: true });
		}
	};

	render() {
		return (
			<div className="container">
				<div className="card border-0 shadow my-5 p-5">
					<Conditional if={this.state.success}>
						<div className="alert alert-success">
							Password was updated successfully.
						</div>
					</Conditional>

					<Conditional if={this.state.error}>
						<div className="alert alert-danger">There was an error updating the password. Please ensure the the link is from the past 24 hours and has not already been used.</div>
					</Conditional>

					<h1>Set your new password</h1>
					<div className="form-group">
						<label htmlFor="passwordInput" className="col-form-label">New Password</label>
						<input id="passwordInput" className="form-control" type="password" name="newPassword" placeholder="New Password" onChange={this.handleChange} required/>
					</div>
					<div className="form-group">
						<label htmlFor="passwordInput2" className="col-form-label">Repeat New Password</label>
						<input id="passwordInput2" className="form-control" type="password" name="newPasswordConfirmation" placeholder="Password" onChange={this.handleChange} required/>
					</div>
					<div>
						<button className="btn btn-success" onClick={this.submitForm}>Update Password</button>
					</div>
				</div>
			</div>
		);
	}
}
