import stripe from 'stripe';

const stripeInstance = stripe('sk_test_4SxMLKjI5o0fnnDERCUkwssh00gObh24F7'); // TODO: config me

const generatePaymentIntent = async (amount, metadata) => stripeInstance.paymentIntents.create({
	amount,
	currency: 'gbp', // TODO: config me
	payment_method_types: ['card'],
	metadata,
});

const validatePayment = async (intent, event, user) => {
	const retrievedIntent = await stripeInstance.paymentIntents.retrieve(intent);
	return retrievedIntent.status === 'succeeded'
        && retrievedIntent.metadata.event === event._id.toString()
        && retrievedIntent.metadata.user === user._id.toString();
};

const refund = async (intent) => {
	return stripeInstance.refunds.create({ payment_intent: intent });
};
export default { generatePaymentIntent, validatePayment, refund };
