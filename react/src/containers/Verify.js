import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Conditional from '../components/Conditional';
import serverConfig from '../config/server';

export default class Verify extends React.Component {
	state = {
		success: false,
		error: false,
	};

	static propTypes = {
		token: PropTypes.string.isRequired,
	};

	async componentDidMount() {
		try {
			await axios.post(`${serverConfig.url}users/verify`, { token: this.props.token });
			this.setState({ success: true });
		} catch (e) {
			this.setState({ error: true });
		}
	}

	render() {
		return (
			<div className="container">
				<div className="card border-0 shadow my-5 p-5">
					<Conditional if={this.state.success}>
						<div className="alert alert-success">
							Account was verified successfully.
						</div>
					</Conditional>

					<Conditional if={this.state.error}>
						<div className="alert alert-danger">
							There was an error verifying the account.
						</div>
					</Conditional>
				</div>
			</div>
		);
	}
}
