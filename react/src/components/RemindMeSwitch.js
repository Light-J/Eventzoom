import React from 'react';
import PropTypes from 'prop-types';

export class RemindMeSwitch extends React.Component {
	static propTypes = {
		reminding: PropTypes.bool.isRequired,
		onRemindChange: PropTypes.func.isRequired,
	};

	render = () => <div className="custom-control custom-switch">
		<input type="checkbox" className="custom-control-input" id="customSwitch1" checked={this.props.reminding} onChange={this.props.onRemindChange} />
		<label className="custom-control-label" htmlFor="customSwitch1">Send me a reminder</label>
	</div>
}


export default RemindMeSwitch;
