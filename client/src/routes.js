import React from 'react';
import Home from './components/Home.jsx';
import Login from './containers/Login.jsx';
import SignUp from './containers/SignUp.jsx';
import Logout from './containers/Logout.jsx';
import ProtectedPage from './containers/ProtectedPage.jsx';
import { Switch, Route } from 'react-router-dom';

const routes =
  <Switch>
    <Route exact path="/" component={ Home }/>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/logout" component={Logout} />
    <Route path="/protected" component={ProtectedPage} />
  </Switch>;

export default routes;
