import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AttendButton extends Component {
    static propTypes = { userAttending: PropTypes.bool.isRequired };

    render = () => <button>{this.props.userAttending ? 'Attend' : 'Cancel reservation'}</button>;
}

export default AttendButton;
