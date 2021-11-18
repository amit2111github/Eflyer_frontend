import React, { useState, useEffect } from 'react';
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getProducts } from '../admin/helper/adminapicall';
import { addItemToCart } from './Carthelper';
import Footer from './Footer';
import '../css/cardStyle.css';
console.log(API);
function Home({ history }) {
	
	const [products, setProducts] = useState([]);
	useEffect(async () => {
		const data = await getProducts();
		setProducts(data);
	}, []);
	// handle Add to Cart
	const handleClick = (event, product) => {
		event.preventDefault();
		addItemToCart(product);
		setTimeout(() => {
			history.push('/cart');
		}, 1000);
	};

	return (
		<div className="banner_bg_main">
			<Base></Base>
			<div className="logo_section">
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
			</div>
			{/* logo SECTION */}
			<div className="banner_section layout_padding">
				<div className="container">
					<div id="my_slider" className="carousel slide" data-ride="carousel">
						<div className="carousel-inner">
							<div className="carousel-item active">
								<div className="row">
									<div className="col-sm-12">
										<h1 className="banner_taital">
											Get Start <br />
											Your favourite shoping
										</h1>
										<div className="buynow_bt">
											<a>Buy Now</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a className="carousel-control-prev" role="button" data-slide="prev">
							<i className="fa fa-angle-left"></i>
						</a>
						<a className="carousel-control-next" role="button" data-slide="next">
							<i className="fa fa-angle-right"></i>
						</a>
					</div>
				</div>
			</div>
			<div className="fashion_section">
				<div id="main_slider" className="carousel slide" data-ride="carousel">
					<div className="carousel-inner">
						<div className="carousel-item active">
							<div className="container">
								<h1 className="fashion_taital">Man & Woman Fashion</h1>
								<div className="fashion_section_2">
									<div className="row">
										{products.map((p) => {
											return (
												<div className="col-lg-4 col-sm-4">
													<Card key={p._id} product={p} handleAdd={handleClick} />
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
export default Home;
