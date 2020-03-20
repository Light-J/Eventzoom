
const canAccessResource = (_instance, user) => {
	const instance = _instance.toObject();
	let whitelist = [];
	// deal with whitelist early
	if (instance.filterable) {
		whitelist = instance.filterable.whitelist;
		delete instance.filterable.whitelist;
	}
	if (whitelist.length) {
		return user ? whitelist.includes(user.email) : false;
	}
	// if no filters bail early
	if (
		!instance.filterable
		|| Object.keys(instance.filterable).length === 0
	) {
		return true;
	}
	// if whitelist, use that instead
	// // if user has no filters also bail early
	if (!user || !user.filterable) {
		return false;
	}
	// eslint-disable-next-line max-len
	return Object.entries(instance.filterable).every(([key, value]) => user.filterable[key] === value);
};

const generateFilterableField = ({
	restrictToSchool, restrictToStaff, noPublic, whitelist,
}, user) => {
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
	if (whitelist) {
		// splits by commas and any surrounding whitespace
		filterable.whitelist = whitelist.split(/\s*,\s*/);
		filterable.whitelist.push(user.email);
	}
	return filterable;
};

// eslint-disable-next-line max-len
const filterInaccessible = (entries, user) => entries.filter((entry) => canAccessResource(entry, user));

export default { canAccessResource, filterInaccessible, generateFilterableField };
