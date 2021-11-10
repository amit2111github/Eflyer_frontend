import React, { useEffect, useState } from 'react';
const PurchaseCard = ({ order }) => {
	return (
		<div className="card mb-2 rounded">
			<div className="card-header bg-dark text-warning">
				<div className="row">
					<div className="col-6">Transaction Id : {order.transaction_id}</div>
					<div ml-2>Status : {order.status}</div>
				</div>
				<div className="row">
					<div className="col-6">Order Date : {order.createdAt.toLocaleString()}</div>
					<div className="col-6">Amount : {order.amount}</div>
				</div>
			</div>
			<div className="card-header rounded" style={{ backgroundColor: '#c9a41e' }}>
				<div className="row">
					{order.products.map((o) => (
						<div className="text-dark col-4 mr-1 mb-1 mt-1">
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
export default PurchaseCard;
