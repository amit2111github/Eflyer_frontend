import React, { useState } from 'react';
import Base from '../core/Base';
import CategoryForm from './CategoryForm';
import { Link } from 'react-router-dom';
import { createCateory } from './helper/adminapicall';
import { isSignedIn } from '../auth/helper/index';
import Footer from '../core/Footer';
const { user, token } = isSignedIn();

const AddCategory = () => {
	const [name, setName] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const successMessage = () => {
		if (success) {
			return (
				<div className="alert alert-success messages">
					<h4>Category created Successfully</h4>
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
	const handleChange = (event) => {
		setName(event.target.value);
	};
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			setError(false);
			setSuccess('');
			if (name === '') {
				setError('Name is required');
				return;
			}
			const res = await createCateory(user._id, token, { name });
			if (res.error) {
				setError(res.error);
				setSuccess(false);
			} else {
				console.log(res);
				setError(false);
				setSuccess(true);
			}
			setName('');
		} catch (err) {
			console.log(err);
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
						<Link className="btn btn-md btn-dark rounded mb-3" to="/admin/dashboard">
							Admin Home
						</Link>	
						{errorMessage()}
						{successMessage()}
						<CategoryForm name={name} handleChange={handleChange} handleSubmit={handleSubmit} />
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
};
export default AddCategory;
