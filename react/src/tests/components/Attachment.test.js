import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Attachment from '../../components/Attachment';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of an Attachment', () => {
	it('Loads if attachment valid', async () => {
		const wrapper = Enzyme.shallow(
			<Attachment filename={'Jacks file'} location="file.png" _id={123}/>,
		);
		expect(wrapper.contains(<a href='file.png' download>Jacks file.png</a>)).toEqual(true);
	});
});
