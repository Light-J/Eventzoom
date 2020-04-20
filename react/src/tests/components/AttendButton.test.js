import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AttendButton } from '../../components/AttendButton';

Enzyme.configure({ adapter: new Adapter() });
const date = new Date();
date.setFullYear(date.getFullYear() + 5);

describe('Tests loading of attend button', () => {
	it('Loads button, event not full and no user', async () => {
		const wrapper = Enzyme.shallow(
			<AttendButton full={false} eventId={123} price={0} date={date}/>,
		);
		expect(wrapper.contains(<Link to="/login"><button className="btn btn-outline-info"><FontAwesomeIcon icon={faRss} /> Log in to attend event</button></Link>)).toEqual(true);
	});
	it('Loads button, event not full and user', async () => {
		const wrapper = Enzyme.shallow(
			<AttendButton full={false} eventId={123} user={'something'} price={0} date={date}/>,
		);
		expect(wrapper.contains('Attend')).toEqual(true);
	});
	it('Loads button, event full', async () => {
		const wrapper = Enzyme.shallow(
			<AttendButton full={true} eventId={123} price={0} date={date}/>,
		);
		expect(wrapper.contains(<button className="btn btn-info btn-lg btn-block">Sorry, this event is full</button>)).toEqual(true);
	});
});
