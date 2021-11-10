import { API } from '../../backend';

// category calls
export const createCateory = (userId, token, categoryName) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(categoryName),
	})
		.then((res) => res.json())
		.catch((err) => err);
};
// get All categgory
export const getAllCategory = () => {
	return fetch(`${API}/category/All`, {
		method: 'get',
	})
		.then((res) => res.json())
		.catch((err) => err);
};
// update category
export const updateCategory = (categoryId, userId, token, categoryName) => {
	console.log(categoryName);
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: 'put',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ name: categoryName }),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
			return err;	
		});
};
// get a category
export const getACategory = (categoryId) => {
	return fetch(`${API}/category/${categoryId}`, {
		method: 'get',
	})
		.then((res) => res.json())
		.catch((err) => err);
};

// delete Category
export const deleteCategory = (categoryId, userId, token) => {
	console.log(categoryId, userId);
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: 'delete',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			return err;
		});
};

// create product

export const createProduct = (userId, token, product) => {
	return fetch(`${API}/tshirt/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((res) => res.json())
		.catch((err) => err);
};

//get Al products
export const getProducts = () => {
	return fetch(`${API}/tshirt/all`, {
		method: 'get',
	})
		.then((res) => res.json())
		.catch((err) => err);
};
// delete products
export const deleteProduct = (productId, userId, token) => {
	return fetch(`${API}/tshirt/${productId}/${userId}`, {
		method: 'delete',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.catch((err) => err);
};
// get one products
export const getOneProduct = (productId) => {
	return fetch(`${API}/tshirt/${productId}`, {
		method: 'get',
	})
		.then((res) => res.json())
		.catch((err) => err);
};
// update product
export const updateProduct = (userId, token, productId, product) => {
	return fetch(`${API}/tshirt/${productId}/${userId}`, {
		method: 'put',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((res) => res.json())
		.catch((err) => err);
};
