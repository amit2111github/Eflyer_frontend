import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isSignedIn, signout } from '../auth/helper/index';
import '../css/cardStyle.css';

const Menu = ({ history }) => (
	<div class="container">
		<div class="header_section_top">
			<div class="row">
				<div class="col-sm-12">
					<div class="custom_menu">
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/cart">Cart</a>
							</li>
							<li>
								<a href="/purchases">Purchases</a>
							</li>
							{isSignedIn() && isSignedIn().user.role === 0 && (
								<li>
									<a href="/user/dashboard">DashBoard</a>
								</li>
							)}
							{isSignedIn() && isSignedIn().user.role === 1 && (
								<li>
									<a href="/admin/dashboard">A. DashBoard</a>
								</li>
							)}
							{!isSignedIn() && (
								<>
									<li>
										<a href="/signin">Sign In</a>
									</li>
									<li>
										<a href="/signup">Sign Up</a>
									</li>
								</>
							)}
							{isSignedIn() && (
								<li>
									<a
										onClick={() => {
											signout(() => {
												history.push('/');
											});
										}}
									>
										Sign Out
									</a>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
);
export default withRouter(Menu);
