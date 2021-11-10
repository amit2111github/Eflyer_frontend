import React from 'react';
import { Link } from 'react-router-dom';
import { isSignedIn } from '../auth/helper/index';
import Base from '../core/Base';
import Footer from '../core/Footer';

function AdminDashBoard() {
	const { user } = isSignedIn();
	const { name, email, role } = user;
	const adminLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-dark text-white"> Admin Navigation</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/admin/create/category" className="nav-link text-success">
							Create Categories
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/manage/category" className="nav-link text-success font-weight-bold">
							Manage Categories
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/create/product" className="nav-link text-success font-weight-bold">
							Create Product
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/order" className="nav-link text-success">
							Manage Orders
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/manage/products" className="nav-link text-success">
							Manage Products
						</Link>
					</li>
				</ul>
			</div>
		);
	};
	const adminRightSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header">Admin Information</h4>
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
						<span className="badge badge-danger">Admin Area</span>
					</li>
				</ul>
			</div>
		);
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
						<div className="row">
							<div className="col-3">{adminLeftSide()}</div>
							<div className="col-9">{adminRightSide()}</div>
						</div>
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
}
export default AdminDashBoard;
