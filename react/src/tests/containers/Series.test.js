import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import Series from '../../containers/Series';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests correct loading', () => {
	it('Sets isLoaded to true without error', async () => {
		axios.get = jest.fn().mockImplementation(async () => ({
			data: {
				title: 'Example Title', user: { email: '' }, description: '', image: '',
			},
		}));
		const wrapper = Enzyme.shallow(<Series seriesId="2"/>);
		await wrapper.instance().componentDidMount();
		expect(wrapper.state().isLoading).toEqual(false);
		expect(wrapper.state().title).toEqual('Example Title');
	});
	it('Sets error to true on error', async () => {
		axios.get = jest.fn().mockImplementation(() => Promise.reject());
		const wrapper = Enzyme.shallow(<Series seriesId="2"/>);
		await wrapper.instance().componentDidMount();
		expect(wrapper.state().error).toEqual(true);
		expect(wrapper.contains(<h1>An error has occured. We are sorry.</h1>)).toEqual(true);
	});
});
