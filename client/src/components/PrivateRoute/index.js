import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
PrivateRoute.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.shape({
      accessToken: PropTypes.string.isRequired,
      refreshToken: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
    }),
    PropTypes.oneOf([null]), // Для указания, что значение может быть null
  ]),
};

export default PrivateRoute;
