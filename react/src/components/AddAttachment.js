import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddAttachment extends Component {
	static propTypes = {
		add: PropTypes.func.isRequired,
		uploading: PropTypes.bool.isRequired,
	};

	state = {
		filename: null,
		file: null,
	};

	updateFilename = (e) => {
		this.setState({ filename: e.target.value });
	};

	uploadFile = (e) => {
		this.setState({ file: e.target.files[0] });
	};

	render = () => <div className="container-fluid">
		<div className="row">
			<p>Add an attachment:</p>

			<div className="input-group col-md-4">
				<input id="filenameInput" type="text" className="form-control control-label" placeholder="Name" onChange={this.updateFilename} />
			</div>

			<div className="input-group col-md-4">
				<div className="custom-file">
					<input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.uploadFile} />
					<label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.file ? this.state.file.name : 'Please choose a file'}</label>
				</div>
			</div>

			<div className="input-group col-md-2">
				<button className="btn btn-success control-label" disabled={!this.state.filename || !this.state.file || (this.props.uploading)} onClick={() => this.props.add(this.state.filename, this.state.file)}>{!this.props.uploading ? 'Add' : 'Uploading...'}</button>
			</div>
		</div>
	</div>
}

export default AddAttachment;
