import React from 'react';

const SigninForm = ({ handleChange, fields, handleSubmit }) => {
	const { password, email } = fields;
	return (
		<div className="row">
			<div className="col-md-6 offset-sm-3 text-left">
				<form>
					<div className="form-group">
						<label className="font-weight-bold text-xl-">Email address</label>
						<input
							required
							value={email}
							name="email"
							className="form-control"
							type="email"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label className="font-weight-bold">Password</label>
						<input
							required
							value={password}
							name="password"
							className="form-control"
							type="password"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<div className="custom-control custom-checkbox">
							<input type="checkbox" className="custom-control-input" id="customCheck1" />
							<label className="custom-control-label font-weight-bold" htmlFor="customCheck1">
								Remember me
							</label>
						</div>
					</div>
					<div class="addtoCart">
						<a onClick={handleSubmit} type="submit">
							Sign In
						</a>
					</div>
					<div className="createAccount">
						<a href="signup" className="createAccount">
							Create new Account
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SigninForm;
