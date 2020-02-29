export default {
	key: process.env.SESSION_SECRET || 'cats',
	saml: {
		entryPoint: process.env.SAML_ENTRY_POINT || 'null',
		issuer: process.env.SAML_ISSUER || 'null',
		callbackUrl: process.env.SAML_CALLBACK_URL || 'http://google.com',
		emailField: process.env.SAML_EMAIL_FIELD || 'email',
		cert: process.env.SAML_CERTIFICATE || 'false',
	},
};
