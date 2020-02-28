import React from 'react';
import axios from 'axios';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';
import 'react-datepicker/dist/react-datepicker.css';
import './AddEvent.css';


registerLocale('en-BB', enGB);
setDefaultLocale('en-GB');

export default class AddEvent extends React.Component {
	state = {
		title: '',
		description: '',
		file: '',
		speaker: '',
		vagueLocation: '',
		specificLocation: '',
		disabilityAccess: false,
		organiser: '',
		capacity: 0,
		date: new Date(),
		requiredError: false,
		imageError: false,
		success: false,
	}

handleDate = (date) => {
	this.setState({ date });
}


handleChange = (e) => {
	this.setState({ [e.target.name]: e.target.value });
};

uploadFile = (e) => {
	this.setState({ file: e.target.files[0] });
};

submitForm = async (event) => {
	event.preventDefault();
	const data = new FormData();
	Object.entries(this.state).forEach(([key, val]) => {
		data.append(key, val);
	});
	this.setState({ requiredError: false, imageError: false });
	try {
		await axios.post(`${serverConfig.url}events`, data, {
			headers: {
				'Content-type': 'multipart/form-data',
			},
		});
		this.setState({ success: true });
	} catch (error) {
		if (error.response.data.error === 'required') {
			this.setState({ requiredError: true });
		} else {
			this.setState({ imageError: true });
		}
	}
};

render = () => (<form className="container">
	<div className="card border-0 shadow my-5 p-5">
		<Conditional if={this.state.success}>
			<div className="alert alert-success">
					Event added successfully.
			</div>
		</Conditional>
		<Conditional if={this.state.imageError}>
			<div className="alert alert-danger">
					Selected file must be an image!
			</div>
		</Conditional>
		<Conditional if={this.state.requiredError}>
			<div className="alert alert-danger">
					All fields are required!
			</div>
		</Conditional>
		<h1> Create an Event</h1>
		<div className="form-group">
			<label htmlFor="title" className="col-form-label">Title</label>
			<input id="title" className="form-control" type="text" name="title" placeholder="Title"
				value={this.state.title} onChange={this.handleChange} required />
		</div>

		<div className="form-group">
			<label htmlFor="description" className="col-form-label">Description</label>
			<textarea id="title" className="form-control" name="description" placeholder="Description"
				value={this.state.description} onChange={this.handleChange} required />
		</div>

		<div className="form-group">
			<label htmlFor="image" className="col-form-label">Upload Image</label>
			<input id="imageUpload" className="form-control" type="file" onChange={this.uploadFile} accept="image/*"/>
		</div>

		<div className="form-group">
			<label htmlFor="speaker" className="col-form-label">Speaker</label>
			<input id="speaker" className="form-control" type="text" name="speaker" placeholder="Speaker"
				value={this.state.speaker} onChange={this.handleChange} required />
		</div>

		<div className="form-group">
			<label htmlFor="vagueLocation" className="col-form-label">Vague Location</label>
			<input id="vagueLocation" className="form-control" type="text" name="vagueLocation" placeholder="Vague Location"
				value={this.state.vagueLocation} onChange={this.handleChange} required />
		</div>

		<div className="form-group">
			<label htmlFor="specificLocation" className="col-form-label">Specific Location</label>
			<input id="specificLocation" className="form-control" type="text" name="specificLocation" placeholder="Specific Location"
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
			<label htmlFor="organiser" className="col-form-label">Organiser</label>
			<input id="organiser" className="form-control" type="text" name="organiser" placeholder="Organiser"
				value={this.state.organiser} onChange={this.handleChange} required />
		</div>

		<div className="form-group">
			<label htmlFor="capacity" className="col-form-label">Capacity</label>
			<input id="capacity" className="form-control" type="number" name="capacity" placeholder="Capacity"
				value={this.state.capacity} onChange={this.handleChange} required />
		</div>

		<div>
			<label htmlFor="Calendar" className="col-form-label">Select Date and Time</label><br/>
			<DatePicker
				className="form-control"
				selected={this.state.date}
				onChange={this.handleDate}
				dateFormat="dd/MM/yyyy HH:mm"
				minDate={Date.now()}
				showTimeSelect={true}
			/>
		</div>

		<div>
			<button className={`btn btn-success btn-block mt-2 ${this.state.success ? 'disabled' : ''}`} onClick={this.submitForm} type="submit">Add Event</button>
		</div>
	</div>
</form>
);
}
