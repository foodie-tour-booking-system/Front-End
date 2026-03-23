import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  LogOut,
  Menu,
  X,
  UserCircle,
  Map,
  Navigation,
  CalendarDays,
  KeyRound,
} from "lucide-react";
import { AdminBookingManager } from "@/components/blocks/AdminBookingManager";
import { AdminTourInventory } from "@/components/blocks/AdminTourInventory";
import { ChangePasswordModal } from "@/components/blocks/ChangePasswordModal";
import { AdminRouteManager } from "@/components/blocks/AdminRouteManager";
import { AdminScheduleManager } from "@/components/blocks/AdminScheduleManager";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthService } from "@/services/AuthService";
import { jwtDecode } from "jwt-decode";

// ─── Decode display name and role from JWT ────────────────────────────────────
function getEmployeeInfo(): { name: string; role: string } {
  try {
    const token = Cookies.get("token");
    if (!token) return { name: "Employee", role: "EMPLOYEE" };
    const decoded: any = jwtDecode(token);
    const name = decoded.sub ?? decoded.name ?? decoded.username ?? "Employee";
    const scopeArray: string[] = decoded.scope ? decoded.scope.split(" ") : [];
    const roleEntry = scopeArray.find((s) => s.startsWith("ROLE_"));
    const role = roleEntry ? roleEntry.replace("ROLE_", "") : "EMPLOYEE";
    return { name, role };
  } catch {
    return { name: "Employee", role: "EMPLOYEE" };
  }
}

type DispatchView = "tours" | "routes" | "schedules" | "bookings";
type EmployeeView = "bookings";
type CurrentView = DispatchView | EmployeeView;

// ─── Sidebar nav item helper ──────────────────────────────────────────────────
interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}
function NavItem({ active, onClick, icon, label }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
        active
          ? "bg-primary/10 text-[#d4ac0d] dark:text-primary font-bold"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground font-medium"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

// ─── Employee Dashboard Page ──────────────────────────────────────────────────
export function EmployeeDashboardPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { name: displayName, role } = getEmployeeInfo();
  const isDispatch = role === "DISPATCH";

  const [currentView, setCurrentView] = useState<CurrentView>("bookings");
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      Cookies.remove("token");
      navigate("/");
    }
  };

  // Role-aware portal label
  const portalLabel =
    role === "DISPATCH"
      ? "Dispatch Portal"
      : role === "TOURGUIDE"
        ? "Tour Guide Portal"
        : "Employee Portal";

  // ─── Navigation items for each role ───────────────────────────────────────
  const dispatchNavItems = (
    <>
      <NavItem
        active={currentView === "tours"}
        onClick={() => {
          setCurrentView("tours");
          setMobileMenuOpen(false);
        }}
        icon={<Map className="w-5 h-5" />}
        label="Tours Inventory"
      />
      <NavItem
        active={currentView === "routes"}
        onClick={() => {
          setCurrentView("routes");
          setMobileMenuOpen(false);
        }}
        icon={<Navigation className="w-5 h-5" />}
        label="Routes"
      />
      <NavItem
        active={currentView === "schedules"}
        onClick={() => {
          setCurrentView("schedules");
          setMobileMenuOpen(false);
        }}
        icon={<CalendarDays className="w-5 h-5" />}
        label="Schedules"
      />
      <NavItem
        active={currentView === "bookings"}
        onClick={() => {
          setCurrentView("bookings");
          setMobileMenuOpen(false);
        }}
        icon={<BookMarked className="w-5 h-5" />}
        label="Bookings"
      />
    </>
  );

  const employeeNavItems = (
    <NavItem
      active={true}
      onClick={() => setMobileMenuOpen(false)}
      icon={<BookMarked className="w-5 h-5" />}
      label="Quản lý Booking"
    />
  );

  const navItems = isDispatch ? dispatchNavItems : employeeNavItems;

  // ─── Content ───────────────────────────────────────────────────────────────
  const renderContent = () => {
    if (isDispatch) {
      if (currentView === "tours") return <AdminTourInventory />;
      if (currentView === "routes") return <AdminRouteManager />;
      if (currentView === "schedules") return <AdminScheduleManager />;
    }
    return <AdminBookingManager />;
  };

  // ─── Sidebar shared layout ─────────────────────────────────────────────────
  const sidebarContent = (
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
              {portalLabel}
            </p>
          </div>
        </div>

        {/* App Brand */}
        <div className="px-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-black text-primary tracking-tight">
              FoodieTour
            </span>
          </div>
          <div className="h-px bg-border" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">{navItems}</nav>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          onClick={() => setChangePasswordOpen(true)}
          className="flex w-full items-center justify-center gap-2 text-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <KeyRound className="w-4 h-4" />
          Đổi mật khẩu
        </Button>
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
  );

  return (
    <>
      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
      <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans transition-colors duration-200">
        {/* ── Side Navigation (desktop) ── */}
        <div className="hidden md:flex w-64 flex-col bg-card border-r border-border flex-shrink-0">
          {sidebarContent}
        </div>

        {/* ── Main Content ── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background relative">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border z-20">
            <div className="flex items-center gap-2">
              <UserCircle className="w-7 h-7 text-primary" />
              <span className="font-bold text-foreground">{portalLabel}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((p) => !p)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div
              className="md:hidden absolute inset-0 z-10 top-[64px] bg-black/50 backdrop-blur-sm"
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
                    <p className="text-sm font-bold text-foreground truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {portalLabel}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <nav className="flex flex-col gap-1">{navItems}</nav>
                <div className="mt-auto flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setChangePasswordOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 text-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <KeyRound className="w-4 h-4" />
                    Đổi mật khẩu
                  </Button>
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

          {/* Dynamic Content */}
          {renderContent()}
        </main>
      </div>
    </>
  );
}
