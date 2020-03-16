import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddAttachment extends Component {
	static propTypes = {
		add: PropTypes.string.isRequired,
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

			<div className="input-group col-md-5">
				<input id="filenameInput" type="text" className="form-control control-label" placeholder="Name" onChange={this.updateFilename} />
			</div>

			<div className="input-group col-md-5">
				<div className="custom-file">
					<input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.uploadFile} />
					<label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
				</div>
			</div>

			<div className="input-group col-md-2">
				<button className="btn btn-success control-label" onClick={() => this.props.add(this.state.filename, this.state.file)}>Add</button>
			</div>
		</div>
	</div>
}

export default AddAttachment;
