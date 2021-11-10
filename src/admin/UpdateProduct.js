import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOneProduct, getAllCategory, updateProduct } from './helper/adminapicall';
import Base from '../core/Base';
import UpdateForm from './UpdateForm';
import { isSignedIn } from '../auth/helper';
import Footer from '../core/Footer';

const myRef = React.createRef();
const UpdateProduct = ({ history }) => {
	const { productId } = useParams();
	const { user, token } = isSignedIn();
	const [product, setProduct] = useState();
	const [categories, setCategories] = useState([]);
	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		photo: '',
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
		category,
		loading,
		error,
		success,
		createdProduct,
		getRedirect,
	} = values;

	const performRedirect = () => {
		if (getRedirect) {
			setTimeout(() => {
				history.push('/admin/dashboard');
			}, 2000);
		}
	};
	const preloadInfo = async () => {
		try {
			preloadCategories();
			const res = await getOneProduct(productId);
			if (res.error) {
				console.log(res.error);
			} else {
				setValues({
					...values,
					name: res.name,
					description: res.description,
					price: res.price,
					category: res.category._id,
					stock: res.stock,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleChange = (event) => {
		if (event.target.name === 'photo') {
			setValues({ ...values, photo: event.target.files[0] });
			return;
		}
		setValues({ ...values, [event.target.name]: event.target.value });
	};
	const preloadCategories = async () => {
		try {
			const res = await getAllCategory();
			if (res.error) {
				setCategories([]);
				setValues({ ...values, error: res.error });
			} else {
				setCategories(res);
			}
		} catch (err) {
			setValues({ ...values, error: err });
		}
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log('inside');
			setValues({ ...values, loading: true, error: false, success: false });
			const formdata = new FormData();
			formdata.append('name', name);
			formdata.append('description', description);
			formdata.append('price', price);
			formdata.append('category', category);
			formdata.append('stock', stock);
			formdata.append('photo', photo);
			const res = await updateProduct(user._id, token, productId, formdata);
			setValues({ ...values, loading: false });
			if (res.error) {
				setValues({ ...values, error: res.error });
			} else {
				setValues({ ...values, success: true, getRedirect: true });
			}
		} catch (err) {
			setValues({ ...values, error: err });
		}
	};
	const errorMessage = () => (
		<div className="alert alert-danger messages text-danger" style={{ display: error ? '' : 'none' }}>
			<h4>{error}</h4>
		</div>
	);
	const successMessage = () => (
		<div className="alert alert-info messages text-success" style={{ display: success ? '' : 'none' }}>
			<h4>Product is updated</h4>
		</div>
	);

	useEffect(() => {
		preloadInfo();
	}, []);

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
						<Link className="btn btn-md btn-dark rounded mb-3" to="/admin/dashboard">
							Admin Home
						</Link>

						{loading && (
							<div className="alert alert-info messages text-success">
								<h2>Updating...</h2>
							</div>
						)}
						{successMessage()}
						{errorMessage()}
						<UpdateForm
							categories={categories}
							values={values}
							ref={myRef}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
						/>

						{performRedirect()}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
export default UpdateProduct;
{
	/* <Base title="Add a Product" description="Welcome to Product creation section" className="container bg-success p-4">
	<Link className="btn btn-md btn-success mb-3" to="/admin/dashboard">
		Admin Home
	</Link>
	<div className="row bg-dark text-white rounded">
		<div className="col-md-8 offset-md-2">
			{loading && (
				<div className="alert alert-info  mt-3">
					<h2>Updating...</h2>
				</div>
			)}
			{successMessage()}
			{errorMessage()}
			<UpdateForm
				categories={categories}
				values={values}
				ref={myRef}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			<p>
				{JSON.stringify({
					name,
					description,
					price,
					photo,
					stock,
					category,
					loading,
					error,
					success,
					getRedirect,
				})}
			</p>
			{performRedirect()}
		</div>
	</div>
</Base>; */
}
