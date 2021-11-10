import React, { useState } from 'react';
import { isPhoneNumber } from 'rwa-validator';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper/index';
import SignupForm from './SignupForm';
import Footer from '../core/Footer';

function Signup({ history }) {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false,
	});
	const { name, email, password, error, success } = values;
	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			setValues({
				...values,
				error: '',
				success: '',
			});
			const res = await signup({ name, email, password });
			if (res.error || res.errors) {
				setValues({
					...values,
					name: '',
					email: '',
					password: '',
					error: res.error || res.errors[0].msg,
					success: false,
				});
			} else {
				setValues({ ...values, name: '', email: '', password: '', error: '', success: true });
				setTimeout(() => {
					history.push('/signin');
				}, 2000);
			}
		} catch (err) {
			setValues({ ...values, error: err, success: false });
		}
	};
	const successMessage = () => (
		<div className="alert alert-success messages" style={{ display: success ? '' : 'none' }}>
			<h4>New Account is created successfully.</h4>
		</div>
	);
	const errorMessage = () => (
		<div className="alert alert-warning messages" style={{ display: error ? '' : 'none' }}>
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
						<p className="messages font-weight-normal">Welcome</p>
						{successMessage()}
						{errorMessage()}
						<SignupForm handleChange={handleChange} fields={values} handleSubmit={handleSubmit} />
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
}
export default Signup;
