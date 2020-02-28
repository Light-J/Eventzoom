import { Component } from 'react';
import PropTypes from 'prop-types';

class Conditional extends Component {
	static propTypes = {
		if: PropTypes.any,
		children: PropTypes.any.isRequired,
	};

	render = () => (this.props.if ? this.props.children : null);
}

export default Conditional;
