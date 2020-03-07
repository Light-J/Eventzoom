export default {
	key: process.env.SESSION_SECRET || 'cats',
	saml: {
		entryPoint: process.env.SAML_ENTRY_POINT || 'null',
		issuer: process.env.SAML_ISSUER || 'null',
		callbackUrl: process.env.SAML_CALLBACK_URL || 'http://google.com',
		emailField: process.env.SAML_EMAIL_FIELD || 'email',
		nameField: process.env.SAML_NAME_FIELD || 'name',
		schoolField: process.env.SAML_SCHOOL_FIELD || 'school',
		typeField: process.env.SAML_TYPE_FIELD || 'type',
		cert: process.env.SAML_CERTIFICATE || 'false',
	},
};
