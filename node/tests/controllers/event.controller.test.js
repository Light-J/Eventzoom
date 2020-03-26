import request from 'supertest';
import index from '../../src/root';
import eventService from '../../src/services/event.service';
import fileService from '../../src/services/file.service';
import getValidJwt from './getValidJwt';
import cacheService from '../../src/services/cache.service';
import authorizationService from '../../src/services/authorization.service';
import zoomService from '../../src/services/zoom.service';
import stripeService from '../../src/services/stripe.service';
// this horrific line mocks the validator middleware, and makes it skip everything
jest.mock('../../src/middleware/isAllowedToView', () => jest.fn().mockImplementation(() => async (req, res, next) => { next(); }));
jest.mock('../../src/middleware/isOwner', () => jest.fn().mockImplementation(() => async (req, res, next) => { next(); }));
jest.mock('../../src/middleware/isStaff', () => jest.fn().mockImplementation((req, res, next) => next()));
jest.mock('../../src/middleware/isValidPayment', () => jest.fn().mockImplementation((req, res, next) => next()));
jest.mock('../../src/middleware/isValidAttendance', () => jest.fn().mockImplementation((req, res, next) => next()));
jest.mock('../../src/middleware/isEventPaid', () => jest.fn().mockImplementation(() => async (req, res, next) => { next(); }));
jest.mock('../../src/middleware/hasZoomIfRemote', () => jest.fn().mockImplementation((req, res, next) => { next(); }));

jest.mock('../../src/services/authorization.service');
jest.mock('../../src/services/event.service');
jest.mock('../../src/services/file.service');


authorizationService.filterInaccessible = jest.fn().mockImplementation((events) => events);
authorizationService.canAccessResource = jest.fn().mockImplementation(() => true);


describe('testing GET /:id/payment-intent/', () => {
	it('should call service and return', async () => {
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ price: 69 }));
		stripeService.generatePaymentIntent = jest.fn().mockImplementation(() => ({ client_secret: 'benis' }));
		const res = await request(index.app)
			.get('/events/5/payment-intent')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send();
		await expect(res.body).toEqual({ secret: 'benis' });
	});
});


describe('testing POST /:id/payment-intent/', () => {
	it('should call service and return', async () => {
		eventService.attendEvent = jest.fn().mockImplementation(async () => true);
		stripeService.refund = jest.fn();
		const res = await request(index.app)
			.post('/events/5/attend-paid')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send({
				intent: '69',
			});
		expect(stripeService.refund.mock.calls.length).toEqual(0);
		await expect(res.body).toEqual({ success: true });
	});
	it('should call service and reufnd if it returns false', async () => {
		eventService.attendEvent = jest.fn().mockImplementation(async () => false);
		stripeService.refund = jest.fn();
		const res = await request(index.app)
			.post('/events/5/attend-paid')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send({
				intent: '69',
			});
		expect(stripeService.refund.mock.calls.length).toEqual(1);
		await expect(res.body).toEqual({ success: false });
	});
});


describe('testing GET events/', () => {
	it('should fetch all event', async () => {
		eventService.getEvents = jest.fn().mockImplementation(async () => ['example1', 'example2']);
		const res = await request(index.app)
			.get('/events/?sort=date&direction=asc')
			.send();
		await expect(res.body).toEqual(['example1', 'example2']);
		return expect(eventService.getEvents.mock.calls[0]).toEqual([undefined, 'date', 'asc']);
	});
	it('should fail if service returns error', async () => {
		eventService.getEvents = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events/?sort=date&direction=asc')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		return expect(eventService.getEvents.mock.calls[0]).toEqual([undefined, 'date', 'asc']);
	});
	it('should fetch an event with query param', async () => {
		eventService.getEvents = jest.fn().mockImplementation(async () => ['example1', 'example2']);
		const res = await request(index.app)
			.get('/events/?query=example&sort=date&direction=asc')
			.send();
		await expect(res.body).toEqual(['example1', 'example2']);
		return expect(eventService.getEvents.mock.calls[0]).toEqual(['example', 'date', 'asc']);
	});
});

describe('testing events/advanced', () => {
	it('should fetch an event', async () => {
		eventService.getEventsAdvanced = jest.fn().mockImplementation(async () => ['example1']);
		const res = await request(index.app)
			.get('/events/advanced?title=test&sort=date&direction=asc')
			.send();
		return expect(res.body).toEqual(['example1']);
	});
	it('should fail if service returns error', async () => {
		eventService.getEventsAdvanced = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events/advanced?sort=date&direction=asc')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		await expect(eventService.getEventsAdvanced.mock.calls[0][1]).toEqual('date');
		return expect(eventService.getEventsAdvanced.mock.calls[0][2]).toEqual('asc');
	});
});


describe('testing events/1', () => {
	it('should fetch successfully', async () => {
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		const res = await request(index.app)
			.get('/events/1')
			.send();
		await expect(res.body).toEqual({ test: 'test' });
		return expect(eventService.getEventById.mock.calls[0]).toEqual(['1']);
	});
	it('should fail if service returns error', async () => {
		eventService.getEventById = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events/1')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		return expect(eventService.getEventById.mock.calls[0]).toEqual(['1']);
	});
});

describe(' testing POST events/', () => {
	it('should call service and return success true', async () => {
		jest.setTimeout(2000);
		eventService.addEvent = jest.fn().mockImplementation(async () => ({ something: true }));
		zoomService.createMeeting = jest.fn().mockImplementation(() => 'test123');
		fileService.uploadFile = jest.fn().mockImplementation(async () => ('http://google.com'));
		authorizationService.generateFilterableField = jest.fn().mockImplementation(() => false);
		const date = new Date(2019, 1, 1);
		const res = await request(index.app)
			.post('/events')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.attach('file', `${__dirname}/image.png`)
			.field('title', 'Cats')
			.field('description', 'Cats')
			.field('speaker', 'speaker')
			.field('vagueLocation', 'Location')
			.field('specificLocation', 'Location')
			.field('disabilityAccess', '1')
			.field('remoteEvent', '1')
			.field('organiser', 'John')
			.field('capacity', 2)
			.field('price', 0)
			.field('series', '5e595ce2d8118f0888f56150')
			.field('date', date.toString());
		await expect(res.body).toEqual({ success: true });
		// remove date from check to deal with timezone fuckaroo
		eventService.addEvent.mock.calls[0][0].date = 'excluded';
		await expect(eventService.addEvent.mock.calls[0]).toMatchSnapshot();
		await expect(zoomService.createMeeting.mock.calls.length).toEqual(1);
		return expect(fileService.uploadFile.mock.calls[0]).toMatchSnapshot();
	});
});

describe('testing events/id/attend', () => {
	it('should call the attend controller successfully', async () => {
		eventService.attendEvent = jest.fn().mockImplementation(async () => ({}));
		const res = await request(index.app)
			.post('/events/123/attend')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send({ attend: true });
		await expect(res.body.success).toEqual(true);
		return expect(eventService.attendEvent.mock.calls.length).toEqual(1);
	});
	it('should call the attend controller and expect to fail', async () => {
		eventService.attendEvent = jest.fn().mockImplementation(async () => ({}));
		const res = await request(index.app)
			.post('/events/123/attend')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send({});
		await expect(res.body.success).toEqual(false);
		return expect(eventService.attendEvent.mock.calls.length).toEqual(0);
	});
});

describe('testing events/id/user-attending', () => {
	it('should call the attend controller successfully', async () => {
		eventService.userAttending = jest.fn().mockImplementation(async () => true);
		const res = await request(index.app)
			.get('/events/123/user-attending')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send();
		await expect(res.body).toEqual(true);
		return expect(eventService.userAttending.mock.calls.length).toEqual(1);
	});
});

describe('testing events/id/recommendations', () => {
	it('should call the controller successfully', async () => {
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		eventService.getRecommendationsForEvent = jest.fn().mockImplementation(async () => 'results');
		cacheService.remember = jest.fn().mockImplementation(async (a, b, c) => c());
		const res = await request(index.app)
			.get('/events/123/recommendations')
			.send();
		await expect(res.body).toEqual({});
		return expect(eventService.getRecommendationsForEvent.mock.calls.length).toEqual(1);
	});
});

describe('testing events/id/attendees', () => {
	it('should call the controller successfully', async () => {
		eventService.getEventsAttendeesById = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		const res = await request(index.app)
			.get('/events/123/attendees')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send();
		await expect(res.body).toEqual({ test: 'test' });
		return expect(eventService.getEventsAttendeesById.mock.calls.length).toEqual(1);
	});
	it('should fail the call successfully no user', async () => {
		eventService.getEventsAttendeesById = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		const res = await request(index.app)
			.get('/events/123/attendees')
			.send();
		await expect(res.body).toEqual({});
		return expect(eventService.getEventsAttendeesById.mock.calls.length).toEqual(0);
	});
});

describe('testing /events/id/attachments', () => {
	it('should send post to the controller successfully', async () => {
		fileService.uploadFile = jest.fn().mockImplementation(async () => ('http://google.com'));
		eventService.addAttachmentToEvent = jest.fn().mockImplementation(async () => ({ _id: 123 }));
		const res = await request(index.app)
			.post('/events/123/attachments')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.attach('file', `${__dirname}/image.png`)
			.field('filename', 'filename');
		await expect(res.body).toEqual({ _id: 123 });
		return expect(eventService.addAttachmentToEvent.mock.calls.length).toEqual(1);
	});
	it('should send delete to controller successfully', async () => {
		eventService.removeAttachmentFromEvent = jest.fn().mockImplementation(async () => true);
		const res = await request(index.app)
			.delete('/events/123/attachments/123')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send();
		await expect(res.body).toEqual(true);
		return expect(eventService.removeAttachmentFromEvent.mock.calls.length).toEqual(1);
	});
});


describe('testing PUT events/id/', () => {
	it('should call the controller successfully', async () => {
		eventService.updateEvent = jest.fn();
		eventService.sendUpdateEmail = jest.fn();
		const res = await request(index.app)
			.put('/events/123')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.send({
				sendUpdateEmail: true,
				title: '123',
				description: '123',
				speaker: '123',
				vagueLocation: '123',
				specificLocation: '123',
				disabilityAccess: true,
				series: '5e595ce2d8118f0888f56150',
				capacity: 69,
				remoteEvent: false,
				date: new Date().toString(),

			});
		await expect(res.body).toEqual({ success: true });
		await expect(eventService.updateEvent.mock.calls.length).toEqual(1);
		return expect(eventService.sendUpdateEmail.mock.calls.length).toEqual(1);
	});
});
