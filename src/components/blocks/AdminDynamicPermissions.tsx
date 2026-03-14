import { Settings, Lock, FileText, CalendarDays, DollarSign, Users, Settings as SettingsSuggest, Info, Save } from "lucide-react";

interface AdminDynamicPermissionsProps {
  onBack?: () => void;
}

export function AdminDynamicPermissions({ onBack }: AdminDynamicPermissionsProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-background min-h-full">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Info */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-surface border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                  <img 
                    alt="Profile portrait of Sarah Jenkins" 
                    className="w-full h-full object-cover opacity-90" 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Sarah Jenkins</h1>
                <p className="text-muted-foreground text-sm">s.jenkins@company.com • ID: #882190</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors font-medium text-sm">
              View Activity Log
            </button>
            <button className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors font-medium text-sm">
              Reset 2FA
            </button>
          </div>
        </div>

        {/* Inherited Permissions */}
        <section className="rounded-xl bg-card border border-border overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-secondary/30 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Inherited Permissions
            </h3>
            <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 font-medium">
              Based on Role Assignment
            </span>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Primary Role</span>
              <div className="flex items-center gap-2 mt-1">
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground font-medium">Tour Manager</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Grants baseline access to tour planning modules.</p>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Department Team</span>
               <div className="flex items-center gap-2 mt-1">
                 <Lock className="w-4 h-4 text-muted-foreground" />
                 <span className="text-foreground font-medium">Europe Operations</span>
               </div>
               <p className="text-sm text-muted-foreground mt-1">Restricts data visibility to European region.</p>
            </div>
          </div>
        </section>

        {/* Repository-level Access */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-xl font-bold text-foreground">Repository-level Access</h3>
              <p className="text-sm text-muted-foreground">Core operational modules access control.</p>
            </div>
          </div>
          
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
             <table className="w-full text-left border-collapse">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                <tr>
                   <th className="px-6 py-4 w-12 text-center">
                     <input type="checkbox" className="w-4 h-4 rounded border-input bg-background text-primary focus:ring-primary/50" />
                   </th>
                   <th className="px-6 py-4 w-4/12">Permission Area</th>
                   <th className="px-6 py-4 w-7/12">Permission Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Tour Permissions */}
                <tr className="group hover:bg-secondary/20 transition-colors">
                   <td className="px-6 py-5 text-center">
                     <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-input bg-background text-primary focus:ring-primary/50 cursor-pointer" />
                   </td>
                   <td className="px-6 py-5">
                     <div className="flex items-center gap-3">
                       <div className="p-1.5 rounded bg-primary/10 text-primary">
                         <FileText className="w-5 h-5" />
                       </div>
                       <span className="text-foreground font-medium text-sm">Manage Tours</span>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                     <p className="text-muted-foreground text-sm">Create, edit, and archive tour packages across all regions.</p>
                   </td>
                </tr>
                {/* Booking Permissions */}
                <tr className="group hover:bg-secondary/20 transition-colors">
                   <td className="px-6 py-5 text-center">
                     <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-input bg-background text-primary focus:ring-primary/50 cursor-pointer" />
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                       <div className="p-1.5 rounded bg-primary/10 text-primary">
                         <CalendarDays className="w-5 h-5" />
                       </div>
                       <span className="text-foreground font-medium text-sm">Manage Bookings</span>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                      <p className="text-muted-foreground text-sm">View, process, and export customer reservation reports.</p>
                   </td>
                </tr>
                {/* Pricing Permissions (Disabled) */}
                <tr className="group hover:bg-secondary/10 transition-colors opacity-60">
                   <td className="px-6 py-5 text-center">
                      <input type="checkbox" disabled className="w-5 h-5 rounded border-input bg-secondary text-muted-foreground/30 focus:ring-0 cursor-not-allowed" />
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                       <div className="p-1.5 rounded bg-primary/10 text-primary opacity-50">
                          <DollarSign className="w-5 h-5" />
                       </div>
                       <span className="text-foreground font-medium text-sm opacity-50">Manage Pricing</span>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-muted-foreground/70 text-sm">
                         <Lock className="w-4 h-4" />
                         Modify seasonal rates and apply special discounts.
                      </div>
                   </td>
                </tr>
              </tbody>
             </table>
          </div>
        </section>

        {/* Administrative Permissions */}
        <section className="space-y-4 pb-24">
           <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-xl font-bold text-foreground">Administrative Permissions</h3>
              <p className="text-sm text-muted-foreground">High-level system configuration access.</p>
            </div>
            <span className="bg-red-500/10 text-red-500 text-xs px-2 py-1 rounded border border-red-500/20 flex items-center gap-1 font-medium">
               Sensitive
            </span>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
             <table className="w-full text-left border-collapse">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                <tr>
                   <th className="px-6 py-4 w-12 text-center">
                     <input type="checkbox" disabled className="w-4 h-4 rounded border-input bg-secondary text-muted-foreground opacity-50 cursor-not-allowed" />
                   </th>
                   <th className="px-6 py-4 w-4/12">Permission Area</th>
                   <th className="px-6 py-4 w-7/12">Permission Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                 {/* Manage Users (Disabled) */}
                 <tr className="group hover:bg-secondary/10 transition-colors opacity-60">
                   <td className="px-6 py-5 text-center">
                     <input type="checkbox" disabled className="w-5 h-5 rounded border-input bg-secondary text-muted-foreground/30 cursor-not-allowed" />
                   </td>
                   <td className="px-6 py-5">
                     <div className="flex items-center gap-3">
                       <div className="p-1.5 rounded bg-red-500/10 text-red-500 opacity-50">
                          <Users className="w-5 h-5" />
                       </div>
                       <span className="text-foreground font-medium text-sm opacity-50">Manage Users</span>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-muted-foreground/70 text-sm">
                         <Lock className="w-4 h-4" />
                         Invite, edit role assignments, or remove team members.
                      </div>
                   </td>
                 </tr>
                 {/* System Settings (Disabled) */}
                 <tr className="group hover:bg-secondary/10 transition-colors opacity-60">
                   <td className="px-6 py-5 text-center">
                     <input type="checkbox" disabled className="w-5 h-5 rounded border-input bg-secondary text-muted-foreground/30 cursor-not-allowed" />
                   </td>
                   <td className="px-6 py-5">
                     <div className="flex items-center gap-3">
                       <div className="p-1.5 rounded bg-red-500/10 text-red-500 opacity-50">
                          <SettingsSuggest className="w-5 h-5" />
                       </div>
                       <span className="text-foreground font-medium text-sm opacity-50">System Settings</span>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-muted-foreground/70 text-sm">
                         <Lock className="w-4 h-4" />
                         Configure global parameters and manage API keys.
                      </div>
                   </td>
                 </tr>
              </tbody>
             </table>
          </div>
        </section>
      </div>
      
      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-6 bg-card/90 backdrop-blur-md border-t border-border z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
             <Info className="w-5 h-5 text-primary" />
             Changes will be logged in the audit trail.
          </div>
          <div className="flex w-full sm:w-auto items-center gap-4">
            <button 
              onClick={onBack}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-border text-foreground hover:bg-secondary transition-all font-medium text-sm"
            >
              Cancel
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 transition-all font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
