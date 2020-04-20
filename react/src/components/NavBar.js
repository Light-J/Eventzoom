import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Conditional from './Conditional';

export class NavBar extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	// taken off the basic bootstrap template https://getbootstrap.com/docs/4.0/components/navbar/
	render = () => <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<Link className="navbar-brand" to="/">EventZoom</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="nav-collapse">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/">Home</Link>
				</li>
				<Conditional if={!this.props.user}>
					<li className="nav-item">
						<Link className="nav-link" to="/register">Registration</Link>
					</li>
				</Conditional>
				<Conditional if={this.props.user}>
					<li className="nav-item">
						<Link className="nav-link" to="/search">Search</Link>
					</li>
					<Conditional if={
						this.props.user
						&& this.props.user.filterable
						&& this.props.user.filterable.staff}
					>
						<li>
							<Link className="nav-link" to="/add-series">Add Series</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/add-event">Add Event</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/statistics">Statistics</Link>
						</li>

					</Conditional>
				</Conditional>
			</ul>
			<ul className="navbar-nav">
				<li className="nav-item">
					{
						this.props.user ? <Link className="nav-link" to="/profile"> { this.props.user.email }</Link> : <Link className="nav-link" to="/login">Login</Link>
					}
				</li>
				<Conditional if={this.props.user}>
					<li className="nav-item">
						<button className="nav-link btn btn-link" style={{ cursor: 'pointer' }} onClick={() => {
							localStorage.clear();
							window.location.reload();
						}}> Logout </button>
					</li>
				</Conditional>
			</ul>
		</div>
	</nav>
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(NavBar);
