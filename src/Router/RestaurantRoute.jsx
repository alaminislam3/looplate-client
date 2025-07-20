import React, { Children } from "react";
import UseAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";
import UseUserRole from "../Hooks/UseUserRole";
import Loading from "../Shared/Loading/Loading";

const RestaurantRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, roleLoading } = UseUserRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (!user || role !== "restaurant") {
    return (
      <Navigate
        state={{ from: location.pathname }}
        to={"/forbidden"}
      ></Navigate>
    );
  }
  return children;
};

export default RestaurantRoute;
