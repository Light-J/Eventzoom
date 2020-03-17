import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AttachmentManagement from '../../components/AttachmentManagement';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of an Attachment', () => {
	it('Loads if attachment valid', async () => {
		const attachments = [{ _id: 123, filename: 'test', location: 'www.google.com' }];
		const fakeFunc = function fake() {};
		const wrapper = Enzyme.shallow(
			<AttachmentManagement
				attachments={attachments}
				add={fakeFunc}
				handleChange={fakeFunc}
				delete={fakeFunc}/>,
		);
		expect(wrapper.contains(<div className="card-header">Attachments for this event (Accepted files: pdfs, images, audio and videos)</div>)).toEqual(true);
	});
});
