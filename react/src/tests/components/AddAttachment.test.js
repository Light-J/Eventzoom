import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddAttachment from '../../components/AddAttachment';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of an Attachment', () => {
	it('Loads if attachment valid', async () => {
		const wrapper = Enzyme.shallow(
			<AddAttachment add={function fake() {}}/>,
		);
		expect(wrapper.contains(<label className="custom-file-label" htmlFor="inputGroupFile01">Please choose a file</label>)).toEqual(true);
	});
});
