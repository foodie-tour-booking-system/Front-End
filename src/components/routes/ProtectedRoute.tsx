import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const token = Cookies.get("token");
  const location = useLocation();

  if (!token) {
    // Nếu không có token, chuyển về trang login và lưu lại trang đang định vào
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded: any = jwtDecode(token);
    const scopeArray = decoded.scope ? decoded.scope.split(" ") : [];

    // Tìm role có prefix ROLE_ như cấu hình Backend của bạn
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
