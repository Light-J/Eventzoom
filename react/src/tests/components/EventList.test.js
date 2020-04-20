import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventList from '../../components/EventList';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of EventList', () => {
	it('Loads if empty', async () => {
		const wrapper = Enzyme.shallow(
			<EventList events={[]} title="Test"/>,
		);
		expect(wrapper.contains(<div className="card-body">
			No events to show!
		</div>)).toEqual(true);
	});
	it('Loads if full', async () => {
		const wrapper = Enzyme.shallow(
			<EventList title="Test" events={[{ _id: 5, title: 'qweasd', date: new Date() }]} />,
		);
		expect(wrapper.contains('qweasd')).toEqual(true);
	});
});
