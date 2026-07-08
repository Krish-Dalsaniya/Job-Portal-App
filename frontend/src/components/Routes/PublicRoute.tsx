import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../Context";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthorized } = useContext(Context);

  if (isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
