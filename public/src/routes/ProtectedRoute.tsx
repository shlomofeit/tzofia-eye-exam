import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { Role } from "../types/user";

interface ProtectedRouteProps {
  roles?: Role[];
}

const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setMe = useAuthStore((state) => state.setMe);

  useEffect(() => {
    setMe();
  }, [token, user, setMe]);

  if (!token) return <Navigate to="/login" replace />;
  if (!user) return <p>Loading...</p>;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
