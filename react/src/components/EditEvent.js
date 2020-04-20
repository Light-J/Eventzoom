import React from 'react';
import axios from 'axios';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import PropTypes from 'prop-types';
import Conditional from './Conditional';
import serverConfig from '../config/server';
import 'react-datepicker/dist/react-datepicker.css';
import './EditEvent.css';


registerLocale('en-BB', enGB);
setDefaultLocale('en-GB');

// this is super similar to add event
// but there are differences, in that some fields are added in
// and some are removed
// I thought it'd be too complex
// to make it reuse a component
// and these forms may just diverge further later on.
export default class EditEvent extends React.Component {
	state = {
		title: '',
		description: '',
		speaker: '',
		vagueLocation: '',
		specificLocation: '',
		disabilityAccess: false,
		capacity: 0,
		date: new Date(),
		requiredError: false,
		success: false,
		availableSeries: [],
		series: '',
		sendUpdateEmail: false,
		remoteEvent: false,
	}

	static propTypes = {
		eventId: PropTypes.string.isRequired,
	}

handleDate = (date) => {
	this.setState({ date });
}


handleChange = (e) => {
	this.setState({ [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
};


componentDidMount = async () => {
	const series = await axios.get(`${serverConfig.url}series/mine`);
	this.setState({ availableSeries: series.data });
	const { data } = await axios.get(`${serverConfig.url}events/${this.props.eventId}`);
	this.setState({
		title: data.title,
		description: data.description,
		speaker: data.speaker,
		vagueLocation: data.vagueLocation,
		specificLocation: data.specificLocation,
		disabilityAccess: data.disabilityAccess,
		series: data.series._id,
		capacity: data.capacity,
		date: new Date(data.date),
		remoteEvent: data.remoteEvent,
	});
};

submitForm = async (e) => {
	e.preventDefault();
	this.setState({ requiredError: false });
	try {
		await axios.put(`${serverConfig.url}events/${this.props.eventId}`,
			{
				...this.state,
				// hack to deal with weird boolean behaviour
				disabilityAccess: !!this.state.disabilityAccess,
			});
		this.setState({ success: true });
	} catch (error) {
		this.setState({ requiredError: true });
	}
};

render = () => (<form>
	<Conditional if={this.state.availableSeries.length}>

		<div className="card">
			<div className="card-header">Edit event</div>
			<div className="card-body">
				<Conditional if={this.state.success}>
					<div className="alert alert-success">
					Event updated successfully.
					</div>
				</Conditional>
				<Conditional if={this.state.requiredError}>
					<div className="alert alert-danger">
					All fields are required!
					</div>
				</Conditional>

				<div className="form-group">
					<label htmlFor="title" className="col-form-label">Title</label>
					<input id="title" className="form-control" type="text" name="title" placeholder="Title"
						value={this.state.title} onChange={this.handleChange} required />
				</div>

				<div className="form-group">
					<label htmlFor="description" className="col-form-label">Description</label>
					<textarea id="description" className="form-control" name="description" placeholder="Description"
						value={this.state.description} onChange={this.handleChange} required />
				</div>

				<label htmlFor="series" className="col-form-label">Series </label>
				<select id="series" className="form-control" name="series"
					onChange={this.handleChange} required value={this.state.series}>
					{
						// eslint-disable-next-line arrow-body-style
						this.state.availableSeries.map((series) => {
							return <option value={series._id} key={series._id}>{series.title}</option>;
						})
					}
				</select>
				<div className="form-group">
					<label htmlFor="speaker" className="col-form-label">Speaker</label>
					<input id="speaker" className="form-control" type="text" name="speaker" placeholder="Speaker"
						value={this.state.speaker} onChange={this.handleChange} required />
				</div>

				<div className="form-group">
					<label htmlFor="vagueLocation" className="col-form-label">Vague Location</label>
					<input id="vagueLocation" disabled={this.state.remoteEvent} className="form-control" type="text" name="vagueLocation" placeholder="Vague Location"
						value={this.state.vagueLocation} onChange={this.handleChange} required />
				</div>

				<div className="form-group">
					<label htmlFor="specificLocation" className="col-form-label">Specific Location</label>
					<input id="specificLocation" disabled={this.state.remoteEvent} className="form-control" type="text" name="specificLocation" placeholder="Specific Location"
						value={this.state.specificLocation} onChange={this.handleChange} required />
				</div>

				<div className="form-group">
				Disability Access
					<div className="form-check">
						<input type="radio" name="disabilityAccess"
							id="disabilityAccessNo"
							value=''
							checked={!this.state.disabilityAccess}
							onChange={this.handleChange}
							className="form-check-input"
						/>
						<label htmlFor="disabilityAccessNo" className="form-check-label">No</label>
					</div>
					<div className="form-check">
						<input type="radio" name="disabilityAccess"
							id="disabilityAccessYes"
							value='1'
							checked={this.state.disabilityAccess}
							onChange={this.handleChange}
							className="form-check-input"
						/>
						<label htmlFor="disabilityAccessYes" className="form-check-label">Yes</label>
					</div>		</div>
				<div className="form-group">
					<label htmlFor="capacity" className="col-form-label">Capacity</label>
					<input id="capacity" className="form-control" type="number" name="capacity" placeholder="Capacity"
						value={this.state.capacity} onChange={this.handleChange} required />
				</div>

				<div>
					<label htmlFor="calendarInput" className="col-form-label">Select Date and Time</label><br/>
					<DatePicker
						id="calendarInput"
						className="form-control"
						selected={this.state.date}
						onChange={this.handleDate}
						dateFormat="dd/MM/yyyy HH:mm"
						minDate={Date.now()}
						showTimeSelect={true}
					/>
				</div>
				<div className="form-check mt-2">
					<input type="checkbox" className="form-check-input" id="sendUpdateEmail" name="sendUpdateEmail" checked={this.state.sendUpdateEmail} onChange={this.handleChange}/>
					<label htmlFor="sendUpdateEmail" className="form-check-label">Send email to notify attendees of changes</label>
				</div>
				<div>
					<button className="btn btn-success mt-2" onClick={this.submitForm} type="submit">Update Event</button>
				</div>
			</div>
		</div>
	</Conditional>
</form>

);
}
