import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { Login } from '../../containers/Login';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests password validation', () => {
	it('Login fails', async () => {
		// eslint-disable-next-line no-throw-literal
		axios.post = jest.fn().mockImplementation(async () => { throw { response: { data: { error: 'validModel' } } }; });
		const wrapper = Enzyme.shallow(<Login user={{}} setUser={() => {}}/>);
		wrapper.instance().setState({
			username: '123',
			password: '123',
		});
		await wrapper.instance().submitForm(new Event('click'));
		expect(wrapper.state().authenticationFailure).toBeTruthy();
	});
});
