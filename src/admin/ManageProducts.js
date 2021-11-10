import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isSignedIn } from '../auth/helper';
import { getProducts, deleteProduct } from './helper/adminapicall';
import Footer from '../core/Footer';

const ManageProducts = () => {
	const { user, token } = isSignedIn();
	const [products, setProducts] = useState([]);
	const [error, setError] = useState();
	const [success, setSuccess] = useState();
	const [loading, setLoading] = useState();
	const [deletedProduct, setDeletedProduct] = useState();

	async function preload() {
		try {
			const res = await getProducts();
			if (res.error) {
				console.log(res.error);
			} else {
				setProducts(res);
				console.log(products);
				console.log(res);
			}
		} catch (err) {
			console.log(err);
		}
	}
	const handleClick = async (event, productId) => {
		try {
			setLoading('Deleting...');
			const res = await deleteProduct(productId, user._id, token);
			setLoading('');
			if (res.error) {
				console.log(res.error);
			} else {
				console.log(res);
				setSuccess(res);
				setDeletedProduct(res.name);
				preload();
			}
		} catch (err) {
			console.log(err);
		}
	};
	const errorMessage = () => (
		<div className="alert alert-warning mt-3">
			<h4>{error}</h4>
		</div>
	);
	const successMessage = () => {
		return (
			<div className="alert alert-success mt-3">
				<h4>{deletedProduct} is Deleted Successfully</h4>
			</div>
		);
	};
	useEffect(preload, []);
	return (
		<>
			<div className="fashion_section">
				<Base />
				<div className="logo_section mb-2">
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
						<h3 className="fashion_taital mb-2">Manage products</h3>
						<Link className="btn btn-dark rounded" to="/admin/dashboard">
							<span className="text-white">Admin Home</span>
						</Link>
						<div className="row">
							<div className="col-12">
								{loading && (
									<div className="alert alert-info messages mt-3 text-success">
										<h2>Deleting...</h2>
									</div>
								)}
								{error && errorMessage()}
								{success && successMessage()}
								{products && products.length > 0 ? (
									<>
										<h2 className="text-center text-white my-3">
											Total {products.length} Products
										</h2>
										<div className=" border border-dark rounded p-3">
											{products &&
												products.map((product, index) => (
													<div key={index} className="row text-center mb-2">
														<div className="col-4">
															<h3 className="text-danger text-left">{product.name}</h3>
														</div>
														<div className="col-4">
															<Link
																className="btn btn-success rounded"
																to={`/admin/products/update/${product._id}`}
															>
																<span className="">Update</span>
															</Link>
														</div>
														<div className="col-4">
															<button
																onClick={(event) => handleClick(event, product._id)}
																className="btn btn-danger rounded"
															>
																Delete
															</button>
														</div>
													</div>
												))}
										</div>
									</>
								) : (
									<h2 className="text-center text-white my-3">No Products Available</h2>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
export default ManageProducts;
