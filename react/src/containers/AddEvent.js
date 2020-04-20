import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';
import FilterableFields from '../components/FilterableFields';
import 'react-datepicker/dist/react-datepicker.css';
import CurrencyInput from '../components/CurrencyInput';
import './AddEvent.css';


export class AddEvent extends React.Component {
	state = {
		title: '',
		description: '',
		file: '',
		speaker: '',
		vagueLocation: '',
		specificLocation: '',
		disabilityAccess: '',
		capacity: 0,
		date: new Date(),
		requiredError: false,
		imageError: false,
		success: false,
		availableSeries: [],
		series: '',
		noPublic: 0,
		restrictToSchool: 0,
		restrictToStaff: 0,
		whitelist: '',
		price: 0,
		remoteEvent: '',
	};

	static propTypes = {
		user: PropTypes.object,
	};


handleDate = (date) => {
	this.setState({ date });
}


handleChange = (e) => {
	this.setState({ [e.target.name]: e.target.value });
};

handleChangeRemoteEvent = (e) => {
	if (e.target.value) {
		this.setState({ vagueLocation: 'Remote', specificLocation: 'Zoom' });
	}
	this.handleChange(e);
}

uploadFile = (e) => {
	this.setState({ file: e.target.files[0] });
};

updateParentState = (data) => {
	this.setState(data);
}

componentDidMount = async () => {
	const res = await axios.get(`${serverConfig.url}series/mine`);
	this.setState({ availableSeries: res.data });
	if (res.data.length) {
		this.setState({ series: res.data[0]._id });
	}
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
	<Conditional if={this.state.availableSeries && !this.state.availableSeries.length}>
		<h1 className="mt-3">Please add a series first.</h1>
	</Conditional>
	<Conditional if={this.state.availableSeries.length}>
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
				<br />
				<label htmlFor="imageUpload" className="col-form-label">Image</label><br />
				<input id="imageUpload" type="file" onChange={this.uploadFile} accept="image/*"/>
			</div>

			<div className="form-group">
				<label htmlFor="speaker" className="col-form-label">Speaker</label>
				<input id="speaker" className="form-control" type="text" name="speaker" placeholder="Speaker"
					value={this.state.speaker} onChange={this.handleChange} required />
			</div>

			<div className="form-group">
				<label className="col-form-label" htmlFor="priceInput">Ticket cost: (leave at £0.00 for free tickets)</label>
				<CurrencyInput className="form-control"
					amount={this.state.price}
					id="priceInput"
					setAmount={(value) => this.setState({ price: value })}
				/>
			</div>

			<Conditional if={this.props.user.zoom}>
				<div className="form-group">
				Event hosted remotely?
					<div className="form-check">
						<input type="radio"
							name="remoteEvent"
							id="remoteEventNo"
							value=''
							checked={!this.state.remoteEvent}
							onChange={this.handleChangeRemoteEvent}
							className="form-check-input"
						/>
						<label htmlFor="remoteEventNo" className="form-check-label">No</label>
					</div>
					<div className="form-check">
						<input type="radio"
							name="remoteEvent"
							id="remoteEventYes"
							value='1'
							checked={this.state.remoteEvent}
							onChange={this.handleChangeRemoteEvent}
							className="form-check-input"
						/>
						<label htmlFor="remoteEventYes" className="form-check-label">Yes</label>
					</div>
				</div>
			</Conditional>

			<div className="form-group">
				<label htmlFor="vagueLocation" className="col-form-label">Vague Location</label>
				<input id="vagueLocation"
					className="form-control"
					type="text"
					name="vagueLocation"
					placeholder="Vague Location"
					value={this.state.vagueLocation}
					disabled={this.state.remoteEvent}
					onChange={this.handleChange} required />
			</div>

			<div className="form-group">
				<label htmlFor="specificLocation" className="col-form-label">Specific Location</label>
				<input
					id="specificLocation"
					className="form-control"
					type="text"
					name="specificLocation"
					placeholder="Specific Location"
					value={this.state.specificLocation}
					disabled={this.state.remoteEvent}
					onChange={this.handleChange}
					required
				/>
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
				</div>
			</div>
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
			<FilterableFields
				noPublic={this.state.noPublic}
				restrictToSchool={this.state.restrictToSchool}
				restrictToStaff={this.state.restrictToStaff}
				whitelist={this.state.whitelist}
				updateParentState={this.updateParentState}
			/>
			<div>
				<button className={`btn btn-success mt-2 ${this.state.success ? 'disabled' : ''}`} onClick={this.submitForm} type="submit">Add Event</button>
			</div>
		</div>
	</Conditional>
</form>
);
}
const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});
export default connect(mapStateToProps)(AddEvent);
