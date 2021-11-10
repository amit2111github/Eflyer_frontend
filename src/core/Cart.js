import React, { useState, useEffect } from 'react';
import { API } from '../backend';
import '../index.css';
import Base from './Base';
import Card from './Card';
import Footer from './Footer';
import { getProducts } from '../admin/helper/adminapicall';
import { addItemToCart, showCart, removeFromCart, decreaseQty, incrementQty } from './Carthelper';
import StripeCheckoutComponent from './StripeCheckout';
import PayPalCheckoutComponent from './PayPalCheckoutComponent';
import { isSignedIn } from '../auth/helper';
import { Link } from 'react-router-dom';

function Cart({ history }) {
	const myRef = React.createRef('');
	const [data, setData] = useState({
		loading: '',
		success: '',
		error: '',
		address: '',
	});
	const [showStripe, setShowStripe] = useState('');
	const [showPayPal, setShowPayPal] = useState('');
	const [products, setProducts] = useState([]);
	const [paymentMethod, setPaymentMethod] = useState('stripe');
	useEffect(async () => {
		const data = await showCart();
		setProducts(data);
	}, []);
	const hanldeIncreseQuantity = (event, product) => {
		incrementQty(product);
		setProducts(showCart());
	};
	const hanldeDecreaseQuantity = (event, product) => {
		decreaseQty(product);
		setProducts(showCart());
	};
	// handle remove product
	const loadingMessage = () => {
		return (
			<div className="alert alert-success fashion_taital">
				<h4>Processing...</h4>
			</div>
		);
	};

	const successMessage = () => {
		return (
			<div className="alert alert-success fashion_taital">
				<h4>Payment is Done Successfully</h4>
			</div>
		);
	};
	const errorMessage = () => {
		return (
			<div className="alert alert-success fashion_taital">
				<h4>Oops! Payment Failed</h4>
			</div>
		);
	};
	const handleClick = async (event, product) => {
		event.preventDefault();
		await removeFromCart(product);
		await setProducts(showCart());
		if (localStorage.getItem('cart') === null) {
			setProducts([]);
			setTimeout(() => {
				history.push('/');
			}, 1000);
		}
	};
	const loadProduct = () => (
		<div className="col-lg-5 ml-4">
			<h1 className="fashion_taital">Cart Items</h1>
			{/* <h1>Cart Items</h1> */}
			{products &&
				products.map((p) => {
					return (
						<Card
							key={p._id}
							product={p}
							addToCart={false}
							removeFromCart={true}
							handleRemove={handleClick}
							hanldeDecreaseQuantity={hanldeDecreaseQuantity}
							hanldeIncreseQuantity={hanldeIncreseQuantity}
						/>
					);
				})}
		</div>
	);
	const loadCheckout = () => (
		<div>
			<h2>This section for Checkout</h2>
		</div>
	);
	const showPaymentSelected = (event) => {
		event.preventDefault();
		console.log('INside');
		if (paymentMethod === 'stripe') {
			setShowStripe(true);
			setShowPayPal(false);
		} else {
			setShowStripe(false);
			setShowPayPal(true);
		}
	};
	return (
		<>
			<div className="fashion_section">
				<Base></Base>
				<div className="logo_section mb-2">
					{/* // logo section */}
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<div className="logo">
									<a>
										<img
											style={{ maxwidth: '100%' }}
											src="https://res.cloudinary.com/dnd5dhyzv/image/upload/v1636368072/Logo/logo_wmff3n.png"
										/>
									</a>
								</div>
							</div>
						</div>
					</div>
					{/* logo ends here */}
				</div>
				<div className="fashion_section_2">
					<div className="row">
						{products && products.length > 0 ? (
							loadProduct()
						) : (
							<h1 className="fashion_taital">Your Cart is Empty</h1>
						)}

						{!isSignedIn() && (
							<>
								<div className="buynow_bt">
									<a href="/signin">Sign In</a>
								</div>
							</>
						)}
						{isSignedIn() && products && products.length > 0 && (
							<div className="col-lg-5 ml-3">
								{data.success && successMessage()}
								{data.error && errorMessage()}
								{data.loading && loadingMessage()}
								<h1 className="selectPaymentMethod">Select A Payment Method</h1>
								<select
									className="form-control"
									value={paymentMethod}
									onChange={(event) => {
										console.log(event.target.value);
										setPaymentMethod(event.target.value);
									}}
								>
									<option value="stripe">Stripe</option>
									<option value="paypal">PayPal</option>
								</select>

								<div className="buynow_bt">
									<a ref={myRef} onClick={showPaymentSelected}>
										Proceed to Pay
									</a>
									<hr />
								</div>
								{showStripe && isSignedIn() && (
									<StripeCheckoutComponent
										ref={myRef}
										data={data}
										setData={setData}
										products={products}
										setProducts={setProducts}
									/>
								)}
								{showPayPal && isSignedIn() && (
									<PayPalCheckoutComponent
										data={data}
										setData={setData}
										products={products}
										setProducts={setProducts}
									/>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
export default Cart;

{
	/* <div class="form-group col-6 mt-2">
	{data.success && successMessage()}
	{data.error && errorMessage()}
	{data.loading && loadingMessage()}
	{!isSignedIn() && (
		<Link className="btn btn-warning rounded" to="/signin">
			Signin
		</Link>
	)}
	{isSignedIn() && (
		<>
			<label for="exampleFormControlSelect1">Select A Payment Method</label>
			<select
				class="form-control"
				id="exampleFormControlSelect1"
				value={paymentMethod}
				onChange={(event) => {
					console.log(event.target.value);
					setPaymentMethod(event.target.value);
				}}
			>
				<option value="stripe">Stripe</option>
				<option value="paypal">PayPal</option>
			</select>
			<button ref={myRef} className="mt-2 btn btn-success btn-md rounded" onClick={showPaymentSelected}>
				Proceed to Pay
			</button>
		</>
	)}

	{showStripe &&
		isSignedIn()(
			<StripeCheckoutComponent
				ref={myRef}
				data={data}
				setData={setData}
				products={products}
				setProducts={setProducts}
			/>
		)}
	{showPayPal &&
		isSignedIn()(
			<PayPalCheckoutComponent data={data} setData={setData} products={products} setProducts={setProducts} />
		)}
</div>; */
}
