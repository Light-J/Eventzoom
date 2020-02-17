// based on https://gitlab.cs.cf.ac.uk/c1734384/react-assessment-1/blob/master/assessment-1-server/src/middleware/validation.js
// this file based on https://expressjs.com/en/guide/writing-middleware.html
// idea based on Laravel's validation paradigms

// the return value for each validator is
// the first parameter is an object that is user defined, the second is the whole request
// {
// success: true/false,
//  fieldName: name of field for validated array,
//   fieldValue: the value of the field
// }
const validators = {
	required: async ({ field }, req) => ({
		success: req.body[field] && req.body[field].length !== 0,
		fieldName: field,
		fieldValue: req.body[field],
	}),
	optional: async ({ field }, req) => ({
		success: true,
		fieldName: field,
		fieldValue: req.body[field],
	}), // this is useful so it gets appended to the validated array
	fileSize: async ({ maxSize, file }, req) => ({
		success: req[file] && req[file].buffer.length < maxSize,
		fieldName: file,
		fieldValue: req[file],
	}),
	fileType: async ({ file, types }, req) => ({
		success: req[file] && req[file].mimetype.match(types),
		fieldName: file,
		fieldValue: req[file],
	}),
	sameAs: async ({ field, otherField }, req) => ({
		success: req.body[field] === req.body[otherField],
		fieldName: field,
		fieldValue: req.body[field],
	}),
	regex: async ({ field, regex }, req) => ({
		success: regex.test(req.body[field]),
		fieldName: field,
		fieldValue: req.body[field],
	}),
	validModel: async ({ model }, req) => {
		// eslint-disable-next-line new-cap
		const instance = new model({ ...req.validated });
		let valid = true;
		try {
			await instance.validate();
		} catch (e) {
			valid = false;
		}
		return {
			success: valid,
			fieldName: 'validated',
			fieldValue: true,
		};
	},
};

const validate = (validator, params) => async (req, res, next) => {
	let result = false;
	result = await validators[validator](params, req);

	// bail if unsuccessful
	if (!result.success) {
		res.status(400); // bad request
		res.json({ success: false, error: validator });
		return;
	}

	// if there are validation results, put them in
	if (result.fieldName && result.fieldValue) {
		// the reason these are reattached
		// is so that non-validated fields don't accidentally make it into the DB
		req.validated = req.validated || [];
		req.validated[result.fieldName] = result.fieldValue;
	}
	next();
};

export default validate;
