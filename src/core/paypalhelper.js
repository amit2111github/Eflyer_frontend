import { API } from '../backend';
export const getToken = async (userId, token) => {
	try {
		const result = await fetch(`${API}/paypal/client_token/${userId}`, {
			method: 'get',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return result.json();
	} catch (err) {
		console.log('here', err);
		return err;
	}
};
export const makePayment = async (userId, amount, token, nonce) => {
	try {
		const result = await fetch(`${API}/paypal/makePayment/${userId}`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				payment_method_nonce: nonce,
				amount,
			}),
		});
		return result;
	} catch (err) {
		console.log(err);
	}
};
