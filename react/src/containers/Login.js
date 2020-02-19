import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';

export default class Login extends React.Component {
	state = {
		username: '',
		password: '',
		authenticationFailure: false,
		loggedIn: false,
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitForm = async (event) => {
		event.preventDefault();
		this.setState({ authenticationFailure: false });
		try {
			const result = await axios.post(`${serverConfig.url}users/login`, this.state);
			if (result.data.success) {
				this.setState({ loggedIn: true });
				localStorage.setItem('JWT', result.data.token);
			} else {
				this.setState({ authenticationFailure: true });
			}
		} catch (e) {
			this.setState({ authenticationFailure: true });
		}
	};

	render() {
		if (!this.state.loggedIn) {
			return (
				<form className="container">
					<div className="card border-0 shadow my-5">
						<Conditional if={this.state.authenticationFailure}>
							<div className="alert alert-danger">
											The username and password are invalid. Please try again.
							</div>
						</Conditional>
						<div className="form-group">
							<label HtmlFor="staticUsername" className="col-sm-2 col-form-label">Username</label>
							<div className="col-sm-10">
								<input className="form-control" type="username" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} required/>
							</div>
						</div>
						<div className="form-group">
							<label HtmlFor="InputPassword" className="col-sm-2 col-form-label">Password</label>
							<div className="col-sm-10">
								<input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
							</div>
						</div>
						<div>
							<button className="btn btn-outline-primary btn-block" onClick={this.submitForm}>Login</button>
						</div>
					</div>
				</form>
			);
		}
		return <Redirect to={'/'} />;
	}
}
