import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminTourInventory() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-foreground tracking-tight mb-1">
              Tour Inventory
            </h2>
            <p className="text-muted-foreground text-base">
              Manage and organize your river tour experiences.
            </p>
          </div>
          <Button className="font-bold py-2.5 px-5 transition-all text-primary-foreground">
            + Create New Tour
          </Button>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1 group">
            <Input
              className="pl-10 h-11"
              placeholder="Search tours by name, ID, or location..."
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="h-11 justify-between gap-2">
              All Categories
            </Button>
            <Button variant="outline" className="h-11 justify-between gap-2">
              Status: All
            </Button>
            <Button variant="outline" className="h-11 justify-between gap-2">
              More Filters
            </Button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-card shadow-sm border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-secondary/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Tour Info
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {/* Row 1 */}
                <tr className="hover:bg-secondary/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="h-12 w-12 flex-shrink-0 rounded-lg bg-cover bg-center border border-border overflow-hidden"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2670&auto=format&fit=crop')" }}
                      ></div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          Saigon Night Food Tour
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ID: #TR-8832
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100/20 text-orange-600">
                      Food & Drink
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">
                      $59.00
                    </div>
                    <div className="text-xs text-muted-foreground">
                      per adult
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100/20 text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>{" "}
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">E</Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-500">C</Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">D</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}
