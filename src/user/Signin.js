import React, { useState } from 'react';
import Base from '../core/Base';
import { Redirect } from 'react-router-dom';
import SigninForm from './signinForm';
import { signin, authenticate, isSignedIn } from '../auth/helper/index';
import Footer from '../core/Footer';
function Signin({ history }) {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		success: false,
		didRedirect: false,
	});
	const { success, email, password, error, loading, didRedirect } = values;
	const { user } = isSignedIn();
	// do redirection
	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else if (user && user.role === 0) {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isSignedIn()) {
			return <Redirect to="/" />;
		}
	};
	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			if (email === '' || password === '') {
				setValues({
					...values,
					error: password ? 'Email is required' : 'Password is required',
					loading: false,
				});
				return;
			}
			setValues({ ...values, error: false, loading: true });
			const res = await signin({ email, password });
			if (res.error || res.errors) {
				setValues({ ...values, error: res.error || res.errors[0].msg, loading: false });
			} else {
				authenticate(res, () => {
					setValues({ ...values, email: '', password: '', error: '', success: true, didRedirect: true });
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
	const successMessage = () => {
		return (
			success && (
				<div className="alert alert-success messages">
					<h2>Signin Successfully</h2>
				</div>
			)
		);
	};
	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-success messages">
					<h2>Processing...</h2>
				</div>
			)
		);
	};
	const errorMessage = () =>
		error && (
			<div className="alert alert-warning messages">
				<h4>{error}</h4>
			</div>
		);
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
						<p className="messages font-weight-normal">Welcome Back</p>
						{loadingMessage()}
						{successMessage()}
						{errorMessage()}

						<SigninForm handleChange={handleChange} fields={values} handleSubmit={handleSubmit} />
						{performRedirect()}
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
}
export default Signin;
