import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  LogOut,
  Menu,
  X,
  UserCircle,
} from "lucide-react";
import { AdminBookingManager } from "@/components/blocks/AdminBookingManager";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthService } from "@/services/AuthService";
import { jwtDecode } from "jwt-decode";

// ─── Decode display name from JWT ────────────────────────────────────────────
function getEmployeeName(): string {
  try {
    const token = Cookies.get("token");
    if (!token) return "Employee";
    const decoded: any = jwtDecode(token);
    return decoded.sub ?? decoded.name ?? decoded.username ?? "Employee";
  } catch {
    return "Employee";
  }
}

// ─── Employee Dashboard Page ──────────────────────────────────────────────────
export function EmployeeDashboardPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const displayName = getEmployeeName();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      Cookies.remove("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans transition-colors duration-200">
      {/* ── Side Navigation (desktop) ── */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r border-border flex-shrink-0">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-6">
            {/* User Profile */}
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
                <UserCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-foreground text-base font-bold leading-tight truncate">
                  {displayName}
                </h1>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider truncate">
                  Employee Portal
                </p>
              </div>
            </div>

            {/* App Brand */}
            <div className="px-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-black text-primary tracking-tight">FoodieTour</span>
              </div>
              <div className="h-px bg-border" />
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {/* Bookings — only nav item */}
              <button
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors bg-primary/10 text-[#d4ac0d] dark:text-primary font-bold cursor-default"
              >
                <BookMarked className="w-5 h-5" />
                <span className="text-sm">Quản lý Booking</span>
              </button>
            </nav>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 text-foreground font-bold hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </Button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background relative">

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border z-20">
          <div className="flex items-center gap-2">
            <UserCircle className="w-7 h-7 text-primary" />
            <span className="font-bold text-foreground">Employee Portal</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((p) => !p)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute inset-0 z-10 top-[64px] bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="absolute left-0 top-0 w-64 h-full bg-card border-r border-border p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-left duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 border border-primary/20">
                  <UserCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground">Employee Portal</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <button
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-[#d4ac0d] dark:text-primary font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookMarked className="w-5 h-5" />
                <span className="text-sm">Quản lý Booking</span>
              </button>
              <div className="mt-auto">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 text-foreground font-bold hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Content */}
        <AdminBookingManager />
      </main>
    </div>
  );
}
