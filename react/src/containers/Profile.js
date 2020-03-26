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
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
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
								<label className="col-form-label">Email</label>
								<input className="form-control" type="email" name="email" placeholder="Email" defaultValue={this.props.user.email} onChange={this.handleChange} required/>
							</div>
							<div className="form-group">
								<label className="col-form-label">Name</label>
								<input className="form-control" type="text" name="name" placeholder="Name" defaultValue={this.props.user.name} onChange={this.handleChange} required/>
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">In UK international format</span>
								</div>
								<input type="text" className="form-control" placeholder="Phone number" name="phoneNumber" defaultValue={this.props.user.phoneNumber} value={this.state.phoneNumber} onChange={this.handleChange} />
								<div className="input-group-append">
									<button className="btn btn-outline-secondary" type="button" onClick={this.deletePhoneNumber}>Remove</button>
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
								<label htmlFor="InputPassword" className="col-form-label">Current Password</label>
								<input className="form-control" type="password" name="currentPassword" placeholder="Current Password" onChange={this.handleChange} required/>
							</div>
							<div className="form-group">
								<label htmlFor="InputPassword" className="col-form-label">New Password</label>
								<input className="form-control" type="password" name="newPassword" placeholder="New Password" onChange={this.handleChange} required/>
							</div>
							<div className="form-group">
								<label htmlFor="InputPassword" className="col-form-label">Repeat New Password</label>
								<input className="form-control" type="password" name="newPasswordConfirmation" placeholder="Password" onChange={this.handleChange} required/>
							</div>
							<div>
								<button className="btn btn-success" onClick={this.submitChangePasswordForm}>Update Password</button>
							</div>
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
									<a href={`${serverConfig.url}zoom?jwt=${localStorage.getItem('JWT')}`}className="btn btn-success">Integrate</a>
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
