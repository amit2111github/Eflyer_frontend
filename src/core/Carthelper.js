export const addItemToCart = (item) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		let flag = false;
		cart.forEach((pro) => {
			if (pro._id == item._id) {
				pro.count = pro.count + 1;
				flag = true;
				console.log('found u');
			}
		});
		if (!flag) {
			cart.push({ ...item, count: 1 });
		}
		console.log('new cart', cart);
		localStorage.setItem('cart', JSON.stringify(cart));
	}
};

export const showCart = () => {
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			console.log('in');
			return JSON.parse(localStorage.getItem('cart'));
		}
	}
	return null;
};

export const removeFromCart = (product) => {
	console.log('here');
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			cart.map((pro, id) => {
				if (pro._id == product._id) cart.splice(id, 1);
			});
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	}
};
export const incrementQty = (product) => {
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			cart = cart.map((pro) => {
				if (pro._id === product._id) {
					pro.count = pro.count + 1;
				}
				return pro;
			});
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	}
};
export const decreaseQty = (product) => {
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			cart.map((pro, id) => {
				if (pro._id === product._id && pro.count >= 1) {
					pro.count = pro.count - 1;
				}
				if (pro.count == 0) cart.splice(id, 1);
			});
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	}
};

export const emptyCart = () => {
	console.log('in');
	if (typeof window !== undefined) {
		localStorage.removeItem('cart');
		localStorage.setItem('cart', JSON.stringify([]));
	}
};
