import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;