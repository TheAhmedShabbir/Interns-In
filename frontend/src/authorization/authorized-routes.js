import { Navigate, Outlet } from "react-router-dom";

export const AuthorizedRoute = ({ children }) => {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/signin" replace />;
  }
  return children ? children : <Outlet />;
};

export const EnrouteToDashboard = ({ children }) => {
  if (localStorage.getItem("access_token")) {
    return <Navigate to={`/${localStorage.getItem("page")}`} replace />;
  }
  return children ? children : <Outlet />;
};
