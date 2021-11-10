import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { getOneProduct } from '../admin/helper/adminapicall';
import { API } from '../backend';
import { isSignedIn } from '../auth/helper/index';
import { emptyCart } from './Carthelper';
import { cerateOrder } from './Orderhelper';
import { useHistory } from 'react-router-dom';
const STRIPE_KEY = process.env.REACT_APP_STRIPE;
const StripeCard = React.forwardRef((props, ref) => {
	const history = useHistory();
	const { product, amount, setMessage, setProducts } = props;
	const { user, token } = isSignedIn();
	const val = token;
	const makePayment = (token) => {
		setMessage((prev) => {
			// ref.current.disabled = true;
			return { ...prev, loading: true };
		});
		const body = {
			token,
			product,
			amount: amount * 100,
			description: 'A Payment for Tshirts here',
		};
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${val}`,
		};
		return fetch(`${API}/stripe/makePayment/${user._id}`, {
			method: 'post',
			headers: headers,
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then(async (res) => {
				// console.log(res);
				setMessage((prev) => {
					// ref.current.disabled = false;
					return { ...prev, error: false, success: true, loading: false };
				});
				const data = await cerateOrder(user._id, val, {
					products: product,
					amount: res.amount / 100,
					transaction_id: res.id,
				});
				// console.log('Created Order is ', data);
				emptyCart();
				setProducts([]);

				// redirecting to purchase page
				setTimeout(() => {
					history.push('/purchases');
				}, 2000);
			})
			.catch((err) => {
				setMessage((prev) => {
					return { ...prev, error: true, success: false, loading: false };
				});
				// console.log(err);
			});
	};
	return (
		<StripeCheckout
			token={makePayment}
			stripeKey={STRIPE_KEY}
			amount={amount * 100}
			name="Buy Tshirt"
			shippingAddress
			billingAddress
		>
			<div className="buynow_bt">
				<button>Pay</button>
			</div>
		</StripeCheckout>
	);
});
export default StripeCard;
