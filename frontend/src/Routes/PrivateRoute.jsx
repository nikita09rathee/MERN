import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
  console.log(authState);
  if (authState.isAuth != true) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
