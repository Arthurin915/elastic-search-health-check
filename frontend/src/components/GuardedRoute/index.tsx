import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import Layout from "../Layout";
import { GuardedRouteProps } from "./interfaces";

const GuardedRoute: React.FC<GuardedRouteProps> = ({ ...props }) => {
  const { token } = useAuth();
  if (!token) {
    return <Redirect to="/" />
  }
  return (
    <Layout>
      <Route {...props} />
    </Layout>
  );
};

export default GuardedRoute;
