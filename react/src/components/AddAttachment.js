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

	render = () => <form>
		Add a new attachment. Name:
		<input type="text" onChange={this.updateFilename} />
		<input type="file" onChange={this.uploadFile}/>
		<button
			disabled={!(this.state.filename && this.state.file)}
			onClick={() => this.props.add(this.state.filename, this.state.file)}>Add</button>
	</form>
}

export default AddAttachment;
