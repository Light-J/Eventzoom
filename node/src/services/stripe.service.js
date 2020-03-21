import stripe from 'stripe';
import stripeConfig from '../../config/stripe';

const stripeInstance = stripe('sk_test_4SxMLKjI5o0fnnDERCUkwssh00gObh24F7'); // TODO: config me

const generatePaymentIntent = async (amount, metadata) => stripeInstance.paymentIntents.create({
	amount,
	currency: stripeConfig.currency, // TODO: config me
	payment_method_types: ['card'],
	metadata,
});

const validatePayment = async (intent, event, user) => {
	const retrievedIntent = await stripeInstance.paymentIntents.retrieve(intent);
	return retrievedIntent.status === 'succeeded'
        && retrievedIntent.metadata.event === event._id.toString()
        && retrievedIntent.metadata.user === user._id.toString();
};

const refund = async (intent) => stripeInstance.refunds.create({ payment_intent: intent });
export default { generatePaymentIntent, validatePayment, refund };
