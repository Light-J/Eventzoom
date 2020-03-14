import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { EventAdmin } from '../../containers/EventAdmin';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests correct loading', () => {
	it('Sets isLoaded to true without error', async () => {
		axios.get = jest.fn().mockImplementation(async () => ({ data: { title: 'Example Title', _id: '2', organiser: { email: 'test' } } }));
		const wrapper = Enzyme.shallow(<EventAdmin eventId="2" user={{ email: 'test' }} />);
		await wrapper.instance().componentDidMount();
		expect(wrapper.state().isLoaded).toEqual(true);
		expect(wrapper.state().title).toEqual('Example Title');
		expect(wrapper.contains(<h1>Admin page | Example Title</h1>)).toEqual(true);
	});
});
