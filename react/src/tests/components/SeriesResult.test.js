import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SeriesResult from '../../components/SeriesResult';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of series result', () => {
	it('Loads button, event not full and no user', async () => {
		const wrapper = Enzyme.shallow(
			<SeriesResult id={'123'} image={'none'} title={'This is my test title'} description={'test description'} />,
		);
		expect(wrapper.contains(<h5 className="card-title">This is my test title</h5>)).toEqual(true);
	});
});
