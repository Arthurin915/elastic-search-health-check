import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import HealthCheck from "../pages/HealthCheck";
import GuardedRoute from "../components/GuardedRoute";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={Login}>
      </Route>
      <GuardedRoute path="/health-check" component={HealthCheck}>
      </GuardedRoute>
    </Switch>
  );
};

export default Routes;
