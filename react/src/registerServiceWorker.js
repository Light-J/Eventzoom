import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
	register(`${process.env.PUBLIC_URL}/service-worker.js`, {
		registrationOptions: { scope: './' },
	});
}
