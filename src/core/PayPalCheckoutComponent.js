import React, { useState, useEffect } from 'react';
import { API } from '../backend';
import { isSignedIn } from '../auth/helper/index';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './Carthelper';
import { getToken, makePayment } from './paypalhelper';
import { cerateOrder } from './Orderhelper';
import { useHistory } from 'react-router-dom';

const PayPalCheckoutComponent = ({ data, setData, products, setProducts }) => {
	const history = useHistory();
	const amount = products.reduce((prev, cur) => prev + cur.count * cur.price, 0);
	const { user, token } = isSignedIn();
	const [info, setInfo] = useState({
		clientToken: null,
		instance: {},
	});
	const onPay = async (event) => {
		let nonce;
		let getNonce = info.instance.requestPaymentMethod().then((response) => {
			nonce = response.nonce;
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: amount,
			};
			setData({ ...data, loading: true });
			makePayment(user._id, amount, token, nonce)
				.then((res) => res.json())
				.then(async (res) => {
					setData({ ...data, success: true, loading: false });
					console.log(res);
					const createdOrder = await cerateOrder(user._id, token, {
						products,
						amount: res.transaction.amount,
						transaction_id: res.transaction.id,
					});
					console.log(' Created Order is ', createdOrder);
					emptyCart();
					setProducts([]);
					console.log('success', res);
					// redirecting to purchase page
					setTimeout(() => {
						history.push('/purchases');
					}, 2000);
				})
				.catch((err) => {
					console.log('Failed n paymenr ', err);
					setData({ ...data, error: true, loading: false });
				});
		});
	};
	const getClientToken = async (userId, token) => {
		try {
			const data = await getToken(userId, token);
			setInfo({ ...info, clientToken: data.clientToken });
		} catch (err) {
			setInfo({ ...info, error: true });
		}
	};
	useEffect(() => {
		getClientToken(user._id, token);
	}, []);

	const showDropIn = () => {
		return (
			<div>
				{info.clientToken && products ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={(instance) => (info.instance = instance)}
						/>
						<div className="buynow_bt">
							<button onClick={onPay}>Pay with PayPal</button>
						</div>
					</div>
				) : (
					<h2 className="amountShower">Processing...</h2>
				)}
			</div>
		);
	};
	return (
		<div>
			<h1 className="amountShower">Amount to pay is Rs. {amount}</h1>
			{showDropIn()}
		</div>
	);
};
export default PayPalCheckoutComponent;
