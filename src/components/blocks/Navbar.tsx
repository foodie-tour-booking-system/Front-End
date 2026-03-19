import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "@/services/AuthService";

export function Navbar() {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  let isAdmin = false;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const scopeArray = decoded.scope ? decoded.scope.split(" ") : [];
      isAdmin = scopeArray.includes("ROLE_ADMIN");
    } catch (e) {
      // invalid token
    }
  }

  const handleLogout = async () => {
    try {
      if (token) {
        await AuthService.logout();
      }
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      Cookies.remove("token");
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-display font-bold text-foreground tracking-widest uppercase">
            Foodie Tour
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/tours"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Tours
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            My Booking
          </Link>
          <Link
            to="/tracking"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Tracking
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Admin Panel
            </Link>
          )}
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-sm font-bold bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 px-4 py-2 rounded-lg transition-colors inline-block"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </nav>
        <button className="md:hidden text-2xl text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
