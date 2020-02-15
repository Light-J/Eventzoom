import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import Event from './Event';
import Search from './Search';
import Registration from '../components/Registration';
import Login from '../components/Login';
import Series from '../components/Series';

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
		<Route exact path="/Login" render={(props) => <Login {...props} />} />
		<Route exact path="/series/:seriesId" >
			<Series />
		</Route>

	</div>
}

const mapStateToProps = (state) => ({
	isLoggedIn: state.simpleReducer.status,
});

export default connect(mapStateToProps)(App);
