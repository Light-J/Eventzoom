import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import EditEvent from '../../components/EditEvent';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of an editevent', () => {
	it('it prevents form submit', async () => {
		const wrapper = Enzyme.shallow(
			<EditEvent eventId="5"/>,
			{ disableLifecycleMethods: true },
		);
		const e = { preventDefault: jest.fn() };
		axios.put = jest.fn().mockImplementation(async () => ({ data: { title: 'Example Title', _id: '2' } }));
		wrapper.instance().submitForm(e);
		await expect(e.preventDefault.mock.calls.length).toEqual(1);
	});
});
