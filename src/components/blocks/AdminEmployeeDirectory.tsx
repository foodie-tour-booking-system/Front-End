import { Button } from "@/components/ui/button";
import { Search, Plus, ChevronDown, ArrowRight } from "lucide-react";

interface AdminEmployeeDirectoryProps {
  onNavigateToPermissions: (userId: string) => void;
  onNavigateToEdit: (userId: string) => void;
}

export function AdminEmployeeDirectory({ onNavigateToPermissions, onNavigateToEdit }: AdminEmployeeDirectoryProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 bg-background min-h-full">
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Employee Directory
            </h2>
            <p className="text-slate-500 dark:text-gray-400">
              Manage staff members and their granular access permissions.
            </p>
          </div>
          <Button className="bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 font-bold py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Employee
          </Button>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white dark:bg-[#2d3748] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search employees by name or email..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-black/20 border-transparent focus:border-[#f1c40f] focus:ring-1 focus:ring-[#f1c40f] rounded-lg text-slate-900 dark:text-white placeholder-gray-400 transition-all text-sm outline-none"
            />
          </div>

          {/* Filter Group */}
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="relative group min-w-[140px]">
              <select className="appearance-none w-full bg-gray-50 dark:bg-black/20 border-transparent text-slate-700 dark:text-gray-300 py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:ring-1 focus:ring-[#f1c40f] cursor-pointer outline-none">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>HR</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-5 h-5" />
            </div>

            <div className="relative group min-w-[140px]">
              <select className="appearance-none w-full bg-gray-50 dark:bg-black/20 border-transparent text-slate-700 dark:text-gray-300 py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:ring-1 focus:ring-[#f1c40f] cursor-pointer outline-none">
                <option>All Access Levels</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-[#2d3748] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-black/20 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Job Title</th>
                  <th scope="col" className="px-6 py-4">Current Role</th>
                  <th scope="col" className="px-6 py-4 text-right">Dynamic Authorization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Row 1 */}
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs mr-3">SJ</div>
                      <span className="font-medium text-slate-900 dark:text-white">Sarah Jenkins</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">sarah.j@company.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-gray-300">Senior Analyst</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      Editor
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button 
                      onClick={() => onNavigateToPermissions('user1')}
                      className="text-[#f1c40f] hover:text-[#d4ac0d] font-medium text-sm inline-flex items-center gap-1 group-hover:underline"
                    >
                      View
                    </button>
                    <span className="text-border">|</span>
                    <button 
                      onClick={() => onNavigateToEdit('user1')}
                      className="text-[#f1c40f] hover:text-[#d4ac0d] font-medium text-sm inline-flex items-center gap-1 group-hover:underline"
                    >
                      Edit 
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs mr-3">MC</div>
                      <span className="font-medium text-slate-900 dark:text-white">Michael Chen</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">m.chen@company.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-gray-300">Lead Developer</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f1c40f]/20 text-[#d4ac0d] dark:text-[#f1c40f]">
                      Admin
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button 
                      onClick={() => onNavigateToPermissions('user1')}
                      className="text-[#f1c40f] hover:text-[#d4ac0d] font-medium text-sm inline-flex items-center gap-1 group-hover:underline"
                    >
                      View
                    </button>
                    <span className="text-border">|</span>
                    <button 
                      onClick={() => onNavigateToEdit('user1')}
                      className="text-[#f1c40f] hover:text-[#d4ac0d] font-medium text-sm inline-flex items-center gap-1 group-hover:underline"
                    >
                      Edit 
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </td>
                </tr>
                 {/* Row 3 */}
                 <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold text-xs mr-3">JW</div>
                      <span className="font-medium text-slate-900 dark:text-white">Jessica Wu</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">j.wu@company.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-gray-300">Product Manager</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      Viewer
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button 
                      onClick={() => onNavigateToPermissions('user1')}
                      className="text-[#f1c40f] hover:text-[#d4ac0d] font-medium text-sm inline-flex items-center gap-1 group-hover:underline"
                    >
                      View
                    </button>
                    <span className="text-border">|</span>
                    <button 
                      onClick={() => onNavigateToEdit('user1')}
                      className="text-[#f1c40f] hover:text-[#d4ac0d] font-medium text-sm inline-flex items-center gap-1 group-hover:underline"
                    >
                      Edit 
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-black/10">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium text-slate-900 dark:text-white">1-5</span> of <span className="font-medium text-slate-900 dark:text-white">42</span> employees
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 text-sm transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 text-sm transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
