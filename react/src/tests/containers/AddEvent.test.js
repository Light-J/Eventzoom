import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddEvent } from '../../containers/AddEvent';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddEvent />', () => {
	it('should check if elements are present', () => {
		const wrapper = shallow(<AddEvent user={{ zoom: true }}/>);

		const labelTitle = wrapper.find('label[htmlFor="title"]');
		const inputTitile = wrapper.find('input[id="title"]');

		const labelDescription = wrapper.find('label[htmlFor="description"]');
		const inputDescription = wrapper.find('textarea[id="description"]');

		const labelImage = wrapper.find('label[htmlFor="imageUpload"]');
		const inputImage = wrapper.find('input[id="imageUpload"]');

		const labelSpeaker = wrapper.find('label[htmlFor="speaker"]');
		const inputSpeaker = wrapper.find('input[id="speaker"]');

		const labelvagueLocation = wrapper.find('label[htmlFor="vagueLocation"]');
		const inputvagueLocation = wrapper.find('input[id="vagueLocation"]');

		const labelspecificLocation = wrapper.find('label[htmlFor="specificLocation"]');
		const inputspecificLocation = wrapper.find('input[id="specificLocation"]');

		const inputDisabilityAccess = wrapper.find('input[type="radio"]');

		const labelCapacity = wrapper.find('label[htmlFor="capacity"]');
		const inputCapacity = wrapper.find('input[id="capacity"]');

		expect(labelTitle).toHaveLength(1);
		expect(inputTitile).toHaveLength(1);

		expect(labelDescription).toHaveLength(1);
		expect(inputDescription).toHaveLength(1);

		expect(labelImage).toHaveLength(1);
		expect(inputImage).toHaveLength(1);

		expect(labelSpeaker).toHaveLength(1);
		expect(inputSpeaker).toHaveLength(1);

		expect(labelvagueLocation).toHaveLength(1);
		expect(inputvagueLocation).toHaveLength(1);

		expect(labelspecificLocation).toHaveLength(1);
		expect(inputspecificLocation).toHaveLength(1);

		expect(inputDisabilityAccess).toHaveLength(4);

		expect(labelCapacity).toHaveLength(1);
		expect(inputCapacity).toHaveLength(1);
	});
});
