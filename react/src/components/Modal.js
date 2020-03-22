import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from './Conditional';

class Modal extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		children: PropTypes.any.isRequired,
		showButton: PropTypes.bool.isRequired,
		buttonText: PropTypes.string,
		buttonAction: PropTypes.func,
	};

	render = () => <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-hidden="true">
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">{this.props.title}</h5>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
					{this.props.children}
				</div>
				<Conditional if={this.props.showButton}>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={this.props.buttonAction}>{this.props.buttonText || ''}</button>
					</div>
				</Conditional>
			</div>
		</div>
	</div>
}

export default Modal;
