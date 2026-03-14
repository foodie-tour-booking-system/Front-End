import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Shield, Map, Settings, LogOut, Menu, UserCircle } from "lucide-react";
import { AdminTourInventory } from "@/components/blocks/AdminTourInventory";
import { AdminEmployeeDirectory } from "@/components/blocks/AdminEmployeeDirectory";
import { AdminDynamicPermissions } from "@/components/blocks/AdminDynamicPermissions";
import { AdminDetailedPermissions } from "@/components/blocks/AdminDetailedPermissions";

type AdminView = 'tours' | 'employees' | 'permissions_overview' | 'permissions_edit';

export function AdminDashboardPage() {
  const [currentView, setCurrentView] = useState<AdminView>('tours');

  // Navigation handlers
  const goToPermissionsOverview = (_userId: string) => {
    setCurrentView('permissions_overview');
  };

  const goToPermissionsEdit = (_userId: string) => {
    setCurrentView('permissions_edit');
  };
  
  const goBackToDirectory = () => {
    setCurrentView('employees');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans transition-colors duration-200">
      {/* Side Navigation */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r border-border flex-shrink-0">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-6">
            {/* User Profile/Header */}
            <div className="flex items-center gap-3 px-2 py-2">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 flex-shrink-0 border border-border shadow-sm"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop")',
                }}
              ></div>
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-foreground text-base font-bold leading-tight truncate">
                  Admin User
                </h1>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider truncate">
                  Admin Panel
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setCurrentView('tours')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  currentView === 'tours' 
                    ? 'bg-primary/10 text-[#d4ac0d] dark:text-primary font-bold' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground font-medium'
                }`}
              >
                <Map className="w-5 h-5" />
                <span className="text-sm">Tours Inventory</span>
              </button>
              
              <button
                onClick={() => setCurrentView('employees')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  currentView === 'employees' || currentView === 'permissions_overview' || currentView === 'permissions_edit'
                    ? 'bg-primary/10 text-[#d4ac0d] dark:text-primary font-bold' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground font-medium'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="text-sm">Employee Directory</span>
              </button>

              <button
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group opacity-50 cursor-not-allowed"
              >
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Roles & Access</span>
              </button>

              <button
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group opacity-50 cursor-not-allowed"
              >
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium">System Settings</span>
              </button>
            </nav>
          </div>

          <Button
            variant="ghost"
            className="flex w-full items-center justify-center gap-2 text-foreground font-bold hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background relative">
        {/* Header for Mobile */}
        <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border z-10">
          <div className="flex items-center gap-2">
            <UserCircle className="w-8 h-8 text-primary" />
            <span className="font-bold text-foreground">Admin Panel</span>
          </div>
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Dynamic View Rendering */}
        {currentView === 'tours' && <AdminTourInventory />}
        {currentView === 'employees' && <AdminEmployeeDirectory onNavigateToPermissions={goToPermissionsOverview} onNavigateToEdit={goToPermissionsEdit} />}
        {currentView === 'permissions_overview' && <AdminDynamicPermissions onBack={goBackToDirectory} />}
        {currentView === 'permissions_edit' && <AdminDetailedPermissions onBack={goBackToDirectory} />}

      </main>
    </div>
  );
}
