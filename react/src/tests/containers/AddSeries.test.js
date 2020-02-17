import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import AddSeries from '../../containers/AddSeries';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests form submission', () => {
	it('Submits and sets success to true if axios succeeds', async () => {
		axios.post = jest.fn().mockImplementation(async () => ({ success: true }));
		const wrapper = Enzyme.shallow(<AddSeries/>);
		const state = {
			title: '123', description: '123', file: false,
		};
		wrapper.instance().setState(state);
		await wrapper.instance().submitForm();
		expect(wrapper.state().success).toBeTruthy();
		expect(wrapper.state().imageError).toBeFalsy();
		expect(wrapper.state().requiredError).toBeFalsy();
	});
	it('Submits and sets success to false if axios fails', async () => {
		// eslint-disable-next-line no-throw-literal
		axios.post = jest.fn().mockImplementation(async () => { throw { response: { data: { error: 'file' } } }; });
		const wrapper = Enzyme.shallow(<AddSeries/>);
		const state = {
			title: '123', description: '123', file: false,
		};
		wrapper.instance().setState(state);
		await wrapper.instance().submitForm();
		await expect(wrapper.state().success).toBeFalsy();
		await expect(wrapper.state().requiredError).toBeFalsy();
		await expect(wrapper.state().imageError).toBeTruthy();
	});
	it('Submits and sets success to false if axios fails and gets correct error', async () => {
		// eslint-disable-next-line no-throw-literal
		axios.post = jest.fn().mockImplementation(async () => { throw { response: { data: { error: 'required' } } }; });
		const wrapper = Enzyme.shallow(<AddSeries/>);
		const state = {
			title: '123', description: '123', file: false,
		};
		wrapper.instance().setState(state);
		await wrapper.instance().submitForm();
		await expect(wrapper.state().success).toBeFalsy();
		await expect(wrapper.state().requiredError).toBeTruthy();
		await expect(wrapper.state().imageError).toBeFalsy();
	});
});
