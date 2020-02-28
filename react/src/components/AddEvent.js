import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { bool } from 'prop-types';
import Conditional from './Conditional';
import serverConfig from '../config/server';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

export default class AddEvent extends React.Component {
	state = {
		title: '',
		description: '',
		file: '',
		speaker: '',
		vaguelocation: '',
		specificlocation: '',
		disabilityAccess: bool,
		organiser: '',
		capacity: 0,
		date: new Date(),
		requiredError: false,
		imageError: false,
		success: false,
	}

handleDate = (date) => {
	this.setState({ date: date });
}


handleChange = (e) => {
	this.setState({ [e.target.name]: e.target.value });
};

uploadFile = (e) => {
	this.setState({ file: e.target.files[0] });
};

submitForm = async (e) => {
	e.preventDefault();
	const data = new FormData();
	data.append('title', this.state.title);
	data.append('description', this.state.description);
	data.append('file', this.state.file);
	data.append('speaker', this.state.speaker);
	data.append('vaguelocation', this.state.vaguelocation);
	data.append('specificlocation', this.state.specificlocation);
	data.append('disabilityAccess', this.state.disabilityAccess);
	data.append('organiser', this.state.organiser);
	data.append('capacity', this.state.capacity);
	data.append('date', this.state.date);
	this.setState({ requiredError: false, imageError: false });
	try {
		await axios.post(`${serverConfig.url}events/add-event`, data, {
			headers: {
				'Content-type': 'multipart/form-data',
			},
		});
		this.setState({ success: true });
	} catch (e) {
		if (e.response.data.error === 'required') {
			this.setState({ requiredError: true });
		} else {
			this.setState({ imageError: true });
		}
	}
};

render = () => (<form className="container">
	<div className="card border-0 shadow my-5">
		<div className="form-group">
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

			<h1> Create a Event</h1>
			<label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
			<div className="col-sm-10">
				<input id="title" className="form-control" type="text" name="title" placeholder="Title"
					value={this.state.title} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
			<div className="col-sm-10">
				<textarea id="title" className="form-control" name="description" placeholder="Description"
					value={this.state.description} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="image" className="col-sm-2 col-form-label">Upload Image</label>
			<div className="col-sm-10">
				<input id="imageUpload" className="form-control" type="file" onChange={this.uploadFile} accept="image/*"/>
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="speaker" className="col-sm-2 col-form-label">Speaker</label>
			<div className="col-sm-10">
				<input id="speaker" className="form-control" type="text" name="speaker" placeholder="Speaker"
					value={this.state.speaker} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="vaguelocation" className="col-sm-2 col-form-label">Vague Location</label>
			<div className="col-sm-10">
				<input id="vaguelocation" className="form-control" type="text" name="vaguelocation" placeholder="Vague Location"
					value={this.state.vaguelocation} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="specificlocation" className="col-sm-2 col-form-label">Specific Location</label>
			<div className="col-sm-10">
				<input id="specificlocation" className="form-control" type="text" name="specificlocation" placeholder="Specific Location"
					value={this.state.specificlocation} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="disabilityAccess" className="col-sm-2 col-form-label">Disability Access</label>
			<div className="col-sm-10">
                    No: <input type="radio" name="disabilityAccess"
					value='no'
					checked={this.state.disabilityAccess === 'no'}
					onChange={this.handleChange}
				/>
                    Yes: <input type="radio" name="disabilityAccess"
					value='yes'
					checked={this.state.disabilityAccess === 'yes'}
					onChange={this.handleChange}
				/>
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="organiser" className="col-sm-2 col-form-label">Organiser</label>
			<div className="col-sm-10">
				<input id="organiser" className="form-control" type="text" name="organiser" placeholder="Organiser"
					value={this.state.organiser} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="capacity" className="col-sm-2 col-form-label">Capacity</label>
			<div className="col-sm-10">
				<input id="capacity" className="form-control" type="number" name="capacity" placeholder="Capacity"
					value={this.state.capacity} onChange={this.handleChange} required />
			</div>
		</div>

		<div>
			<label htmlFor="Calendar" className="col-sm-2 col-form-label">Select Date and Time</label>
			<DatePicker className= "form-control" selected={this.state.date} onChange={this.handleDate} setDefaultlocale="es" showTimeSelect dateFormat="Pp" />
		</div>

		<div>
			<button className={`btn btn-success btn-block ${this.state.success ? 'disabled' : ''}`} onClick={this.submitForm} type="submit">Add Event</button>
		</div>
	</div>
</form>
);
}
