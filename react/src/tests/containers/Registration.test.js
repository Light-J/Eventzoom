import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import Registration from '../../containers/Registration';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests password validation', () => {
	it('Says passwords are the same when they are', async () => {
		const wrapper = Enzyme.shallow(<Registration/>);
		wrapper.instance().setState({
			password: '123', passwordConfirmation: '123', success: false, userExists: false,
		});
		expect(wrapper.instance().showPasswordError()).toBeFalsy();
	});
	it('Says passwords are not the same when they arent', async () => {
		const wrapper = Enzyme.shallow(<Registration/>);
		wrapper.instance().setState({ password: '1234', passwordConfirmation: '123' });
		expect(wrapper.instance().showPasswordError()).toBeTruthy();
	});
});

describe('Tests form submission', () => {
	it('Submits and sets success to true if axios succeeds', async () => {
		axios.post = jest.fn().mockImplementation(async () => ({ success: true }));
		const wrapper = Enzyme.shallow(<Registration/>);
		const state = {
			password: '123', passwordConfirmation: '123', success: false, userExists: false,
		};
		wrapper.instance().setState(state);
		await wrapper.instance().submitForm();
		expect(wrapper.state().success).toBeTruthy();
		expect(wrapper.state().userExists).toBeFalsy();
	});
	it('Submits and sets success to false if axios fails', async () => {
		// eslint-disable-next-line no-throw-literal
		axios.post = jest.fn().mockImplementation(async () => { throw { response: { data: { error: 'validModel' } } }; });
		const wrapper = Enzyme.shallow(<Registration/>);
		const state = {
			password: '123', passwordConfirmation: '123', success: false, userExists: false,
		};
		wrapper.instance().setState(state);
		await wrapper.instance().submitForm();
		expect(wrapper.state().success).toBeFalsy();
		expect(wrapper.state().userExists).toBeTruthy();
	});
});
