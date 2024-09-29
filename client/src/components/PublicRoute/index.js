import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isLogin = false;

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
