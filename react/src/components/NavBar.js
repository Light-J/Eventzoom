import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
	// taken off of the basic bootstrap template https://getbootstrap.com/docs/4.0/components/navbar/
	render = () => <nav className="navbar navbar-expand-lg navbar-light bg-light">
		<Link className="navbar-brand" to="/">EventZoom</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/Login">Login <span className="sr-only">(current)</span></Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/Registration">Registration <span className="sr-only">(current)</span></Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/series/1">Series <span className="sr-only">(current)</span></Link>
				</li>
				<li>
					<Link className="nav-link" to="/add-series">Add Series</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/addEvent">Add Event <span className="sr-only">(current)</span></Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/editEvent">Edit Event <span className="sr-only">(current)</span></Link>
				</li>

			</ul>
		</div>
	</nav>
}

export default NavBar;
