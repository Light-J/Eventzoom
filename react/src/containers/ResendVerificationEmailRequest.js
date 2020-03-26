import React from 'react';
import axios from 'axios';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';

export default class ResendVerificationEmailRequest extends React.Component {
	state = {
		email: '',
		success: false,
		error: false,
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitForm = async () => {
		try {
			await axios.post(`${serverConfig.url}users/resend-verification`, this.state);
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
						<div className="alert alert-success">Verification email sent if an unverified account exists for the email address provided.</div>
					</Conditional>

					<Conditional if={this.state.error}>
						<div className="alert alert-danger">
							There was an error sending the verification email.
						</div>
					</Conditional>

					<h1>Resend verification email</h1>
					<label htmlFor="email" className="col-form-label"> Email</label>
					<input id="email" className="form-control" type="email" name="email" placeholder="Email"
						value={this.state.email} onChange={this.handleChange} required />

					<button className={`btn btn-success ${this.state.success ? 'disabled' : ''} mt-5`} onClick={this.submitForm} type="submit"> Send Email</button>
				</div>
			</div>
		);
	}
}
