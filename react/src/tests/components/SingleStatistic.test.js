import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SingleStatistic from '../../components/SingleStatistic';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of SingleStatistic', () => {
	it('Loads if empty', async () => {
		const wrapper = Enzyme.shallow(
			<SingleStatistic data={{ name: 'test', results: [] }} title="Test"/>,
		);
		expect(wrapper.contains('No data found :(')).toEqual(true);
	});
	it('Loads if full', async () => {
		const wrapper = Enzyme.shallow(
			<SingleStatistic data={{ name: 'test', results: [{ title: '5', count: '6' }] }} />,
		);
		expect(wrapper.contains(<td>5</td>)).toEqual(true);
		expect(wrapper.contains(<td>6</td>)).toEqual(true);
	});
});
