import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignInCompany from '../pages/company/SignIn';
import SignIn from '../pages/customer/SignIn';
import SignUp from '../pages/customer/SignUp';
import Dashboard from '../pages/customer/Dashboard';
import ForgotPassword from '../pages/customer/ForgotPassword';
import Delivery from '../pages/customer/Delivery';
import Orders from '../pages/customer/Orders';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signin-company" exact component={SignInCompany} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/delivery/:id" component={Delivery} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/orders" component={Orders} isPrivate />
  </Switch>
);

export default Routes;
