import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from './Conditional';
import Attachment from './Attachment';
import AddAttachment from './AddAttachment';

class AttachmentManagement extends Component {
	static propTypes = {
		attachments: PropTypes.array.isRequired,
		delete: PropTypes.func.isRequired,
		add: PropTypes.func.isRequired,
		handleChange: PropTypes.func.isRequired,
		uploadingFile: PropTypes.bool,
	};

	attachments = () => this.props.attachments.map((attachment) => <Attachment
		key={attachment._id}
		filename={attachment.filename}
		location={attachment.location}
		_id={attachment._id}
		delete={this.props.delete} />);

	render = () => <div className="card mb-2">
		<div className="card-header">Attachments for this event (Accepted files: pdfs, images, audio and videos)</div>

		<ul className="list-group list-group-flush">
			<Conditional if={this.props.attachments.length > 0}>
				{this.attachments()}
			</Conditional>
			<li className="list-group-item">
				<AddAttachment add={this.props.add} uploading={this.props.uploadingFile} />
			</li>
		</ul>
	</div>
}

export default AttachmentManagement;
