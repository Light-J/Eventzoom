
const canAccessResource = (instance, user) => {
	// if no filters bail early
	if (
		!instance.filterable
		|| instance.filterable.toObject() === undefined
		|| Object.keys(instance.filterable.toObject()).length === 0
	) {
		return true;
	}
	// // if user has no filters also bail early
	if (!user || !user.filterable) {
		return false;
	}
	// eslint-disable-next-line max-len
	return Object.entries(instance.filterable.toObject()).every(([key, value]) => user.filterable[key] === value);
};

const generateFilterableField = ({ restrictToSchool, restrictToStaff, noPublic }, user) => {
	const filterable = {};
	if (Number(noPublic)) {
		filterable.public = false;
	}
	if (Number(restrictToSchool)) {
		filterable.school = user.filterable.school;
	}
	if (Number(restrictToStaff)) {
		filterable.staff = true;
	}
	return filterable;
};

// eslint-disable-next-line max-len
const filterInaccessible = (entries, user) => entries.filter((entry) => canAccessResource(entry, user));

export default { canAccessResource, filterInaccessible, generateFilterableField };
