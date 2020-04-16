import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Offline, Online } from 'react-detect-offline';
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
import ForgottenPasswordRequest from './ForgottenPasswordRequest';
import ResendVerificationEmailRequest from './ResendVerificationEmailRequest';
import ResetPassword from './ResetPassword';
import Verify from './Verify';
import Profile from './Profile';
import EventAdmin from './EventAdmin';
import Home from './Home';

class App extends Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
		user: PropTypes.object,
	};

	render = () => <div>
		<Online>
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
			<Route exact path="/forgotten-password" render={(props) => <ForgottenPasswordRequest {...props} />} />
			<Route exact path="/resend-verification" render={(props) => <ResendVerificationEmailRequest {...props} />} />
			<Route exact path="/reset-password-form/:token" component={(props) => <ResetPassword {...props.match.params} /> } />
			<Route exact path="/verify-account/:token" component={(props) => <Verify {...props.match.params} /> } />
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
		</Online>
		<Offline>
			<div className="alert alert-danger m-5">
				<h1>Please connect to the internet</h1>
				<p>EventZoom only works when you are online.</p>
			</div>
		</Offline>
	</div>
}

const mapStateToProps = (state) => ({
	isLoggedIn: !!state.userReducer.user,
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(App);
