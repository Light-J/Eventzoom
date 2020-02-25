import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchSidebar from '../../components/SearchSidebar';

Enzyme.configure({ adapter: new Adapter() });

describe('tests typing in search sidebar', () => {
	it('calls parent method if field changes', async () => {
		const updateQuery = jest.fn();
		const search = jest.fn();
		const wrapper = Enzyme.shallow(<SearchSidebar updateQuery={updateQuery} search={search}/>);
		wrapper.find('input').first().simulate('change', { target: { value: 'test' } });
		expect(updateQuery.mock.calls.length).toBe(1);
	});
	it('calls parent method if button is clicked', async () => {
		const updateQuery = jest.fn();
		const search = jest.fn();
		const wrapper = Enzyme.shallow(<SearchSidebar updateQuery={updateQuery} search={search}/>);
		wrapper.find('button').first().simulate('click');
		expect(search.mock.calls.length).toBe(1);
	});
});
