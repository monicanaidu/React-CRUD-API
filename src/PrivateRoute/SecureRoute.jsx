import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
  const context = useContext(AuthContext);
  return (
    <React.Fragment>
      {context.isLogin ? <Outlet /> : <Navigate to={`/login`} />}
    </React.Fragment>
  );
}

export default PrivateRoute;
