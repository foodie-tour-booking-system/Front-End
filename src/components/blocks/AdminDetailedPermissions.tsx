import { ArrowLeft, FileText, CalendarDays, BarChart2, Headset, Settings } from "lucide-react";

interface AdminDetailedPermissionsProps {
  onBack?: () => void;
}

export function AdminDetailedPermissions({ onBack }: AdminDetailedPermissionsProps) {
  return (
    <div className="flex flex-1 justify-center py-5 px-4 md:px-10 lg:px-40 bg-background overflow-y-auto">
      <div className="flex flex-col max-w-[960px] flex-1 w-full animate-in slide-in-from-bottom-4 duration-500">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <button 
            onClick={onBack}
            className="hover:text-primary transition-colors flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </button>
        </div>

        {/* Page Header */}
        <div className="flex flex-wrap justify-between items-end gap-4 pb-6 border-b border-border">
          <div className="flex flex-col gap-2">
            <h1 className="text-foreground text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Permissions: Sarah Jenkins
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl">
              Configure granular access controls and scope limitations for this employee account. Changes are logged for audit purposes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 border border-green-500/20">
              Active Employee
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-500/20">
              Operations Dept
            </span>
          </div>
        </div>

        {/* Permissions List */}
        <div className="mt-8 flex flex-col gap-4">
          
          {/* Permission Item 1 */}
          <label className="group relative flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer shadow-sm">
            <div className="flex h-6 items-center mt-0.5">
              <input 
                type="checkbox" 
                defaultChecked 
                className="h-5 w-5 rounded border-input bg-background text-[#f1c40f] focus:ring-[#f1c40f] transition duration-150 ease-in-out cursor-pointer" 
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#f1c40f]" />
                <span className="text-foreground text-base font-bold">Manage Tours</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Grants full capability to create new tour listings, edit existing details including pricing and itineraries, and archive obsolete tours.
              </p>
            </div>
          </label>

          {/* Permission Item 2 */}
          <label className="group relative flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer shadow-sm">
            <div className="flex h-6 items-center mt-0.5">
              <input 
                type="checkbox" 
                defaultChecked 
                className="h-5 w-5 rounded border-input bg-background text-[#f1c40f] focus:ring-[#f1c40f] transition duration-150 ease-in-out cursor-pointer" 
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#f1c40f]" />
                <span className="text-foreground text-base font-bold">Manage Bookings</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Allows viewing customer bookings, modifying dates, processing cancellations, and issuing refunds up to $500.
              </p>
            </div>
          </label>

          {/* Permission Item 3 */}
          <label className="group relative flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer shadow-sm">
            <div className="flex h-6 items-center mt-0.5">
              <input 
                type="checkbox" 
                className="h-5 w-5 rounded border-input bg-background text-[#f1c40f] focus:ring-[#f1c40f] transition duration-150 ease-in-out cursor-pointer" 
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-foreground text-base font-bold">View Analytics</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Read-only access to dashboard sales reports, traffic data, and conversion metrics. Cannot export data.
              </p>
            </div>
          </label>

          {/* Permission Item 4 */}
          <label className="group relative flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer shadow-sm">
            <div className="flex h-6 items-center mt-0.5">
              <input 
                type="checkbox" 
                defaultChecked 
                className="h-5 w-5 rounded border-input bg-background text-[#f1c40f] focus:ring-[#f1c40f] transition duration-150 ease-in-out cursor-pointer" 
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-2">
                <Headset className="w-5 h-5 text-[#f1c40f]" />
                <span className="text-foreground text-base font-bold">Customer Support</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Access to live chat logs, ticket resolution tools, and ability to respond to customer inquiries directly.
              </p>
            </div>
          </label>

          {/* Permission Item 5 (Disabled) */}
          <label className="group relative flex items-start gap-4 p-5 rounded-xl border border-border bg-secondary/50 opacity-75 cursor-not-allowed shadow-sm">
            <div className="flex h-6 items-center mt-0.5">
              <input 
                type="checkbox" 
                disabled 
                className="h-5 w-5 rounded border-input bg-secondary text-muted-foreground cursor-not-allowed" 
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground text-base font-bold">System Settings</span>
                <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-muted-foreground border border-border px-2 py-0.5 rounded bg-background">
                  Admin Only
                </span>
              </div>
              <p className="text-muted-foreground/80 text-sm leading-relaxed">
                Configure global platform preferences, payment gateways, and API integrations. Requires Super Admin role.
              </p>
            </div>
          </label>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-border mb-12">
          <div className="text-sm text-muted-foreground">
            Last updated by <span className="font-semibold text-foreground">Admin User</span> on Oct 24, 2026
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button 
              onClick={onBack}
              className="flex-1 sm:flex-none flex items-center justify-center rounded-lg h-12 px-6 border border-border text-foreground hover:bg-secondary font-semibold transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center rounded-lg h-12 px-8 bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 font-bold shadow-lg shadow-primary/20 transition-all">
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
