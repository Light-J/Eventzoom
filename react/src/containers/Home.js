import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Conditional from '../components/Conditional';
import Search from './Search';
import Subscriptions from './Subscriptions';

class Home extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render = () => <div>
		<Conditional if={!this.props.user || !this.props.user.subscribedSeries.length}>
			<Search />
		</Conditional>
		<Conditional if={this.props.user && this.props.user.subscribedSeries.length}>
			<Subscriptions />
		</Conditional>
	</div>
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user,
});


export default connect(mapStateToProps)(Home);
