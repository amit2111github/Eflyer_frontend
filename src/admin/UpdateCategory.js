import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import UpdateCategoryForm from './UpdateCategoryForm';
import { getACategory, updateCategory } from './helper/adminapicall';
import { Link, useParams } from 'react-router-dom';
import { isSignedIn } from '../auth/helper';
import Footer from '../core/Footer';

const UpdateCategory = () => {
	const { user, token } = isSignedIn();
	const [name, setName] = useState();
	const [loading, setLoading] = useState();
	const { categoryId } = useParams();
	const handleChange = (event) => {
		setName(event.target.value);
	};
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [updatedCategory, setUpdatedCategory] = useState();
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setLoading('Loading...');
			const res = await updateCategory(categoryId, user._id, token, name);
			setLoading('');
			if (res.error) {
				setError(res.error.codeName);
			} else {
				setSuccess(true);
				setUpdatedCategory(res.category.name);
			}
			await preload();
		} catch (err) {
			setError(err);
		}
	};
	const preload = async () => {
		try {
			const res = await getACategory(categoryId);
			if (res.error) {
				setError(res.error);
			} else {
				setName(res.name);
			}
		} catch (err) {
			setError(err);
		}
	};
	useEffect(() => {
		preload();
	}, []);
	const successMessage = () => {
		if (success) {
			return (
				<div className="alert alert-success messages">
					<h4>Category updated to {updatedCategory} Successfully</h4>
				</div>
			);
		}
	};
	const errorMessage = () => {
		if (error) {
			return (
				<div className="alert alert-warning messages text-danger">
					<h4>{error}</h4>
				</div>
			);
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

						{loading && (
							<div className="alert alert-info  mt-3">
								<h2>{loading}</h2>
							</div>
						)}
						{errorMessage()}
						{successMessage()}
						<UpdateCategoryForm name={name} handleChange={handleChange} handleSubmit={handleSubmit} />
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
};
export default UpdateCategory;
