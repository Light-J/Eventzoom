import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisabilityAccess extends Component {
	static propTypes = {
		disabilityAccess: PropTypes.bool,
	};

	render = () => {
		if (this.props.disabilityAccess) {
			return <div className="alert alert-success" role="alert">This event has disability access</div>;
		}
		return <div className="alert alert-danger" role="alert">This event does not have disability access</div>;
	};
}

export default DisabilityAccess;
