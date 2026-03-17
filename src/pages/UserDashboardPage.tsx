import { useEffect, useState } from "react";
import { Navbar } from "@/components/blocks/Navbar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthService } from "@/services/AuthService";
import { BookingService, type BookingResponse } from "@/services/BookingService";
import { jwtDecode } from "jwt-decode";
import { MapPin, Hash, Calendar, Loader2, CreditCard, X, Ticket, CheckCircle2, QrCode } from "lucide-react";

function formatDateTime(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

// Pass Modal Component
function PassModal({ booking, onClose, userName }: { booking: BookingResponse; onClose: () => void; userName?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Top Part (Ticket Aesthetic) */}
        <div className="bg-primary p-8 text-primary-foreground relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Experience Pass</p>
              <h2 className="text-xl font-black uppercase">Les Rives</h2>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black leading-tight uppercase tracking-tight">
              Saigon Speedboat Experience
            </h3>
            <p className="flex items-center gap-1.5 text-sm font-medium opacity-80">
              <MapPin className="w-3.5 h-3.5" />
              Ho Chi Minh City, Vietnam
            </p>
          </div>
        </div>

        {/* Perforated Divider */}
        <div className="relative h-6 bg-white dark:bg-zinc-900">
           <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 size-6 rounded-full bg-black/70"></div>
           <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 size-6 rounded-full bg-black/70"></div>
           <div className="absolute top-1/2 left-6 right-6 h-px border-t border-dashed border-border"></div>
        </div>

        {/* Bottom Part */}
        <div className="p-8 pt-4 space-y-8 flex-1">
          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Guest Name</p>
              <p className="text-sm font-bold text-foreground truncate">{userName || "Valued Explorer"}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Booking ID</p>
              <p className="text-sm font-mono font-bold text-foreground">#{booking.bookingCode}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Date & Time</p>
              <p className="text-sm font-bold text-foreground">{formatDateTime(booking.date)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Status</p>
              <div className="flex items-center gap-1.5 text-sm font-bold text-green-500">
                <CheckCircle2 className="w-4 h-4" />
                {booking.bookingStatus || "Confirmed"}
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Pickup Location</p>
              <p className="text-sm font-bold text-foreground italic">{booking.pickupLocation || "Ho Chi Minh City (As per arrangement)"}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-2xl border border-dashed border-border gap-4">
             <div className="bg-white p-2 rounded-lg shadow-sm">
                <QrCode className="size-24 text-black" />
             </div>
             <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest text-center">
               Scan at boarding point
             </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-secondary/10 flex gap-3">
          <Button variant="outline" className="flex-1 font-bold" onClick={onClose}>
            Close
          </Button>
          <Button className="flex-1 font-bold" onClick={() => window.print()}>
            Print Pass
          </Button>
        </div>
      </div>
    </div>
  );
}

export function UserDashboardPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<BookingResponse | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserInfo({
          name: decoded.sub || "Explorer",
          email: decoded.email || "",
        });
      } catch (e) {
        console.error("Token decode error", e);
      }
    }

    const fetchBookingsFromHistory = async () => {
      try {
        const history: string[] = JSON.parse(localStorage.getItem("booking_history") || "[]");
        console.log("Local booking history found:", history);
        
        if (history.length === 0) {
          setIsLoading(false);
          return;
        }

        const results = await Promise.all(
          history.map(code => 
            BookingService.getBookingById({ bookingCode: code })
              .catch(err => {
                console.error(`Failed to fetch booking ${code}:`, err);
                return null;
              })
          )
        );

        const validBookings = results.filter((b): b is BookingResponse => b !== null);
        
        // Sort by date descending
        const sorted = validBookings.sort((a, b) => {
          return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
        });
        
        setBookings(sorted);
      } catch (err) {
        console.error("History Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingsFromHistory();
  }, []);

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

  const currentBooking = bookings.length > 0 ? bookings[0] : null;
  const pastBookings = bookings.length > 1 ? bookings.slice(1) : [];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans transition-colors duration-200">
      <Navbar />

      {selectedBookingForPass && (
        <PassModal 
          booking={selectedBookingForPass} 
          onClose={() => setSelectedBookingForPass(null)} 
          userName={userInfo?.name}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="hidden w-64 flex-col border-r border-border bg-card p-6 lg:flex overflow-y-auto">
          <div className="flex items-center gap-4 pb-8 border-b border-border mb-6">
            <div className="bg-primary/20 size-12 rounded-full flex items-center justify-center text-primary font-bold text-xl uppercase">
              {userInfo?.name.charAt(0) || "U"}
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-foreground text-base font-bold leading-tight truncate">
                {userInfo?.name || "User"}
              </h1>
              <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                Member
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
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
            >
              <span className="font-medium">Account Settings</span>
            </Link>
          </nav>

          <div className="mt-auto pt-8">
            <div className="rounded-xl bg-secondary/20 p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Need help with your booking? Our team is available 24/7.
              </p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
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
                    My Adventures
                  </h1>
                  <p className="text-muted-foreground">
                    View and manage your upcoming and past river tours.
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                  <p className="text-muted-foreground animate-pulse">Loading your journeys...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl bg-card">
                  <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-6">You haven't booked any amazing experiences yet.</p>
                  <Link to="/tours">
                    <Button className="font-bold px-8">Explore Tours</Button>
                  </Link>
                </div>
              ) : (
                <>
                  {/* Current Booking */}
                  {currentBooking && (
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-foreground">Next Adventure</h2>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border ${
                          currentBooking.bookingStatus === 'COMPLETED' 
                            ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                            : currentBooking.bookingStatus === 'CANCELLED'
                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                            : 'bg-primary/10 text-primary border-primary/20'
                        }`}>
                          {currentBooking.bookingStatus === 'PENDING' && <span className="size-2 rounded-full bg-primary animate-pulse"></span>}
                          {currentBooking.bookingStatus}
                        </span>
                      </div>
                      <div className="rounded-2xl bg-card p-6 shadow-sm border border-border flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/3 shrink-0">
                          <div className="aspect-[4/3] w-full rounded-xl bg-secondary bg-cover bg-center overflow-hidden border border-border">
                             <img 
                               src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2670&auto=format&fit=crop" 
                               className="w-full h-full object-cover"
                               alt="Tour"
                             />
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="text-2xl font-bold text-foreground mb-1 uppercase tracking-tight">
                                Saigon Speedboat Experience
                              </h3>
                              <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                                <MapPin className="w-4 h-4 text-primary" />
                                {currentBooking.pickupLocation || "Ho Chi Minh City, Vietnam"}
                              </div>
                            </div>
                            <div className="text-right hidden sm:block">
                              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Total</p>
                              <p className="text-xl font-bold text-primary">
                                {currentBooking.totalPrice?.toLocaleString()} VND
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 py-6 border-y border-border">
                            <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Booking ID</p>
                              <p className="text-sm font-mono font-bold text-foreground tracking-tight">#{currentBooking.bookingCode}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Departure</p>
                              <p className="text-sm font-bold text-foreground">{formatDateTime(currentBooking.date)}</p>
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Payment</p>
                               <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                                 <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                                 VNPAY
                               </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Status</p>
                              <p className="text-sm font-bold text-foreground capitalize">{currentBooking.bookingStatus?.toLowerCase()}</p>
                            </div>
                          </div>

                          <div className="mt-auto flex flex-wrap gap-3">
                             <Link to="/booking" className="flex-1 sm:flex-none">
                                <Button className="w-full font-bold px-8">Book Another</Button>
                             </Link>
                             <Button 
                               onClick={() => setSelectedBookingForPass(currentBooking)}
                               variant="outline" 
                               className="flex-1 sm:flex-none font-bold px-8 border-border"
                             >
                               View Pass
                             </Button>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Past Trips */}
                  {pastBookings.length > 0 && (
                    <section>
                      <h2 className="text-xl font-bold text-foreground mb-4">Past Trips</h2>
                      <div className="grid gap-3">
                        {pastBookings.map((b) => (
                          <div 
                            key={b.bookingId} 
                            onClick={() => setSelectedBookingForPass(b)}
                            className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md cursor-pointer"
                          >
                            <div className="flex w-full sm:w-auto items-center gap-4">
                              <div className="h-14 w-14 shrink-0 rounded-lg bg-secondary flex items-center justify-center">
                                <Hash className="w-6 h-6 text-muted-foreground opacity-30" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase">
                                  Booking #{b.bookingCode}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {formatDateTime(b.date)} • {b.bookingStatus}
                                </p>
                              </div>
                            </div>
                            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 mt-3 sm:mt-0">
                               <p className="text-sm font-bold text-card-foreground">
                                 {b.totalPrice?.toLocaleString()} VND
                               </p>
                               <ChevronRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
