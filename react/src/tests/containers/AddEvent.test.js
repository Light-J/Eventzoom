import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddEvent from '../../components/AddEvent';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddEvent />', () => {
	it('should check if elements are present', () => {
		const wrapper = shallow(<AddEvent />);

		const labelTitle = wrapper.find('label[htmlFor="title"]');
		const inputTitile = wrapper.find('input[id="title"]');

		const labelDescription = wrapper.find('label[htmlFor="description"]');
		const inputDescription = wrapper.find('textarea[id="title"]');

		const labelImage = wrapper.find('label[htmlFor="image"]');
		const inputImage = wrapper.find('input[id="imageUpload"]');

		const labelSpeaker = wrapper.find('label[htmlFor="speaker"]');
		const inputSpeaker = wrapper.find('input[id="speaker"]');

		const labelVaguelocation = wrapper.find('label[htmlFor="vaguelocation"]');
		const inputVaguelocation = wrapper.find('input[id="vaguelocation"]');

		const labelSpecificlocation = wrapper.find('label[htmlFor="specificlocation"]');
		const inputSpecificlocation = wrapper.find('input[id="specificlocation"]');

		const labelDisabilityaccess = wrapper.find('label[htmlFor="disabilityaccess"]');
		const inputDisabilityaccess = wrapper.find('input[type="radio"]');

		const labelOrganiser = wrapper.find('label[htmlFor="organiser"]');
		const inputOrganiser = wrapper.find('input[id="organiser"]');

		const labelCapacity = wrapper.find('label[htmlFor="capacity"]');
		const inputCapacity = wrapper.find('input[id="capacity"]');

		const button = wrapper.find('input[type="submit"]');

		expect(labelTitle).toHaveLength(1);
		expect(inputTitile).toHaveLength(1);

		expect(labelDescription).toHaveLength(1);
		expect(inputDescription).toHaveLength(1);

		expect(labelImage).toHaveLength(1);
		expect(inputImage).toHaveLength(1);

		expect(labelSpeaker).toHaveLength(1);
		expect(inputSpeaker).toHaveLength(1);

		expect(labelVaguelocation).toHaveLength(1);
		expect(inputVaguelocation).toHaveLength(1);

		expect(labelSpecificlocation).toHaveLength(1);
		expect(inputSpecificlocation).toHaveLength(1);

		expect(labelDisabilityaccess).toHaveLength(1);
		expect(inputDisabilityaccess).toHaveLength(2);

		expect(labelOrganiser).toHaveLength(1);
		expect(inputOrganiser).toHaveLength(1);

		expect(labelCapacity).toHaveLength(1);
		expect(inputCapacity).toHaveLength(1);

		expect(button).toHaveLength(1);
	});
});
