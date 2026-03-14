import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
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

    if (requiredRole && userRole !== `ROLE_${requiredRole}`) {
      // Nếu không đúng role, chuyển về trang 403 hoặc trang chủ
      return <Navigate to="/403" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};
