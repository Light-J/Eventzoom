import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Conditional from './Conditional';

export class NavBar extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	// taken off of the basic bootstrap template https://getbootstrap.com/docs/4.0/components/navbar/
	render = () => <nav className="navbar navbar-expand-lg navbar-light bg-light">
		<Link className="navbar-brand" to="/">EventZoom</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="nav-collapse">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
				</li>
				<Conditional if={!this.props.user}>
					<li className="nav-item">
						<Link className="nav-link" to="/Registration">Registration <span className="sr-only">(current)</span></Link>
					</li>
				</Conditional>
				<Conditional if={this.props.user}>
					<li className="nav-item">
						<Link className="nav-link" to="/subscriptions">My Subscriptions <span className="sr-only">(current)</span></Link>
					</li>
					<li>
						<Link className="nav-link" to="/add-series">Add Series</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/add-event">Add Event <span className="sr-only">(current)</span></Link>
					</li>
				</Conditional>
			</ul>
			<ul className="navbar-nav">
				<li className="nav-item">
					{
						this.props.user ? <Link className="nav-link" to=""> { this.props.user.email } <span className="sr-only">(current)</span></Link> : <Link className="nav-link" to="/Login">Login <span className="sr-only">(current)</span></Link>
					}
				</li>
				<Conditional if={this.props.user}>
					<li className="nav-item">
						<a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => {
							localStorage.clear();
							window.location.reload();
						}}> Logout </a>
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
