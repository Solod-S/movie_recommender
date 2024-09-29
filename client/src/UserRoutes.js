import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { Layout, PrivateRoute } from "./components";

const Recommendation = lazy(() => import("./pages/Recommendation"));
const Home = lazy(() => import("./pages/Home"));
const Favorites = lazy(() => import("./pages/Favorites"));

const UserRoutes = ({ user }) => {
  return (
    <Routes>
      <Route end path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommendation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
