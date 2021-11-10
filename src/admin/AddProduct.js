import React, { useState, useEffect, useRef } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import ProductForm from './ProductForm';
import { getAllCategory, createProduct } from './helper/adminapicall';
import { isSignedIn } from '../auth/helper/index';
import Footer from '../core/Footer';
const myRef = React.createRef();
const AddProduct = ({ history }) => {
	const { user, token } = isSignedIn();
	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		photo: '',
		categories: [],
		category: '',
		loading: false,
		error: '',
		success: '',
		createdProduct: '',
		getRedirect: '',
	});
	const {
		name,
		description,
		price,
		stock,
		photo,
		categories,
		category,
		loading,
		error,
		success,
		createdProduct,
		getRedirect,
	} = values;
	const preload = async () => {
		try {
			const res = await getAllCategory();
			if (res.error) {
				setValues({ ...values, error: res.error });
			} else {
				setValues({ ...values, categories: res });
				console.log(categories);
			}
		} catch (err) {
			setValues({ ...values, error: err });
		}
	};
	useEffect(() => {
		preload();
	}, []);

	const performRedirect = () => {
		if (getRedirect) {
			setTimeout(() => {
				history.push('/admin/dashboard');
			}, 2000);
		}
	};
	const handleChange = (event) => {
		if (event.target.name === 'photo') {
			setValues({ ...values, photo: event.target.files[0] });
			return;
		}
		setValues({ ...values, [event.target.name]: event.target.value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			myRef.current.disabled = true;
			setValues({ ...values, error: '', loading: 'Loading...' });
			const formdata = new FormData();
			formdata.append('name', name);
			formdata.append('description', description);
			formdata.append('price', price);
			formdata.append('category', category);
			formdata.append('stock', stock);
			formdata.append('photo', photo);

			const res = await createProduct(user._id, token, formdata);
			myRef.current.disabled = false;
			if (res.error) {
				setValues({ ...values, error: res.error, success: false, loading: false });
			} else {
				setValues({
					...values,
					name: '',
					description: '',
					price: '',
					photo: '',
					stock: '',
					error: '',
					success: true,
					loading: false,
					createdProduct: res.name,
					getRedirect: true,
				});
			}
		} catch (err) {
			setValues({ ...values, error: err, success: false, loading: false });
			console.log(err);
		}
	};
	const errorMessage = () => (
		<div className="alert alert-warning messages text-danger" style={{ display: error ? '' : 'none' }}>
			<h4>{error}</h4>
		</div>
	);
	const successMessage = () => (
		<div className="alert alert-success messages text-success" style={{ display: success ? '' : 'none' }}>
			<h3>{createdProduct}is created</h3>
		</div>
	);
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

						{loading && (
							<div className="alert alert-success messages text-infoF">
								<h2>Loading...</h2>
							</div>
						)}
						{successMessage()}
						{errorMessage()}
						<ProductForm
							values={values}
							ref={myRef}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
						/>

						{performRedirect()}
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
};
export default AddProduct;
