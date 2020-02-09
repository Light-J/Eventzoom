import React from 'react';
import PropTypes from 'prop-types';

function DisabilityAccess(props) {
	if (props.disabilityAccess) {
		return <div className="alert alert-success" role="alert">This event has disability access</div>;
	}
	return <div className="alert alert-danger" role="alert">This event unfortunatly does not have disability access</div>;
}

DisabilityAccess.propTypes = {
	disabilityAccess: PropTypes.bool,
};


export default DisabilityAccess;
