import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { Search } from '../../containers/Search';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests correct loading', () => {
	it('Sets isLoading to false without error', async () => {
		const data = [{ entry: true }];
		axios.get = jest.fn().mockImplementation(async () => ({ data }));
		const wrapper = Enzyme.shallow(<Search user={{}}/>);
		await wrapper.instance().componentDidMount();
		expect(wrapper.state().isLoadingEvents).toEqual(false);
		expect(wrapper.state().eventSearchResults[0].entry).toEqual(true);
	});
});

describe('Tests sidebar', () => {
	it('Tests sidebar correctly appears', async () => {
		const data = [{ entry: true }];
		axios.get = jest.fn().mockImplementation(async () => ({ data }));
		const wrapper = Enzyme.shallow(<Search user={{}} />);
		await wrapper.instance().componentDidMount();
		expect(wrapper.state().isLoadingEvents).toEqual(false);
		wrapper.instance().onToggle();
		expect(wrapper.state().showSidebar).toEqual(true);
	});
});
