import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import Event from './Event';
import Search from './Search';
import Registration from './Registration';
import AddSeries from './AddSeries';
import Login from './Login';
import Series from './Series';
import AddEvent from './AddEvent';
import Conditional from '../components/Conditional';

class App extends Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
	};

	render = () => <div>
		<NavBar />
		<Route exact path="/" >
			<Search />
		</Route>
		<Route exact path="/events/:eventid" component={(props) => <Event {...props.match.params} /> } />
		<Route exact path="/Registration" render={(props) => <Registration {...props} />} />
		<Route exact path="/series/:seriesId" render={(props) => <Series {...props.match.params} />} />
		<Route exact path="/Login" render={(props) => <Login {...props} />} />
		<Conditional if={this.props.isLoggedIn}>
			<Route exact path="/add-series" render={(props) => <AddSeries {...props} />} />
			<Route exact path="/add-event" render={(props) => <AddEvent {...props} />} />
		</Conditional>

	</div>
}

const mapStateToProps = (state) => ({
	isLoggedIn: !!state.userReducer.user,
});

export default connect(mapStateToProps)(App);
