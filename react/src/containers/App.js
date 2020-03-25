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
import Jwt from './Jwt';
import AddEvent from './AddEvent';
import Conditional from '../components/Conditional';
import Statistics from './Statistics';
import Profile from './Profile';
import EventAdmin from './EventAdmin';
import Home from './Home';

class App extends Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
		user: PropTypes.object,
	};

	render = () => <div>
		<NavBar />
		<Route exact path="/" >
			<Home />
		</Route>
		<Route exact path="/events/:eventId" component={(props) => <Event {...props.match.params} /> } />

		<Route exact path="/jwt/:jwt" component={(props) => <Jwt {...props.match.params} /> } />
		<Route exact path="/jwt/:jwt/:eventId" component={(props) => <Jwt {...props.match.params} /> } />

		<Route exact path="/register" render={(props) => <Registration {...props} />} />
		<Route exact path="/series/:seriesId" render={(props) => <Series {...props.match.params} />} />
		<Route exact path="/login" render={(props) => <Login {...props} />} />
		<Conditional if={this.props.isLoggedIn}>
			<Route exact path="/search" render={() => <Search />} />
			<Conditional if={
				this.props.user
				&& this.props.user.filterable
				&& this.props.user.filterable.staff}
			>
				<Route exact path="/add-series" render={(props) => <AddSeries {...props} />} />
				<Route exact path="/add-event" render={(props) => <AddEvent {...props} />} />
				<Route exact path="/statistics" render={(props) => <Statistics {...props} />} />
				<Route exact path="/events/admin/:eventId" component={(props) => <EventAdmin {...props.match.params} /> } />
			</Conditional>
			<Route exact path="/profile" render={(props) => <Profile {...props} />} />
		</Conditional>
	</div>
}

const mapStateToProps = (state) => ({
	isLoggedIn: !!state.userReducer.user,
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(App);
