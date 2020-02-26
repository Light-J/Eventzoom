import React from 'react';

export default class EditEvent extends React.Component {
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
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (<form className="container" onSubmit={() => this.submitData()}>
			<div className="card border-0 shadow my-5">
				<div className="form-group">
					<label HtmlFor="title" className="col-sm-2 col-form-label">Title</label>
					<div className="col-sm-10">
						<input id="title" className="form-control" type="text" name="title" placeholder="title"
							value={this.state.title} onChange={this.handleChange} required />
					</div>
				</div>

				<div className="form-group">
					<label HtmlFor="description" className="col-sm-2 col-form-label">Description</label>
					<div className="col-sm-10">
						<textarea id="title" className="form-control" name="description" placeholder="description"
							value={this.state.description} onChange={this.handleChange} required />
					</div>
				</div>

				<div className="form-group">
					<label HtmlFor="image" className="col-sm-2 col-form-label">Upload Image</label>
					<div className="col-sm-10">
						<input id="imageUpload" className="form-control" type="file" name="image"
							onChange={this.handleChange} required />
					</div>
				</div>

				<div className="form-group">
					<label HtmlFor="speaker" className="col-sm-2 col-form-label">Speaker</label>
					<div className="col-sm-10">
						<input id="speaker" className="form-control" type="text" name="speaker" placeholder="speaker"
							value={this.state.speaker} onChange={this.handleChange} required />
					</div>
				</div>

				<div className="form-group">
					<label HtmlFor="vaguelocation" className="col-sm-2 col-form-label">Vague Location</label>
					<div className="col-sm-10">
						<input id="vaguelocation" className="form-control" type="text" name="vaguelocation" placeholder="vague location"
							value={this.state.vaguelocation} onChange={this.handleChange} required />
					</div>
				</div>

				<div className="form-group">
					<label HtmlFor="specificlocation" className="col-sm-2 col-form-label">Specific Location</label>
					<div className="col-sm-10">
						<input id="specificlocation" className="form-control" type="text" name="specificlocation" placeholder="specific location"
							value={this.state.specificlocation} onChange={this.handleChange} required />
					</div>
				</div>


				<div className="form-group">
					<label HtmlFor="disabilityaccess" className="col-sm-2 col-form-label">Disability Access</label>
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
					<label HtmlFor="organiser" className="col-sm-2 col-form-label">Organiser</label>
					<div className="col-sm-10">
						<input id="organiser" className="form-control" type="text" name="organiser" placeholder="organiser"
							value={this.state.organiser} onChange={this.handleChange} required />
					</div>
				</div>

				<div className="form-group">
					<label HtmlFor="capacity" className="col-sm-2 col-form-label">Capacity</label>
					<div className="col-sm-10">
						<input id="capacity" className="form-control" type="number" name="capacity" placeholder="capacity"
							value={this.state.capacity} onChange={this.handleChange} required />
					</div>
				</div>

				<div>
					<input type="submit" className="btn btn-outline-primary btn-block" value='Add Event' />
				</div>
			</div>
		</form>
		);
	}
}
