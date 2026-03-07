import { Navbar } from "@/components/blocks/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function UserDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans transition-colors duration-200">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="hidden w-64 flex-col border-r border-border bg-card p-6 lg:flex overflow-y-auto">
          <div className="flex items-center gap-4 pb-8 border-b border-border mb-6">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDm4QaPLUm5W-V-rH0YoplH8wAA7BOvJtt9hIHJAbRUrN8iZMMZiOnT2WWkg0WOvZNfJL2MwwryyMG-t5n9qXyYS6c9hBBoOdnIAITsEqtRM7GOtVgTq44B5TVKL0c8q5o0t1-DUE9A3ktPZlgfuhP-Bp09bGOSVCWGR8jja5U1UArx0txx5Gg_mUvOg8SmzcFjCeJqpDq02akXx_LwmNiH-UB4ssbYj6mosw8JJBAmrTmNQzYsDg9pzBGuChYiSENAfdJs2K7kJeK4")',
              }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-foreground text-base font-bold leading-tight">
                Sophia Miller
              </h1>
              <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                Gold Member
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground shadow-md transition-all"
            >
              <span className="font-bold">My Bookings</span>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              <span className="font-medium">Account Settings</span>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              <span className="font-medium">Loyalty Rewards</span>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              <span className="font-medium">Help Center</span>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors mt-auto text-red-500"
            >
              <span className="font-medium">Sign Out</span>
            </Link>
          </nav>

          <div className="mt-auto pt-8">
            <div className="rounded-xl bg-secondary/20 p-4 border border-border">
              <div className="flex items-center gap-2 mb-2 text-foreground">
                <span className="font-bold text-sm">Need Help?</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Our concierge team is available 24/7 to assist with your
                booking.
              </p>
              <Button
                variant="outline"
                className="w-full text-xs font-bold transition-colors"
              >
                Contact Concierge
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    Manage Bookings
                  </h1>
                  <p className="text-muted-foreground">
                    View and manage your upcoming river adventures.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 font-bold transition-colors"
                >
                  Download All Itineraries
                </Button>
              </div>

              {/* Current Booking */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">
                    Current Booking
                  </h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100/30 dark:bg-green-900/30 px-3 py-1 text-xs font-bold text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900">
                    <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                    Confirmed
                  </span>
                </div>
                <div className="rounded-2xl bg-card p-6 shadow-sm border border-border flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-1/3 shrink-0">
                    <div className="aspect-video lg:aspect-[4/3] w-full rounded-xl bg-primary/20 bg-cover bg-center shadow-inner relative group overflow-hidden">
                      {/* Temporary background color instead of image link, or use the one from HTML below: */}
                      {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div> */}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">
                          Saigon Night Food Tour
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          Ho Chi Minh City, Vietnam
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm text-muted-foreground">
                          Total Price
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          $450.00
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 py-6 border-y border-border">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Booking ID
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          #VN8293
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Date
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          June 15, 2026
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Time
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          18:00 - 22:00
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Guests
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          2 Adults
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-3">
                      <Button className="flex items-center justify-center gap-2 font-bold text-primary-foreground transition-all">
                        Modify Date
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 font-bold transition-colors"
                      >
                        Download E-Ticket
                      </Button>
                      <Button
                        variant="outline"
                        className="border-destructive/50 text-destructive hover:bg-destructive/10 ml-auto sm:ml-0 font-bold"
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Past Trips */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Past Trips
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md cursor-pointer">
                    <div className="flex w-full sm:w-auto items-center gap-4">
                      <div
                        className="h-16 w-16 shrink-0 rounded-lg bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqMV5qir7NV0hypOfeI45_p4H-x1KDJLhx4bOq4nGK5qsd6iVzfF8PkfDoGfeHsVAceSfAYila03c7sKsvcbuRNzuSuyJUXKa6Y54hEyxmy8JQlfSHBRBZU305cAjfCS7HOLlWHn_EaxDd8lGHQTCJaYqjvdoskHXXeoqIr6U2PVMJ--JTMMD8jXjmsu4O1x1X_aB6LE5SbB6hd9i9j6g-N2OLcAoThg0W1_LgFhx_cZifjApjs2qi623LD14CKpI9ss-t-yNdBB0W")',
                        }}
                      ></div>
                      <div>
                        <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          Mekong Delta Discovery
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Dec 12, 2023 • Completed
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6">
                      <Button
                        variant="link"
                        className="text-sm font-bold text-primary hover:underline p-0"
                      >
                        View Receipt
                      </Button>
                    </div>
                  </div>

                  <div className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md cursor-pointer">
                    <div className="flex w-full sm:w-auto items-center gap-4">
                      <div
                        className="h-16 w-16 shrink-0 rounded-lg bg-cover bg-center grayscale group-hover:grayscale-0 transition-all"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjSp-rZ96dPvgUOrorKk1bBpCTQfVwJuP0bNZDv1NVz_4F1pbyAvVxqHZcwWLU9smoCpuETYT71F5HsZFccOZCvsaVZdrF6iF7CjxtZZ2I9a9_9N8u8yWFgKEnR-dz2wNPBY_YuUPAzmA3b6tJsqV9E69dLTo7kVmvpdTjOR4DUxSS8yJDo75_Zxkg2kxUNumYxZZKbWFSfqUxioFHwRjg6A00gaAKFdlJg-R1ilUh6lkwwg5SkjdHRH9IcUMd772dxQc_p7Ilo3QJ")',
                        }}
                      ></div>
                      <div>
                        <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          Sunset Cocktail Cruise
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Aug 05, 2023 • Completed
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6">
                      <Button
                        variant="link"
                        className="text-sm font-bold text-primary hover:underline p-0"
                      >
                        View Receipt
                      </Button>
                    </div>
                  </div>
                </div>
                <button className="mt-4 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                  Show older trips
                </button>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
