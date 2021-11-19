import React from 'react';

const SignupForm = ({ handleChange, fields, handleSubmit }) => {
	const { name, email, password, error, success } = fields;
	return (
		<div className="row">
			<div className="col-md-6 offset-sm-3 text-left">
				<form>
					<div className="form-group">
						<label className="font-weight-bold" style={{ fontSize: '20px' }}>
							Name
						</label>
						<input className="form-control" type="text" name="name" value={name} onChange={handleChange} />
					</div>
					<div className="form-group">
						<label className="font-weight-bold" style={{ fontSize: '20px' }}>
							Email
						</label>
						<input
							className="form-control"
							type="email"
							name="email"
							value={email}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label className="font-weight-bold" style={{ fontSize: '20px' }}>
							Password
						</label>
						<input
							className="form-control"
							type="password"
							name="password"
							value={password}
							onChange={handleChange}
						/>
					</div>
					<div class="addtoCart mt-4">
						<a onClick={handleSubmit} type="submit" onClick={handleSubmit}>
							Sign Up
						</a>
					</div>
					<div className="createAccount">
						<a href="/signin" className="createAccount">
							Already have an Account
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignupForm;
