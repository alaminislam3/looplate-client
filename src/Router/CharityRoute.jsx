import React, { Children } from "react";
import { Navigate } from "react-router";
import UseAuth from "../Hooks/useAuth";
import UseUserRole from "../Hooks/UseUserRole";
import Loading from "../Shared/Loading/Loading";

const CharityRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, roleLoading } = UseUserRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (!user || role !== "charity") {
    return (
      <Navigate
        state={{ from: location.pathname }}
        to={"/forbidden"}
      ></Navigate>
    );
  }
  return children;
};

export default CharityRoute;
