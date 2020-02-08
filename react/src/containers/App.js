import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import Event from '../components/Event';

class App extends Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
	};

	render = () => <div>
		<NavBar />
		<Route exact path="/" >
				Hello World! { this.isLoggedIn ? 'yes' : 'no'}
		</Route>
		<Route exact path="/event" >

			<Event
				title={'Cat-a-Burger?'}
				description={'Cats like burgers?? Come to this talk where we talk all about the different wonders of a cats diet'}
				image={'https://i.imgur.com/vgZrB5U.jpg'}
				datetime={new Date('03-01-2020')}
				speaker={'John Smith'}
				organiser={'Smith John'}
				vagueLocation={'Cardiff'}
				disabilityAccess={false}
				curAttending={50} capacity={55}
			/>
		</Route>
	</div>
}

const mapStateToProps = (state) => ({
	isLoggedIn: state.simpleReducer.status,
});

export default connect(mapStateToProps)(App);
