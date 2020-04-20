import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { Event } from '../../containers/Event';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests correct loading', () => {
	it('Sets isLoaded to true without error', async () => {
		axios.get = jest.fn().mockImplementation(async () => ({ data: { title: 'Example Title', _id: '2' } }));
		const wrapper = Enzyme.shallow(<Event eventId="2"/>);
		await wrapper.instance().componentDidMount();
		expect(wrapper.state().isLoaded).toEqual(true);
		expect(wrapper.state().title).toEqual('Example Title');
		expect(wrapper.contains(<h1 className="font-weight-light">Example Title</h1>)).toEqual(true);
	});
	it('Sets error to true on error', async () => {
		axios.get = jest.fn().mockImplementation(() => Promise.reject());
		const wrapper = Enzyme.shallow(<Event eventId="2"/>);
		await wrapper.instance().componentDidMount();
		expect(wrapper.contains(<h1>Sorry this event could not be found</h1>)).toEqual(true);
	});
});
