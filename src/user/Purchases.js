import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { isSignedIn } from '../auth/helper/index';
import { getPurchaseList } from '../core/Orderhelper';
import PurchaseCard from './PurchaseCard';
import Footer from '../core/Footer';

const Purchases = () => {
	const [userOrder, setUserOrder] = useState([]);
	const { user, token } = isSignedIn();
	const preload = async (userId, token) => {
		const data = await getPurchaseList(userId, token);
		setUserOrder(data);
	};
	useEffect(() => {
		preload(user._id, token);
	}, []);
	const getAllPurchaseList = () => {
		if (userOrder === undefined || userOrder.length === 0) return <h2>You have not made any Purchase till now</h2>;
		return userOrder.map((order) => <PurchaseCard order={order} key={order._id} />);
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
						{getAllPurchaseList()}
					</div>
					{/* logo ends here */}
				</div>
			</div>
			<Footer />
		</>
	);
};
export default Purchases;
