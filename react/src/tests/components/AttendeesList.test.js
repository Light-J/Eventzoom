import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AttendeesList from '../../components/AttendeesList';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of attendees list', () => {
	it('Loads list, attendee present', async () => {
		const wrapper = Enzyme.shallow(
			<AttendeesList attendees={[{ user: { _id: 123, email: 'test' } }]} />,
		);
		expect(wrapper.contains(<li key={123} className="list-group-item"><a href='mailto:test'>test</a></li>)).toEqual(true);
	});
});
