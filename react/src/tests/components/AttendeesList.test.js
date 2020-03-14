import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AttendeesList from '../../components/AttendeesList';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of attend button', () => {
	it('Loads list, attendee present', async () => {
		const wrapper = Enzyme.shallow(
			<AttendeesList attendees={[{ _id: 123, email: 'test' }]} />,
		);
		expect(wrapper.contains(<li key={123} className="list-group-item">test</li>)).toEqual(true);
	});
});
