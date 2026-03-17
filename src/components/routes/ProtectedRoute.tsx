import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: any = jwtDecode(token);
    const scopeArray = decoded.scope ? decoded.scope.split(" ") : [];

    const userRole = scopeArray.find((s: string) => s.startsWith("ROLE_"));

    if (requiredRole) {
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole.map((r) => `ROLE_${r}`)
        : [`ROLE_${requiredRole}`];

      if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/403" replace />;
      }
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};
