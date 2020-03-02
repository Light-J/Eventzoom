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
							<button className="btn btn-success btn-block" onClick={this.submitForm}>Login</button>
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
