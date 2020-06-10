import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignInCompany from '../pages/company/SignIn';
import SignIn from '../pages/customer/SignIn';
import SignUp from '../pages/customer/SignUp';
import SignUpCompany from '../pages/company/SignUp';
import Dashboard from '../pages/customer/Dashboard';
import ForgotPassword from '../pages/customer/ForgotPassword';
import Delivery from '../pages/customer/Delivery';
import Orders from '../pages/customer/Orders';
import FinishedOrders from '../pages/company/FinishedOrders';
import DashBoardCompany from '../pages/company/Dashboard';
import ProfileCustomer from '../pages/customer/Profile';
import ProfileCompany from '../pages/company/ProfileCompany';
import Order from '../pages/customer/Order';
import Reset_password from '../pages/customer/ResetPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/profile-customer" component={ProfileCustomer} isPrivate />
    <Route path="/profile-company" component={ProfileCompany} isPrivate />
    <Route path="/signin-company" exact component={SignInCompany} />
    <Route path="/dashboard-company" component={DashBoardCompany} isPrivate />
    <Route path="/signup" component={SignUp} />
    <Route path="/signup-company" component={SignUpCompany} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/delivery/:companyName/:id" component={Delivery} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/finished-orders" component={FinishedOrders} isPrivate />
    <Route path="/orders" component={Orders} isPrivate />
    <Route path="/order/:company/:status/:id" component={Order} isPrivate />
    <Route
      path="/reset-password-Customer"
      component={Reset_password}
      isPrivate
    />
  </Switch>
);

export default Routes;
