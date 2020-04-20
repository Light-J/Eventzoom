import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SortButton from '../../components/SortButton';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests sortbutton', () => {
	it('loads the correct string', async () => {
		const wrapper = Enzyme.shallow(<SortButton selectSort={jest.fn()} sortable="attendees" direction="asc" />);
		expect(wrapper.instance().buttonString()).toMatchSnapshot();
	});
});
