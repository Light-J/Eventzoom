import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilterableFields from '../../components/FilterableFields';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests should call correct parent', () => {
	it('should call corret thing when checked', async () => {
		const updateParentState = jest.fn();
		const wrapper = Enzyme.shallow(<FilterableFields
			noPublic={0}
			restrictToStaff={0}
			restrictToSchool={0}
			updateParentState={updateParentState}
		/>);
		await (wrapper.instance().updatePublic({ target: { checked: true } }));
		expect(updateParentState.mock.calls[0]).toEqual([{ noPublic: 1 }]);
	});

	it('should call correct thing when not checked', async () => {
		const updateParentState = jest.fn();
		const wrapper = Enzyme.shallow(<FilterableFields
			noPublic={0}
			restrictToStaff={0}
			restrictToSchool={0}
			updateParentState={updateParentState}
		/>);
		await (wrapper.instance().updatePublic({ target: { checked: false } }));
		expect(updateParentState.mock.calls[0]).toEqual(
			[
				{ noPublic: 0, restrictToStaff: 0, restrictToSchool: 0 },
			],
		);
	});
});
