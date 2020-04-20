import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import AttendeesList from '../components/AttendeesList';
import serverConfig from '../config/server';
import Conditional from '../components/Conditional';
import classes from './EventAdmin.module.css';
import AttachmentManagement from '../components/AttachmentManagement';
import EditEvent from '../components/EditEvent';

export class EventAdmin extends Component {
	static propTypes = {
		eventId: PropTypes.string.isRequired,
		user: PropTypes.object.isRequired,
	};

	state = {
		isLoaded: false,
		attendees: [],
	};

	componentDidMount() {
		axios.get(`${serverConfig.url}events/${this.props.eventId}`)
			.then((res) => {
				this.setState({ isLoaded: true, ...res.data });
			}).catch(() => {
				this.setState({ error: true });
			});
		axios.get(`${serverConfig.url}events/${this.props.eventId}/attendees`)
			.then((result) => {
				this.setState({ attendees: result.data });
			});
	}

	background = () => ({
		backgroundImage: `linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 150%), url(${this.state.image})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100%',
		backgroundPosition: 'center',
	});

	deleteAttachment = (_id) => {
		axios.delete(`${serverConfig.url}events/${this.props.eventId}/attachments/${_id}`)
			.then((result) => {
				if (result) {
					const attachments = this.state.attachments;
					const index = attachments.map((x) => x._id).indexOf(_id);
					attachments.splice(index, 1);
					this.setState({ attachments });
				} else {
					this.setState({ deletionFailure: true });
				}
			});
	};

	addAttachment = (filename, file) => {
		this.setState({ uploadingFile: true });
		const data = new FormData();
		data.append('filename', filename);
		data.append('file', file);
		axios.post(`${serverConfig.url}events/${this.props.eventId}/attachments`, data, {
			headers: {
				'Content-type': 'multipart/form-data',
			},
		}).then((result) => {
			const attachments = this.state.attachments;
			attachments.push(result.data);
			this.setState({ attachments, uploadingFile: false, invalidFile: false });
		}).catch((error) => {
			if (error.response.data.error === 'fileType') this.setState({ invalidFile: true, uploadingFile: false });
		});
	};


	render = () => <div className='container'>
		<Conditional if={this.state.isLoaded}>
			<div className={`jumbotron ${classes.clearText}`} style={this.background()}>
				<h1>Admin page | {this.state.title}</h1>
				<p>{this.state.description}</p>
			</div>
			<AttendeesList attendees={this.state.attendees} />
			<Conditional if={this.state.deletionFailure || false} >
				<div className="alert alert-danger">Failed to delete attachment. Try again later</div>
			</Conditional>
			<Conditional if={this.state.invalidFile || false}>
				<div className="alert alert-danger">Invalid file</div>
			</Conditional>
			<AttachmentManagement
				attachments={this.state.attachments}
				delete={this.deleteAttachment}
				add={this.addAttachment}
				handleChange={this.handleChange}
				uploadingFile={this.state.uploadingFile || false}/>
			<EditEvent eventId={this.props.eventId} />
		</Conditional>
	</div>
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(EventAdmin);
