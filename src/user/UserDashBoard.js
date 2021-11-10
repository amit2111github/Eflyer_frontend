import React from 'react';
import { Link } from 'react-router-dom';
import { isSignedIn } from '../auth/helper/index';
import Base from '../core/Base';
import Footer from '../core/Footer';
function UserDashBoard() {
	const { user } = isSignedIn();
	const { name, email } = user;
	const userLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-dark text-white"> User Navigation</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/" className="nav-link text-success">
							Purchase Product
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/user/dashboard" className="nav-link text-success">
							Check Profile
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/cart" className="nav-link text-success">
							Create Order
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/purchases" className="nav-link text-success">
							Orders
						</Link>
					</li>
				</ul>
			</div>
		);
	};
	const userRightSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header">User Information</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Name :</span>
						{name}
					</li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Email :</span>
						{email}
					</li>
					<li className="list-group-item">
						<span className="badge badge-danger">User Area</span>
					</li>
				</ul>
			</div>
		);
	};
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
						<div className="row">
							<div className="col-3">{userLeftSide()}</div>
							<div className="col-9">{userRightSide()}</div>
						</div>
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
}
export default UserDashBoard;
