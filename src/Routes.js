import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import admindashboard from './user/AdminDashBoard';
import userdashboard from './user/UserDashBoard';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import cart from './core/Cart';
import Purchases from './user/Purchases';
import AllOrder from './admin/AllOrder';

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/cart" exact component={cart} />
				<PrivateRoute path="/user/dashboard" exact component={userdashboard} />
				<PrivateRoute path="/purchases" exact component={Purchases} />
				<AdminRoute path="/admin/dashboard" exact component={admindashboard} />
				{/* {<AdminRoute path="/admin/order" exact component={orders} />} */}
				<AdminRoute path="/admin/create/category" exact component={AddCategory} />
				<AdminRoute path="/admin/order" exact component={AllOrder} />
				<AdminRoute path="/admin/manage/category" exact component={ManageCategories} />
				<AdminRoute path="/admin/create/product" exact component={AddProduct} />
				<AdminRoute path="/admin/manage/products" exact component={ManageProducts} />
				<AdminRoute path="/admin/products/update/:productId" exact component={UpdateProduct} />
				<AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
				{/* <AdminRoute path="/admin/product" exact component={products} /> */} */}
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
