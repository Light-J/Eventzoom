import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';
import { setUser } from '../store/actions/actions';

export class Login extends React.Component {
	static propTypes = {
		user: PropTypes.object,
		setUser: PropTypes.func.isRequired,
	};

	state = {
		username: '',
		password: '',
		authenticationFailure: false,
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
				this.props.setUser(result.data.user);
				localStorage.setItem('JWT', result.data.token);
			} else {
				this.setState({ authenticationFailure: true });
			}
		} catch (e) {
			this.setState({ authenticationFailure: true });
		}
	};

	initSaml = () => {
		window.location.href = `${serverConfig.url}users/saml/login`;
	}

	googleSignIn = () => {
		window.location.href = `${serverConfig.url}users/auth/google`;
	}

	render() {
		if (!this.props.user) {
			return (
				<form className="container">
					<div className="card border-0 shadow my-5 p-5">
						<Conditional if={this.state.authenticationFailure}>
							<div className="alert alert-danger">
								The username and password are invalid. Please try again.
							</div>
						</Conditional>
						<h1>Login</h1>
						<button type="button" className="btn btn-info mb-2" onClick={this.initSaml}>Authenticate with University Credentials</button>

						<div className="form-group">
							<label htmlFor="staticUsername" className="col-form-label">Username</label>
							<input className="form-control" type="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
						</div>
						<div className="form-group">
							<label htmlFor="InputPassword" className="col-form-label">Password</label>
							<input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
						</div>
						<div>
							<div className="row">
								<div className="col-md-1">
									<button className="btn btn-success" onClick={this.submitForm}>Login</button>
								</div>
								<div className="col-md-3">
									<buton className="btn btn-light" role="button" style={{ textDecoration: 'none' }} onClick={this.googleSignIn}>
										<img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Google sign-in"
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
										Login with Google
									</buton>
								</div>
							</div>

						</div>
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
