import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminDashboardPage() {
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
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDdZ4r_OFHHAt56h88U07PQYggzmWWDLlGLY_EhCx3uTJYHc0bHyyv9TxVClEUZeJj3n0cbUmsqJrja62Ibuv1eNv97aT2mcVP3e9v70k1nHbcso_50iemrXyE-2VwL5iEUDnT0tktj_eggpptMWjMqMDDuydXox7VjbjEuA6xHv3wYrzyTvmZh5lavRNl6Om8Pvizn1AjE3Qct4WXLhi2V35eABr4vD9iMUbYOZyYiBtLKXlw7kk7SGVv64uFOhFdWdCKW31S1mBqg")',
                }}
              ></div>
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-foreground text-base font-bold leading-tight truncate">
                  River Tours
                </h1>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider truncate">
                  Admin Panel
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1">
              <Link
                to="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group"
              >
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group"
              >
                <span className="text-sm font-medium">Bookings</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium transition-colors"
              >
                <span className="text-sm font-bold">Tours</span>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group"
              >
                <span className="text-sm font-medium">Customers</span>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group"
              >
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </nav>
          </div>

          <Button
            variant="ghost"
            className="flex w-full items-center justify-center gap-2 text-foreground font-bold hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Header for Mobile */}
        <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border">
          <div className="flex items-center gap-2">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-8"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkSaYHGxcLU1fxHzBXvU4_XdP7HIbzTgQl0XEm0KCc7gt0wtv01sYaksLKPe93oQc_74cHCEytjf-PDP6_24e2p0wGZAyTSwGVCqVG-s5s76U_KYNdAQBIlr_KKYtgGlhCf5tHy2EanRLFNbZ0TioFDw4_KF_wXtcNVwqa_w0908XXQ5r1x04fjib8DSNoO0IfoMGQ4DpegvVzqE4llSJINYfdbUqiegRwqLmN9ZxXD4m0s-Xsb9qC0ozKYE3z8kfGA0TxohL1FIHp")',
              }}
            ></div>
            <span className="font-bold text-foreground">River Tours</span>
          </div>
          <Button variant="ghost" size="icon">
            Menu
          </Button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
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
                <Button
                  variant="outline"
                  className="h-11 justify-between gap-2"
                >
                  All Categories
                </Button>
                <Button
                  variant="outline"
                  className="h-11 justify-between gap-2"
                >
                  Status: All
                </Button>
                <Button
                  variant="outline"
                  className="h-11 justify-between gap-2"
                >
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
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        scope="col"
                      >
                        Tour Info
                      </th>
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell"
                        scope="col"
                      >
                        Category
                      </th>
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        scope="col"
                      >
                        Price
                      </th>
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                        scope="col"
                      >
                        Status
                      </th>
                      <th
                        className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        scope="col"
                      >
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
                            style={{
                              backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuACerJRES97l-QjsRu6mmqUhAje77H1WK5R74m2hTHxoNee4f4kWqYTQ2BoKR1WAQOVYLjxHyL9thETvaOK7B6-Dk-_rI80qEpLRnN8AjTaEdJ5Vh9CQ8uKZKkvfJ4BRcONX7aKxpbTJWIuOuBjn44nnSDxNc1fsQWAxnhoCHhKslrZWdwHjvEG85QlsLeP1m9_uEkvcw_2WZSL9d6JcMmBQ6oCh_1qxXoXLKIPFcaqssSl1Ee9etwawJRDLM1qJQX1vRvIeMKsMAhF')",
                            }}
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                          >
                            E
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-500"
                          >
                            C
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            D
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-secondary/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="h-12 w-12 flex-shrink-0 rounded-lg bg-cover bg-center border border-border overflow-hidden"
                            style={{
                              backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTkQKQamIbEDHdjB9qqGB6kQ2DA_HMgxe7qcRnkvCsg4SAaHu2htySnpOm3fvtIl19K0vgWd5Uk6Gkzux05Nnjqunt6BvTKlHBR8aPEcf6II7dWqBI3LS1qZ-NOtuWLsPo96QMSk7YLDc_3XHDLkJPLqUFZxKuIFYoNfC5mMtC8aQZg8YyDceyfzU37Sr2e419FB_R_Qbdx4lcROgO6PN7hGTDmTIas333WQRGNdKfdzVJdtOh4NkiwnJX2i-JR4_EAM5Dsory7R8Z')",
                            }}
                          ></div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              Cu Chi Tunnels Experience
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: #TR-8833
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100/20 text-amber-600">
                          History
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-foreground">
                          $45.00
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                          >
                            E
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-500"
                          >
                            C
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            D
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-secondary/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="h-12 w-12 flex-shrink-0 rounded-lg bg-cover bg-center border border-border overflow-hidden"
                            style={{
                              backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDx-gp44GuDSXF5mWOn0vYLzDWhF9urTdpJFkkMPUTHDY_MXpPJ4hO3W9ymiMXsHzNFo-i04A9TEwNFoAtWod5UP3kc6umGT0pvuhnI7f-Nm1CmOlhDerjHOQIeycIvm1VatOnPOAmDLJbIDnohBX6H_4XKLc-QgAj5IPlaGeXpw79K6l3RXl-qSPe7MDa5FZSO0cbkT3BojGsO6tgvXRczPV45Gs9PdRhTYx5-T7klhEZv5uOzEmLLndpp8ua2cnzu9n0k4ykwcHOF')",
                            }}
                          ></div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              Sunset River Cruise
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: #TR-8835
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100/20 text-pink-600">
                          Romance
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-foreground">
                          $120.00
                        </div>
                        <div className="text-xs text-muted-foreground">
                          per couple
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                          >
                            E
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-500"
                          >
                            C
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            D
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-border px-4 py-3 sm:px-6 bg-card">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Showing{" "}
                      <span className="font-medium text-foreground">1</span> to{" "}
                      <span className="font-medium text-foreground">5</span> of{" "}
                      <span className="font-medium text-foreground">24</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                      <Button variant="outline" className="rounded-r-none">
                        Prev
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-none border-x-0 bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        1
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-none border-x-0"
                      >
                        2
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-none border-x-0"
                      >
                        3
                      </Button>
                      <Button variant="outline" className="rounded-l-none">
                        Next
                      </Button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
