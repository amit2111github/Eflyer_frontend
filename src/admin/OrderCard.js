import React from 'react';

const OrderCard = ({ order }) => {
	return (
		<div className="card mb-2 rounded">
			<div className="card-header bg-dark text-warning">
				<div className="row">
					<div className="col-4">Username : {order?.user?.name}</div>
					<div className="col-4">Email : {order?.user?.email}</div>
					<div className="col-4">Status : {order?.status}</div>
				</div>
				<div className="row">
					<div className="col-4">Order Date : {order.createdAt.toLocaleString()}</div>
					<div className="col-4">Amount : {order.amount}</div>
					<div className="col-4">Items : {order.products.length}</div>
				</div>
			</div>
			<div className="card-header rounded" style={{ backgroundColor: '#c9a41e' }}>
				<div className="row">
					{order.products.map((o) => (
						<div className="text-dark col-3 mr-1 mb-1 mt-1">
							<div>
								<ul className="list-group">
									<li className="list-group-item">
										<span className="badge badge-success mr-2">Name :</span>
										{o.name}
									</li>
									<li className="list-group-item">
										<span className="badge badge-success mr-2">Quantity :</span>
										{o.count}
									</li>
									<li className="list-group-item">
										<span className="badge badge-success mr-2">Price :</span>
										{o.count * o.price}
									</li>
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default OrderCard;
