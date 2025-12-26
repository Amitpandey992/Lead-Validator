import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PUBLIC_PATHS = ["/login", "/signup", "/check-inbox", "/verify-email"];

export default function PublicRoute() {
    const { token, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return null;

    if (token && PUBLIC_PATHS.includes(location.pathname)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
