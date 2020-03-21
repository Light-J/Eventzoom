import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Jwt extends Component {
	static propTypes = {
		jwt: PropTypes.string.isRequired,
	};

	componentDidMount = () => {
		localStorage.setItem('JWT', this.props.jwt);
		window.location.href = '/';
	}

	render = () => <div>You will be redirected shortly</div>
}

export default Jwt;
