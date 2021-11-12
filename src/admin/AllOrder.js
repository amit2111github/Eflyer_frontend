import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import Footer from '../core/Footer';
import { getAllOrder } from '../core/Orderhelper';
import { isSignedIn } from '../auth/helper/index';
import OrderCard from './OrderCard';

const AllOrder = () => {
	const { user, token } = isSignedIn();
	const [orders, setOrders] = useState([]);
	useEffect(async () => {
		const data = await getAllOrder(user._id, token);
		console.log(data);
		setOrders(data);
	}, []);
	const getAllOrders = () => {
		if (!orders || orders === undefined || orders.length === 0) return <h2>No Order has been Placed.</h2>;
		return orders.map((order) => <OrderCard order={order} key={order._id} />);
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
						{getAllOrders()}
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
};
export default AllOrder;
