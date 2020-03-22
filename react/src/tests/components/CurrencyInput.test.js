import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrencyInput from '../../components/CurrencyInput';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests currency input', () => {
	it('lets through if just numbers', async () => {
		const setAmount = jest.fn();
		const wrapper = Enzyme.shallow(
			<CurrencyInput amount={69} setAmount={setAmount}/>,
		);
		wrapper.instance().onChange({ target: { value: '42069' } });
		expect(setAmount.mock.calls.length).toEqual(1);
	});

	it('doesnt let through if has not number', async () => {
		const setAmount = jest.fn();
		const wrapper = Enzyme.shallow(
			<CurrencyInput amount={69} setAmount={setAmount}/>,
		);
		wrapper.instance().onChange({ target: { value: '420.69' } });
		expect(setAmount.mock.calls.length).toEqual(0);
	});
});
