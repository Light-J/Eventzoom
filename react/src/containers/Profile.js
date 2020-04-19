import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';
import { setUser } from '../store/actions/actions';
import EventList from '../components/EventList';

export class Profile extends React.Component {
	static propTypes = {
		user: PropTypes.object,
		setUser: PropTypes.func.isRequired,
	};

	state = {
		email: '',
		password: '',
		name: '',
		currentPassword: '',
		newPassword: '',
		newPasswordConfirmation: '',
		profileSaved: false,
		profileSaveFailure: false,
		passwordChanged: false,
		passwordChangeFailure: false,
		events: [],
		mfaInfo: {},
		date: new Date(),
		phoneNumber: null,
	};

	componentDidMount = () => {
		this.setState({ email: this.props.user.email });
		this.setState({ name: this.props.user.name });
		axios.get(`${serverConfig.url}users/me/attending`)
			.then((res) => {
				this.setState({ events: res.data });
			});
		this.getMfaInfo();
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	getMfaInfo = () => {
		axios.get(`${serverConfig.url}users/me/mfa-info`)
			.then((res) => {
				if (res.data.mfaInfo) {
					this.setState({ mfaInfo: res.data.mfaInfo });
				}
				if (res.data.mfaEnabled) {
					this.setState({ mfaEnabled: true });
				}
			});
	};

	submitProfileForm = async (event) => {
		event.preventDefault();
		this.setState({ profileSaveFailure: false });
		this.setState({ profileSaved: false });
		try {
			const result = await axios.put(`${serverConfig.url}users/me`, this.state);
			if (result.data.success) {
				this.props.setUser(result.data.user);
				this.setState({ profileSaved: true });
			} else {
				this.setState({ profileSaveFailure: true });
			}
		} catch (e) {
			this.setState({ profileSaveFailure: true });
		}
	};

	submitChangePasswordForm = async (event) => {
		event.preventDefault();
		this.setState({ passwordChangeFailure: false });
		this.setState({ passwordChanged: false });
		try {
			const result = await axios.put(`${serverConfig.url}users/me/password`, this.state);
			if (result.data.success) {
				this.setState({ passwordChanged: true });
			} else {
				this.setState({ passwordChangeFailure: true });
			}
		} catch (e) {
			this.setState({ passwordChangeFailure: true });
		}
	};

	submitEnableMfaForm = async (event) => {
		event.preventDefault();
		try {
			const result = await axios.put(`${serverConfig.url}users/me/enable-mfa`, this.state);
			if (result.data.success) {
				this.setState({ mfaEnabled: true });
				this.setState({ mfaEnableFailure: false });
			} else {
				this.setState({ mfaEnableFailure: true });
			}
		} catch (e) {
			this.setState({ mfaEnableFailure: true });
		}
	};

	submitDisableMfaForm = async (event) => {
		event.preventDefault();
		try {
			const result = await axios.put(`${serverConfig.url}users/me/disable-mfa`, this.state);
			if (result.data.success) {
				this.setState({ mfaEnabled: false });
				this.setState({ mfaDisableFailure: false });
				this.getMfaInfo();
			} else {
				this.setState({ mfaDisableFailure: true });
			}
		} catch (e) {
			this.setState({ mfaDisableFailure: true });
		}
	};

	deletePhoneNumber = (event) => {
		event.preventDefault();
		axios.delete(`${serverConfig.url}users/me/phone-number`).then((result) => {
			if (result.data.success) {
				this.setState({ phoneNumber: '' });
			}
		});
	};

	deleteZoomIntegration = () => {
		axios.delete(`${serverConfig.url}zoom`).then((result) => {
			if (result.data.success) {
				this.props.setUser({ ...this.props.user, zoom: undefined });
			}
		});
	};

	pastEvents = () => this.state.events.filter((e) => new Date(e.date) < this.state.date);

	futureEvents = () => this.state.events.filter((e) => new Date(e.date) >= this.state.date);

	render() {
		return (
			<div className="container">
				<Conditional if={this.props.user.sso}>
					<div className="alert alert-info m-3">Your profile is managed by your SSO provider.</div>
				</Conditional>
				<Conditional if={!this.props.user.sso}>

					<div className="card border-0 shadow my-5 p-5">
						<h1>Profile</h1>
						<form>
							<Conditional if={this.state.profileSaved}>
								<div className="alert alert-success">
								Profile saved successfully
								</div>
							</Conditional>
							<Conditional if={this.state.profileSaveFailure}>
								<div className="alert alert-danger">
								Error updating profile
								</div>
							</Conditional>
							<div className="form-group">
								<label className="col-form-label" htmlFor="emailInput">Email</label>
								<input className="form-control" type="email" name="email" id="emailInput" placeholder="Email" defaultValue={this.props.user.email} onChange={this.handleChange} required/>
							</div>
							<div className="form-group">
								<label className="col-form-label" htmlFor="nameInput">Name</label>
								<input className="form-control" type="text" name="name" id="nameInput" placeholder="Name" defaultValue={this.props.user.name} onChange={this.handleChange} required/>
							</div>
							<div className="form-group">
								<label className="col-form-label" htmlFor="phoneNumberInput">Phone Number</label>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text">In UK international format</span>
									</div>
									<input type="text" className="form-control" placeholder="Phone number" name="phoneNumber" id="phoneNumberInput" defaultValue={this.props.user.phoneNumber} value={this.state.phoneNumber} onChange={this.handleChange} />
									<div className="input-group-append">
										<button className="btn btn-outline-secondary" type="button" onClick={this.deletePhoneNumber}>Remove</button>
									</div>
								</div>
							</div>
							<div>
								<button className="btn btn-success" onClick={this.submitProfileForm}>Save Profile</button>
							</div>
						</form>
						<hr />
						<h1>Change Password</h1>
						<form>
							<Conditional if={this.state.passwordChanged}>
								<div className="alert alert-success">
								Password changed successfully
								</div>
							</Conditional>
							<Conditional if={this.state.passwordChangeFailure}>
								<div className="alert alert-danger">
								Error changing password
								</div>
							</Conditional>
							<div className="form-group">
								<label htmlFor="currentPasswordInput" className="col-form-label">Current Password</label>
								<input className="form-control" type="password" name="currentPassword" id="currentPasswordInput" placeholder="Current Password" onChange={this.handleChange} required/>
							</div>
							<div className="form-group">
								<label htmlFor="newPasswordInput" className="col-form-label">New Password</label>
								<input className="form-control" type="password" name="newPassword" id="newPasswordInput" placeholder="New Password" onChange={this.handleChange} required/>
							</div>
							<div className="form-group">
								<label htmlFor="newPasswordConfirmationInput" className="col-form-label">Repeat New Password</label>
								<input className="form-control" type="password" name="newPasswordConfirmation" id="newPasswordConfirmationInput" placeholder="Password" onChange={this.handleChange} required/>
							</div>
							<div>
								<button className="btn btn-success" onClick={this.submitChangePasswordForm}>Update Password</button>
							</div>
						</form>
						<hr />
						<h1>Two Factor Authentication</h1>
						<form>
							<Conditional if={this.state.mfaEnabled}>
								<div className="alert alert-success">
									Two factor authentication is enabled.
								</div>
								<Conditional if={this.state.mfaDisableFailure}>
									<div className="alert alert-danger">
										Error disabling two factor authentication.
										Please check your password and try again.
									</div>
								</Conditional>
								<div className="form-group">
									<p>
										To disable, re-enter your password.
									</p>
									<label className="col-form-label" htmlFor="disableMfaPasswordInput">Password</label>
									<input className="form-control" type="password" name="disableMfaPassword" id="disableMfaPasswordInput" placeholder="Password" onChange={this.handleChange} required/>
								</div>
								<div>
									<button className="btn btn-danger" onClick={this.submitDisableMfaForm}>Disable Two Factor Authentication</button>
								</div>
							</Conditional>
							<Conditional if={this.state.mfaEnableFailure}>
								<div className="alert alert-danger">
									Error enabling two factor authentication.
									Please check the code and your password and try again.
								</div>
							</Conditional>
							<Conditional if={!this.state.mfaEnabled}>
								<div className="form-group">
									<p>
										To enable two factor authentication, scan the QR code with the app
										and then enter the code provided by your app in the field below.
										If you do not already use a two factor authentication app, we suggest
										Google Authenticator or Authy.
										<br />
										Key for manual entry: <strong>{this.state.mfaInfo.key}</strong>
										<br />
										<img src={this.state.mfaInfo.qrCodeImageUrl} alt="authenticator QR code" className="m-5" />
									</p>
									<label className="col-form-label" htmlFor="codeInput">2FA Code (no spaces)</label>
									<input className="form-control" type="text" name="code" id="codeInput" placeholder="Code" onChange={this.handleChange} required/>
								</div>
								<div className="form-group">
									<p>
										To enable, re-enter your password.
									</p>
									<label className="col-form-label" htmlFor="enableMfaPasswordInput">Password</label>
									<input className="form-control" type="password" name="enableMfaPassword" id="enableMfaPasswordInput" placeholder="Password" onChange={this.handleChange} required/>
								</div>
								<div>
									<button className="btn btn-success" onClick={this.submitEnableMfaForm}>Enable Two Factor Authentication</button>
								</div>
							</Conditional>
						</form>
					</div>
				</Conditional>
				<Conditional if={this.props.user.sso && this.props.user.filterable.staff}>
					<div className="card mb-2">
						<div className="card-header">Integrate with Zoom</div>
						<div className="card-body">
						By integrating with Zoom, you will be able to organise remote events.
							<Conditional if={!this.props.user.zoom}>
								<div className="mt-2">
									<a href={`${serverConfig.url}zoom?jwt=${localStorage.getItem('JWT')}`} className="btn btn-success">Integrate</a>
								</div>
							</Conditional>
							<Conditional if={this.props.user.zoom}>
								<div className="alert alert-success mb-2 mt-1">You have already connected with Zoom</div>
								<button className="btn btn-danger" onClick={this.deleteZoomIntegration}>Delete Zoom integration</button>
							</Conditional>
						</div>
					</div>
				</Conditional>
				<EventList title="Attended events" events={this.pastEvents()} />
				<EventList title="Future events" events={this.futureEvents()} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
	setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
