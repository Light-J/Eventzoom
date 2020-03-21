import React, { useState } from 'react';
import {
	Elements, CardElement, useElements, useStripe,
} from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import serverConfig from '../config/server';
import stripeConfig from '../config/stripe';
import Conditional from './Conditional';
import styles from './Pay.module.css';

const stripePromise = loadStripe(stripeConfig.url);
const commonPropTypes = {
	eventId: PropTypes.string.isRequired,
};
// this class has made itself very untestable because of the way stripe works
const Pay = (props) => {
	const stripe = useStripe();

	const elements = useElements();

	const [paymentError, setPaymentError] = useState();

	const [eventFull, setEventFull] = useState();

	const [success, setSuccess] = useState();

	const takePayment = async () => {
		const paymentIntentSecret = await axios.get(`${serverConfig.url}events/${props.eventId}/payment-intent`);
		const { error, paymentIntent } = await stripe.confirmCardPayment(
			paymentIntentSecret.data.secret,
			{
				payment_method: {
					card: elements.getElement(CardElement),
				},
			},
		);
		if (error) {
			setPaymentError(true);
			return;
		}
		const attendanceSuccess = await axios.post(`${serverConfig.url}events/${props.eventId}/attend-paid`, { intent: paymentIntent.id });
		if (!attendanceSuccess.data.success) {
			setEventFull(true);
			return;
		}
		setSuccess(true);
		// as this deals with money, we want to have live data 100% of the time.
		window.location.reload();
	};

	return <div>
		<Conditional if={paymentError}>
			<div className="alert alert-danger">
				Something when wrong while taking your payment. Please try again.
			</div>
		</Conditional>
		<Conditional if={eventFull}>
			<div className="alert alert-warning">
				We are sorry, the event is now full. You will be refunded soon.
			</div>
		</Conditional>

		<Conditional if={success}>
			<div className="alert alert-success">
				Charge successful. You can close this modal now.
			</div>
		</Conditional>
		<Conditional if={!success}>
			<CardElement className={`m-2 ${styles.bigger}`}/>
			<Conditional if={stripe && elements}>
				<button onClick={takePayment} className="btn btn-success">Pay</button>
			</Conditional>

		</Conditional>
	</div>;
};


const PayWrapper = (props) => <Elements stripe={stripePromise}>
	<Pay {...props}/>
</Elements>;
Pay.propTypes = commonPropTypes;
PayWrapper.propTypes = commonPropTypes;
export default PayWrapper;
