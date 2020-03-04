import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { Profile } from '../../containers/Profile';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests profile update', () => {
	it('Submits and sends PUT request', async () => {
		// eslint-disable-next-line no-throw-literal
		axios.put = jest.fn().mockImplementation(async () => { throw { response: { data: { error: 'validModel' } } }; });
		const wrapper = Enzyme.shallow(<Profile user={{}} setUser={() => {}}/>);
		wrapper.instance().setState({
			email: 'test@test',
			name: 'test',
		});
		await wrapper.instance().submitProfileForm(new Event('click'));
		expect(wrapper.state().profileSaveFailure).toBeTruthy();
	});
});
