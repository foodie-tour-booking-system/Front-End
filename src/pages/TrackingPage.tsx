import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BookingService, type TrackingResponse } from "@/services/BookingService";
import { Navbar } from "@/components/blocks/Navbar";
import { Footer } from "@/components/blocks/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  Circle,
  Loader2,
  AlertCircle,
  Navigation,
  Ship,
  Waves,
  ArrowRight,
  RefreshCw,
  Hash,
  User
} from "lucide-react";

export function TrackingPage() {
  const { bookingCode: urlCode } = useParams();
  const [bookingCode, setBookingCode] = useState(urlCode || "");
  const [tracking, setTracking] = useState<TrackingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (code?: string) => {
    const rawCode = code || bookingCode;
    const searchCode = rawCode.replace("#", "").trim().toUpperCase();

    if (!searchCode) return;

    setLoading(true);
    setError("");
    try {
      const res = await BookingService.getTracking({ bookingCode: searchCode });
      setTracking(res);
    } catch (err: any) {
      setError("Sorry, we couldn't find any tour with this booking code. Please check your reference and try again.");
      setTracking(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlCode) {
      handleSearch(urlCode);
    }
  }, [urlCode]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col font-sans selection:bg-primary/30">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Search & Hero Header */}
        <div className="bg-slate-900 pt-20 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-1/4 size-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30 animate-pulse"></div>
             <div className="absolute bottom-0 right-1/4 size-[400px] bg-blue-500/10 blur-[100px] rounded-full opacity-20"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
            <div className="max-w-3xl w-full text-center mb-12">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <Waves className="size-4 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Journey Tracker</span>
               </div>
               <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">
                 Track your <span className="text-primary not-italic">Adventure</span>
               </h1>
               <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                 Ready for departure? Monitor your speedboat's progress through the Saigon river in real-time.
               </p>
            </div>

            <div className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl p-2 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col sm:flex-row gap-2">
               <div className="flex-1 relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
                  <Input 
                    placeholder="Enter Booking Code (e.g. BK-12345)"
                    value={bookingCode}
                    onChange={(e) => setBookingCode(e.target.value.replace(/[#\s]/g, "").toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="h-16 bg-transparent border-none pl-14 text-white placeholder:text-slate-600 text-lg font-bold focus-visible:ring-0"
                  />
               </div>
               <Button 
                onClick={() => handleSearch()}
                disabled={loading}
                className="h-16 px-10 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
               >
                 {loading ? <Loader2 className="size-6 animate-spin" /> : <><RefreshCw className="size-5 mr-3" /> Start Tracking</>}
               </Button>
            </div>

            {error && (
              <div className="mt-6 px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold flex items-center gap-3 animate-in zoom-in-95 duration-300">
                <AlertCircle className="size-5" />
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Content */}
        {!tracking && !loading && !error && (
          <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
             <div className="size-32 rounded-[3rem] bg-secondary flex items-center justify-center text-muted-foreground/20 mb-10 overflow-hidden relative group">
                <Navigation className="size-16 group-hover:rotate-45 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
             </div>
             <h2 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tight">Your boat is waiting</h2>
             <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
               Enter your booking reference to check live status, pickup location and detailed itinerary.
             </p>
          </div>
        )}

        {tracking && (
          <div className="container mx-auto px-6 -mt-10 mb-20 relative z-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Tour & Guest Info */}
              <div className="lg:col-span-4 space-y-8">
                {/* Main Card */}
                <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                      <Ship className="size-32" />
                   </div>

                   <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">Booking Journey</p>
                   
                   <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-black text-foreground mb-2 uppercase tracking-tighter leading-none shrink-0">
                          {tracking.bookingStatus}
                        </h2>
                        <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
                           <Clock className="size-4" />
                           Departure: {tracking.departureTime ? new Date(tracking.departureTime).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }) : "Unconfirmed"}
                        </div>
                      </div>

                      <div className="h-px bg-border"></div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Reference Code</label>
                          <div className="text-xl font-mono font-black text-foreground flex items-center gap-2">
                             <Hash className="size-5 text-primary" />
                             {tracking.bookingCode}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Experience</label>
                          <p className="text-xl font-extrabold text-foreground italic">{tracking.tourName}</p>
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mt-1">
                            {tracking.tourDescription || "Embark on an unforgettable journey through the heart of the waterways."}
                          </p>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Pickup & Guest Details */}
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                   
                   <div className="relative z-10 space-y-8">
                      <div className="flex items-start gap-4">
                         <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                            <MapPin className="size-6 text-primary" />
                         </div>
                         <div>
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 block">Pickup Zone</label>
                            <p className="text-lg font-bold leading-tight">{tracking.pickupLocation || "Ho Chi Minh Pier #01"}</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 block">Adults</label>
                            <p className="text-xl font-black">{tracking.adultCount}</p>
                         </div>
                         <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 block">Children</label>
                            <p className="text-xl font-black">{tracking.childrenCount}</p>
                         </div>
                      </div>

                      <div className="pt-4">
                         <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Total Value</label>
                         <div className="text-3xl font-black text-primary tracking-tighter">
                            {formatCurrency(tracking.totalPrice)}
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Right Column: Timeline & Route */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                {/* Timeline Card */}
                <div className="bg-card border border-border rounded-[3rem] p-8 lg:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none flex-1">
                   <div className="flex items-center justify-between mb-16">
                      <div>
                         <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-1">Live Timeline</h3>
                         <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs">
                            <Navigation className="size-4 text-primary" />
                            Route: <span className="text-foreground">{tracking.routeDescription || "Scenic Saigon Delta"}</span>
                         </div>
                      </div>
                      <div className="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-[10px] font-black tracking-widest uppercase border border-green-500/20 flex items-center gap-2">
                        <Waves className="size-3 animate-pulse" /> 
                        <span className="animate-pulse">Active Boat</span>
                      </div>
                   </div>

                   <div className="relative pl-4 space-y-0 min-h-[400px]">
                      {/* Vertical line connector */}
                      <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-slate-100 dark:bg-zinc-900 rounded-full"></div>

                      <div className="space-y-16">
                        {tracking.itinerary && tracking.itinerary.length > 0 ? (
                           tracking.itinerary.map((step, idx) => (
                             <div key={idx} className="relative z-10 flex gap-8 group">
                                <div className={`mt-1.5 size-12 rounded-[1.25rem] flex items-center justify-center shrink-0 border-4 transition-all duration-500 ${step.isCompleted
                                    ? "bg-primary border-white dark:border-zinc-900 shadow-2xl shadow-primary/30 scale-110"
                                    : "bg-white dark:bg-zinc-800 border-slate-100 dark:border-zinc-900 group-hover:scale-105"
                                  }`}>
                                  {step.isCompleted ? (
                                    <CheckCircle2 className="size-6 text-white" />
                                  ) : (
                                    <div className="size-3 rounded-full bg-slate-200 dark:bg-zinc-700"></div>
                                  )}
                                </div>
                                
                                <div className="flex-1 pt-1.5">
                                   <div className="flex flex-wrap items-center gap-4 mb-2">
                                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${step.isCompleted ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary text-muted-foreground'}`}>
                                        {step.time}
                                      </span>
                                      {step.isCompleted && (
                                         <span className="flex items-center gap-1.5 text-[10px] font-black text-green-600 uppercase tracking-widest">
                                            <Navigation className="size-3" /> Arrived
                                         </span>
                                      )}
                                   </div>
                                   <h4 className={`text-xl lg:text-2xl font-black tracking-tight ${step.isCompleted ? "text-foreground" : "text-muted-foreground/50"}`}>
                                     {step.name}
                                   </h4>
                                   {step.type === 'START' && (
                                     <p className="text-sm text-muted-foreground mt-2 font-medium max-w-md">Departure confirmed from our main riverside station.</p>
                                   )}
                                </div>
                             </div>
                           ))
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground">
                             <div className="size-20 rounded-full bg-secondary flex items-center justify-center mb-6 opacity-50">
                                <Ship className="size-10" />
                             </div>
                             <p className="font-bold uppercase tracking-widest text-xs">Itinerary Details Charging...</p>
                          </div>
                        )}
                      </div>
                   </div>

                   <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                         <div className="flex -space-x-3">
                            {[1,2].map(i => (
                               <div key={i} className="size-10 rounded-full border-4 border-card bg-secondary flex items-center justify-center">
                                  <User className="size-4 text-muted-foreground" />
                               </div>
                            ))}
                         </div>
                         <p className="text-xs font-bold text-muted-foreground">
                            Join <span className="text-foreground">{tracking.adultCount + tracking.childrenCount} explorers</span> on this boat
                         </p>
                      </div>
                      
                      <div className="flex items-center gap-6">
                         <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Boat Signal</span>
                            <span className="text-sm font-black text-green-500 font-mono">ENCRYPTED/STABLE</span>
                         </div>
                         <RefreshCw 
                          onClick={() => handleSearch()}
                          className={`size-6 text-primary cursor-pointer hover:rotate-180 transition-all duration-700 ${loading ? 'animate-spin' : ''}`} 
                         />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
