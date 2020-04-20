import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';
import { setUser } from '../store/actions/actions';
import SignInGoogleButton from '../components/SignInGoogleButton';

export class Login extends React.Component {
	static propTypes = {
		user: PropTypes.object,
		setUser: PropTypes.func.isRequired,
	};

	state = {
		username: '',
		password: '',
		code: '',
		authenticationFailure: false,
		authenticationFailureMfa: false,
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitForm = async (event) => {
		event.preventDefault();
		this.setState({ authenticationFailure: false });
		this.setState({ authenticationFailureMfa: false });
		try {
			let route = 'login';
			if (this.state.mfaRequired) {
				route = 'login-mfa';
			}
			const result = await axios.post(`${serverConfig.url}users/${route}`, this.state);
			if (result.data.success) {
				if (result.data.mfaRequired) {
					this.setState({ mfaRequired: true });
				}
				this.props.setUser(result.data.user);
				localStorage.setItem('JWT', result.data.token);
			} else {
				if (this.state.mfaRequired) {
					this.setState({ authenticationFailureMfa: true });
				}
				this.setState({ authenticationFailure: true });
			}
		} catch (e) {
			if (this.state.mfaRequired) {
				this.setState({ authenticationFailureMfa: true });
			}
			this.setState({ authenticationFailure: true });
		}
	};

	initSaml = () => {
		window.location.href = `${serverConfig.url}users/saml/login`;
	};

	render() {
		if (!this.props.user) {
			return (
				<form className="container">
					<div className="card border-0 shadow my-5 p-5">
						<Conditional if={this.state.authenticationFailure
						&& !this.state.authenticationFailureMfa}>
							<div className="alert alert-danger">The username and password are invalid, or you have not verified your email. Please try again.</div>
						</Conditional>
						<Conditional if={this.state.authenticationFailureMfa}>
							<div className="alert alert-danger">The two factor authentication code was not right. Please try again.</div>
						</Conditional>
						<h1>Login</h1>
						<button type="button" className="btn btn-info mb-2" onClick={this.initSaml}>Authenticate with University Credentials</button>
						<SignInGoogleButton />
						<div className="form-group">
							<label htmlFor="usernameInput" className="col-form-label">Username</label>
							<input id="usernameInput" className="form-control" type="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
						</div>
						<div className="form-group">
							<label htmlFor="passwordInput" className="col-form-label">Password</label>
							<input id="passwordInput" className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
						</div>
						<Conditional if={this.state.mfaRequired}>
							<div className="form-group">
								<label htmlFor="mfaInput" className="col-form-label">2FA Code (no spaces)</label>
								<input id="mfaInput" className="form-control is-invalid" type="text" name="code" placeholder="2FA Code" value={this.state.code} onChange={this.handleChange} required/>
							</div>
						</Conditional>
						<div>
							<button className="btn btn-success" onClick={this.submitForm}>Login</button>
						</div><br /><br />

						<Link to="/forgotten-password" class="btn btn-default btn-sm">I have forgotten my password</Link><br />
						<Link to="/resend-verification" class="btn btn-default btn-sm">Resend verification email</Link>
					</div>
				</form>
			);
		}
		return <Redirect to={'/'} />;
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
	setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
