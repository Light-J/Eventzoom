import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchSidebar from '../../components/SearchSidebar';

Enzyme.configure({ adapter: new Adapter() });

describe('tests typing in search sidebar', () => {
	it('calls parent method if field changes', async () => {
		const updateInput = jest.fn();
		const updateDate = jest.fn();
		const date = new Date();
		const search = jest.fn();
		const wrapper = Enzyme.shallow(
			<SearchSidebar
				updateInput={updateInput}
				search={search}
				updateDates={updateDate}
				startDate={date}
				endDate={date}
				toggle={jest.fn}/>
			,
		);
		wrapper.find('input').first().simulate('change', { target: { value: 'test' } });
		expect(updateInput.mock.calls.length).toBe(1);
	});
	it('calls parent method if button is clicked', async () => {
		const updateInput = jest.fn();
		const updateDate = jest.fn();
		const date = new Date();
		const search = jest.fn();
		const wrapper = Enzyme.shallow(
			<SearchSidebar
				updateInput={updateInput}
				search={search}
				updateDates={updateDate}
				startDate={date}
				endDate={date}
				toggle={jest.fn()}/>
			,
		);
		wrapper.find('button').at(1).simulate('click');
		expect(search.mock.calls.length).toBe(1);
	});
});
