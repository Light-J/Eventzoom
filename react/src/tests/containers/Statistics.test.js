import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import Statistics from '../../containers/Statistics';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests correct loading', () => {
	it('loads correctly', async () => {
		axios.get = jest.fn().mockImplementation(async () => ({ data: ['1', '2', '3'] }));
		const wrapper = Enzyme.shallow(<Statistics eventId="2"/>);
		await wrapper.instance().componentDidMount();
		expect(wrapper.state().statistics).toEqual(['1', '2', '3']);
	});
});
