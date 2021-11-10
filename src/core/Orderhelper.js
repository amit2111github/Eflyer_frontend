import { API } from '../backend';
export const cerateOrder = async (userId, token, OrderData) => {
	try {
		return fetch(`${API}/order/create/${userId}`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				order: OrderData,
			}),
		}).then((res) => res.json());
	} catch (err) {
		console.log(err);
	}
};
export const getImageOfProductForList = (tshirtId, token, userId) => {
	return fetch(`${API}/tshirt/getImageById/${tshirtId}/${userId}`, {
		method: 'get',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const getAllOrder = (userId, token) => {
	return fetch(`${API}/order/all/${userId}`, {
		method: 'get',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const getPurchaseList = (userId, token) => {
	return fetch(`${API}/users/order/${userId}`, {
		method: 'get',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};
