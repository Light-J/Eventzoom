/* eslint react/prop-types: 0 */
import React from 'react';
import axios from 'axios';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';
import FilterableFields from '../components/FilterableFields';
import 'react-datepicker/dist/react-datepicker.css';
import './AddEvent.css';
registerLocale('en-BB', enGB);
setDefaultLocale('en-GB');

export default class AddEvent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			_id: "",
			title: '',
			description: '',
			file: '',
			speaker: '',
			vagueLocation: '',
			specificLocation: '',
			disabilityAccess: false,
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
			organizer: "",
			image: null
		}
}

handleDate = (date) => {
	this.setState({ date });
}



handleChange = (e) => {
	this.setState({ [e.target.name]: e.target.value });
};

uploadFile = (e) => {
	this.setState({ file: e.target.files[0], image:null });
};

updateParentState = (data) => {
	this.setState(data);
}

componentDidMount = async () => {
	let event = this.props && this.props.location && this.props.location.state && this.props.location.state.event;
	let editMode = this.props && this.props.location && this.props.location.state && this.props.location.state.editMode;
	if(editMode && event && event._id){
		this.editMode = true;
		this.updateStateForEdit(event);
		this.setState({date: new Date(event.date)})
	}
	const res = await axios.get(`${serverConfig.url}series/mine`);
	this.setState({ availableSeries: res.data });
	if (res.data.length) {
		this.setState({ series: res.data[0]._id });
	}
};

updateStateForEdit = event => {
	let eventToEdit = {...event};
	eventToEdit.organizer = event.organiser._id;
	eventToEdit.restrictToStaff = event.organiser && event.organiser.filterable && event.organiser.filterable.staff ? 1 : 0;
	eventToEdit.restrictToSchool = event.organiser && event.organiser.filterable && event.organiser.filterable.school ? 1 : 0;
	eventToEdit.organiser && eventToEdit.organiser.subscribedSeries && delete eventToEdit.organiser.subscribedSeries;
	eventToEdit.organiser && eventToEdit.organiser.filterable && delete eventToEdit.organiser.filterable;
	eventToEdit.series = event.series._id;
	delete eventToEdit._v && delete eventToEdit.attendeesAmount && delete eventToEdit.date; 

	this.setState({
		...eventToEdit
	})
}

submitForm = async (e) => {
	let event = {...this.state};
	e.preventDefault();
	if(this.editMode){
		if(this.state.image){
			event.file = new File(["bingo"], "nn.jpg",{
				fieldname: 'file',
				originalname: 'noImag',
				encoding: '7bit',
				mimetype: 'image/png',
				buffer: "",
				size: 3292 ,
				type : "image/jpeg"
			});
		}
		else { 
			delete event.image;
		}
		delete event.organiser
		delete event._v
		delete event.availableSeries
	}
	const data = new FormData();
	Object.entries(event).forEach(([key, val]) => {
		data.append(key, val);
	});
	if(this.editMode){

		try {
			await axios.post(`${serverConfig.url}events/edit/${this.state._id}`, data, {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			});
			this.setState({ success: true });
		} catch (error) {
			if (error.response && error.response.data && error.response.data.error === 'required') {
				this.setState({ requiredError: true });
			}
		}
	}
	else {
		this.setState({ requiredError: false, imageError: false });
		try {
			await axios.post(`${serverConfig.url}events`, data, {
				headers: {
					'Content-type': 'multipart/form-data'
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
	}
};

render = () => { 
	return  (<form className="container">
	<Conditional if={this.state.availableSeries && !this.state.availableSeries.length}>
		<h1 className="mt-3">Please add a series first.</h1>
	</Conditional>
	<Conditional if={this.state.availableSeries.length}>

		<div className="card border-0 shadow my-5 p-5">
			<Conditional if={this.state.success}>
				<div className="alert alert-success">
					Event {this.editMode ? "edited" : "added"}  successfully.
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
			<h1>{this.editMode ? "Edit" : "Create an"} Event</h1>
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
				<label htmlFor="image" className="col-form-label">Upload Image</label>
				<input id="imageUpload" type="file" onChange={this.uploadFile} accept="image/*"/>
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
			<FilterableFields
				noPublic={this.state.noPublic}
				restrictToSchool={this.state.restrictToSchool}
				restrictToStaff={this.state.restrictToStaff}
				updateParentState={this.updateParentState}
			/>
			<div>
				<button className={`btn btn-success mt-2 ${this.state.success ? 'disabled' : ''}`} onClick={this.submitForm} type="submit">{this.editMode ? "Edit" : "Add"} Event</button>
			</div>
		</div>
	</Conditional>
</form>
)};
}
