import React, { useState, useEffect } from 'react';
import { isSignedIn } from '../auth/helper/index';
import { emptyCart } from './Carthelper';
import { Link } from 'react-router-dom';
import StripeCard from './StripeCard';

const StripeCheckoutComponent = React.forwardRef((props, ref) => {
	const { products, setProducts, data, setData } = props;
	const { user, token } = isSignedIn();
	const getTotal = () => {
		return products.reduce((prev, cur) => prev + cur.count * cur.price, 0);
	};
	return (
		<div className="mb-3">
			<h1 className="amountShower">Amount to pay is Rs. {getTotal()}</h1>
			<StripeCard
				ref={ref}
				product={products}
				amount={getTotal()}
				setMessage={setData}
				setProducts={setProducts}
			/>
		</div>
	);
});
export default StripeCheckoutComponent;
