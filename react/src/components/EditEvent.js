import React from 'react';
import axios from 'axios';
import serverConfig from '../config/server';

export default class AddEvent extends React.Component {
	state = {
		title: '',
		description: '',
		image: '',
		speaker: '',
		vaguelocation: '',
		specificlocation: '',
		disabilityaccess: 'no',
		organiser: '',
		capacity: 0,
		date: new Date(),
		requiredError: false,
		imageError: false,
		success: false,

	}


handleChange = (e) => {
	this.setState({ [e.target.name]: e.target.value });
};

uploadFile = (e) => {
	this.setState({ file: e.target.files[0] });
};

submitForm = async () => {
	const data = new FormData();
	data.append('title', this.state.title);
	data.append('description', this.state.description);
	data.append('image', this.state.file);
	data.append('speaker', this.state.speaker);
	data.append('vaguelocation', this.state.vaguelocation);
	data.append('specificlocation', this.state.specificlocation);
	data.append('disabilityaccess', this.state.disabilityaccess);
	data.append('organiser', this.state.organiser);
	data.append('capacity', this.state.capacity);
	data.append('date', this.state.date);
	this.setState({ requiredError: false, imageError: false });
	try {
		await axios.post(`${serverConfig.url}addevent`, data, {
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

			<h1> Create a Event</h1>
			<label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
			<div className="col-sm-10">
				<input id="title" className="form-control" type="text" name="title" placeholder="title"
					value={this.state.title} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
			<div className="col-sm-10">
				<textarea id="title" className="form-control" name="description" placeholder="description"
					value={this.state.description} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="image" className="col-sm-2 col-form-label">Upload Image</label>
			<div className="col-sm-10">
				<input id="imageUpload" className="form-control" type="file" onChange={this.uploadFile} accept="image/*" required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="speaker" className="col-sm-2 col-form-label">Speaker</label>
			<div className="col-sm-10">
				<input id="speaker" className="form-control" type="text" name="speaker" placeholder="speaker"
					value={this.state.speaker} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="vaguelocation" className="col-sm-2 col-form-label">Vague Location</label>
			<div className="col-sm-10">
				<input id="vaguelocation" className="form-control" type="text" name="vaguelocation" placeholder="vague location"
					value={this.state.vaguelocation} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="specificlocation" className="col-sm-2 col-form-label">Specific Location</label>
			<div className="col-sm-10">
				<input id="specificlocation" className="form-control" type="text" name="specificlocation" placeholder="specific location"
					value={this.state.specificlocation} onChange={this.handleChange} required />
			</div>
		</div>


		<div className="form-group">
			<label htmlFor="disabilityaccess" className="col-sm-2 col-form-label">Disability Access</label>
			<div className="col-sm-10">
                    No: <input type="radio" name="disabilityaccess"
					value='no'
					checked={this.state.disabilityaccess === 'no'}
					onChange={this.onChange}
				/>
                    Yes: <input type="radio" name="disabilityaccess"
					value='yes'
					checked={this.state.disabilityaccess === 'yes'}
					onChange={this.onChange}
				/>
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="organiser" className="col-sm-2 col-form-label">Organiser</label>
			<div className="col-sm-10">
				<input id="organiser" className="form-control" type="text" name="organiser" placeholder="organiser"
					value={this.state.organiser} onChange={this.handleChange} required />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="capacity" className="col-sm-2 col-form-label">Capacity</label>
			<div className="col-sm-10">
				<input id="capacity" className="form-control" type="number" name="capacity" placeholder="capacity"
					value={this.state.capacity} onChange={this.handleChange} required />
			</div>
		</div>

		<div>
			<button onClick={this.submitForm} type="submit" className="btn btn-outline-primary btn-block"> Edit Event </button>
		</div>
	</div>
</form>
);
}
