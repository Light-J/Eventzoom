import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DisabilityAccess from '../../components/DisabilityAccess';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests loading of disability access', () => {
	it('Sets access to none if given false', async () => {
		const wrapper = Enzyme.shallow(<DisabilityAccess disabilityAccess={false} />);
		expect(wrapper.contains(<div className="alert alert-danger" role="alert">This event does not have disability access</div>)).toEqual(true);
	});
	it('Sets access to available if given true', async () => {
		const wrapper = Enzyme.shallow(<DisabilityAccess disabilityAccess={true} />);
		expect(wrapper.contains(<div className="alert alert-success" role="alert">This event has disability access</div>)).toEqual(true);
	});
});
