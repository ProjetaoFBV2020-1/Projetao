import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/customer/SignIn';
import SignUp from '../pages/customer/SignUp';
import Dashboard from '../pages/customer/Dashboard';
import ForgotPassword from '../pages/customer/ForgotPassword';
import Delivery from '../pages/customer/Delivery';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/delivery" component={Delivery} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
