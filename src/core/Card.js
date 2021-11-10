import React, { useState, useEffect } from 'react';
import Imagehelper from './Imagehelper';
import '../css/cardStyle.css';
const Card = ({
	product,
	addToCart = true,
	removeFromCart = false,
	handleRemove,
	handleAdd,
	hanldeDecreaseQuantity,
	hanldeIncreseQuantity,
}) => {
	const count = product.count;
	const cardName = product ? product.name : 'Product';
	const cardPrice = product ? product.price : '10';
	const cardDescription = product ? product.description : 'A nice product';
	const [image, setImage] = useState();
	useEffect(async () => {
		const data = await Imagehelper(product.link);
		setImage(data.url);
	}, []);
	return (
		<div className="box_main">
			<h4 className="shirt_text">{cardName}</h4>
			<p className="price_text">
				Price <span style={{ color: '#262626' }}>Rs {cardPrice}</span>
			</p>
			<div className="mt-2">
				<p className="cardDesc">{cardDescription}</p>
			</div>

			<div className="tshirt_img">
				<img src={image} style={{ maxHeight: '100%', maxWidth: '100%' }} />
			</div>
			{removeFromCart && (
				<div style={{ width: '500px' }}>
					<button
						type="submit"
						className="increment"
						onClick={(event) => hanldeIncreseQuantity(event, product)}
					>
						+
					</button>
					<span className="shirt_text">Quantity {count}</span>
					<button className="decrement" onClick={(event) => hanldeDecreaseQuantity(event, product)}>
						-
					</button>
				</div>
			)}
			<div classNameName="btn_main">
				{addToCart && (
					<div class="addtoCart">
						<a onClick={(event) => handleAdd(event, product)}>Add to Cart</a>
					</div>
				)}

				{removeFromCart && (
					<div class="addtoCart">
						<a onClick={(event) => handleRemove(event, product)}>Remove from Cart</a>
					</div>
				)}
			</div>

			<div className="btn_main"></div>
		</div>
	);
};
export default Card;
