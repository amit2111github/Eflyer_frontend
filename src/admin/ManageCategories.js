import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isSignedIn } from '../auth/helper';
import { getProducts, deleteProduct, getAllCategory } from './helper/adminapicall';
import { deleteCategory } from './helper/adminapicall';
import Footer from '../core/Footer';

const ManageCategories = () => {
	const { user, token } = isSignedIn();
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState();
	const [success, setSuccess] = useState();
	const [deletedCategory, setDeletedCategory] = useState();

	const preloadCategories = async () => {
		try {
			const res = await getAllCategory();
			if (res.error) {
				setCategories([]);
				setError(res.error);
			} else {
				setCategories(res);
			}
		} catch (err) {
			setError(error);
		}
	};
	useEffect(preloadCategories, []);
	const errorMessage = () => (
		<div className="alert alert-warning messages">
			<h4>{error}</h4>
		</div>
	);
	const successMessage = () => {
		return (
			<div className="alert alert-success messages">
				<h4>Category {deletedCategory} is Deleted Successfully</h4>
			</div>
		);
	};
	const handleClick = async (event, categoryId) => {
		console.log(categoryId);
		try {
			setLoading('Deleting...');
			setSuccess('');
			setError('');
			const res = await deleteCategory(categoryId, user._id, token);
			setLoading('');
			if (res.error) {
				setError(res.error);
			} else {
				setSuccess(true);
				setDeletedCategory(res.name);
				setTimeout(preloadCategories, 2000);
				await preloadCategories();
			}
		} catch (err) {
			setError(err);
		}
	};
	return (
		<>
			<div className="fashion_section">
				<Base />
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
						<Link className="btn btn-dark rounded" to="/admin/dashboard">
							<span className="text-white">Admin Home</span>
						</Link>
						<div className="row">
							<div className="col-12">
								{loading && (
									<div className="alert alert-info messages mt-3">
										<h2>Loading...</h2>
									</div>
								)}
								{success && successMessage()}
								{error && errorMessage()}
								{categories && categories.length > 0 ? (
									<>
										<h3 className="text-center text-dark my-3">
											Total {categories.length} Categories
										</h3>
										<div className="border border-dark rounded p-2">
											{categories.map((cate, index) => (
												<div key={index} className="row text-center mb-2">
													<div className="col-4">
														<h4 className="text-danger text-left">{cate.name}</h4>
													</div>
													<div className="col-4">
														<Link
															className="btn btn-success rounded"
															to={`/admin/category/update/${cate._id}`}
														>
															<span className="">Update</span>
														</Link>
													</div>
													<div className="col-4">
														<button
															onClick={(event) => handleClick(event, cate._id)}
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
									<h3 className="text-center text-dark my-3">No category Available</h3>
								)}
							</div>
						</div>
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
};
export default ManageCategories;
