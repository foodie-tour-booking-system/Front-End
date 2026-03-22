import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Loader2,
  AlertCircle,
  Navigation,
  Ship,
  Waves,
  RefreshCw,
  Hash,
  CalendarDays,
} from "lucide-react";
import { ScheduleService, type ScheduleResponse } from "@/services/ScheduleService";
import { format, parseISO } from "date-fns";

export function TrackingPage() {
  const { bookingCode: urlCode } = useParams();
  const [bookingCode, setBookingCode] = useState(urlCode || "");
  const [tracking, setTracking] = useState<TrackingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Relocate State
  const [schedules, setSchedules] = useState<ScheduleResponse[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | "">("");
  const [relocateState, setRelocateState] = useState<"idle" | "sending_otp" | "otp_sent" | "verifying" | "success">("idle");
  const [relocateToken, setRelocateToken] = useState("");
  const [otp, setOtp] = useState("");
  const [relocateError, setRelocateError] = useState("");
  const [relocateMsg, setRelocateMessage] = useState("");

  const handleSearch = async (code?: string) => {
    const rawCode = code || bookingCode;
    const searchCode = rawCode.replace("#", "").trim().toUpperCase();

    if (!searchCode) return;

    setLoading(true);
    setError("");
    setRelocateState("idle");
    setOtp("");
    setRelocateToken("");
    setSelectedScheduleId("");

    try {
      const res = await BookingService.getTracking({ bookingCode: searchCode });
      setTracking(res);

      // Fetch booking details to get tourId and schedules
      try {
         const bookingDetails = await BookingService.getBookingById({ bookingCode: searchCode });
         if (bookingDetails.tourId) {
            const schs = await ScheduleService.getSchedules({ tourId: bookingDetails.tourId, scheduleStatus: "ACTIVE" });
            setSchedules(schs);
         }
      } catch (e) {
         console.error("Could not fetch additional booking details for relocation.");
      }

    } catch (err: any) {
      setError("Sorry, we couldn't find any tour with this booking code. Please check your reference and try again.");
      setTracking(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestRelocate = async () => {
    if (!tracking || !selectedScheduleId) return;
    setRelocateState("sending_otp");
    setRelocateError("");
    try {
      const token = await BookingService.relocateBooking({ bookingCode: tracking.bookingCode });
      setRelocateToken(token);
      setRelocateState("otp_sent");
      setRelocateMessage("OTP has been sent to your email.");
    } catch (err: any) {
      setRelocateError(err?.message || "Failed to send OTP.");
      setRelocateState("idle");
    }
  };

  const handleVerifyRelocate = async () => {
    if (!tracking || !otp || !selectedScheduleId) return;
    setRelocateState("verifying");
    setRelocateError("");
    try {
      await BookingService.verifyBooking({
         bookingCode: tracking.bookingCode,
         otp,
         scheduleId: Number(selectedScheduleId)
      }, relocateToken);
      setRelocateState("success");
      setRelocateMessage("Your relocation request has been sent for approval.");
    } catch (err: any) {
      setRelocateError(err?.message || "Invalid OTP or request failed.");
      setRelocateState("otp_sent"); // Let them try OTP again
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
                 Ready for departure? Monitor your tour in real-time.
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

              <div className="lg:col-span-8 flex flex-col gap-8">
                 {/* Real-time map placeholder or itinerary can go here */}
                 <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 dark:shadow-none flex-1">
                    <div className="flex items-center justify-between mb-8">
                       <div>
                          <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-1">Change Schedule</h3>
                          <p className="text-muted-foreground font-medium text-sm">Need to move to another time? Request a relocation.</p>
                       </div>
                       <div className="px-4 py-2 bg-secondary text-muted-foreground rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                         <CalendarDays className="size-3" /> Relocate
                       </div>
                    </div>

                    {relocateState === "success" ? (
                       <div className="bg-green-500/10 border border-green-500/20 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center">
                          <CheckCircle2 className="size-16 text-green-500 mb-6" />
                          <h4 className="text-2xl font-black text-green-600 uppercase tracking-tight mb-2">Request Submitted</h4>
                          <p className="text-green-600/80 font-medium">{relocateMsg}</p>
                       </div>
                    ) : tracking.bookingStatus !== "PENDING" && tracking.bookingStatus !== "CONFIRMED" ? (
                       <div className="bg-secondary/50 rounded-[2rem] p-8 text-center text-muted-foreground">
                          Cannot request relocation for a booking that is already {tracking.bookingStatus}.
                       </div>
                    ) : (
                       <div className="max-w-xl space-y-6">
                          {relocateError && (
                             <div className="px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-start gap-3">
                                <AlertCircle className="size-5 shrink-0 mt-0.5" />
                                {relocateError}
                             </div>
                          )}

                          {relocateState === "idle" || relocateState === "sending_otp" ? (
                             <div className="space-y-6 animate-in fade-in duration-500">
                                <div>
                                   <label className="text-xs font-black text-foreground uppercase tracking-widest mb-3 block">Available Schedules</label>
                                   <select
                                      className="w-full h-14 px-5 rounded-2xl bg-secondary/50 border border-border focus:ring-2 focus:ring-primary focus:outline-none appearance-none font-medium"
                                      value={selectedScheduleId}
                                      onChange={(e) => setSelectedScheduleId(e.target.value === "" ? "" : Number(e.target.value))}
                                      disabled={relocateState === "sending_otp"}
                                   >
                                      <option value="" disabled>-- Select a new time --</option>
                                      {schedules.map(sch => (
                                         <option key={sch.scheduleId} value={sch.scheduleId}>
                                            {sch.departureAt ? format(parseISO(sch.departureAt), "PPP 'at' HH:mm") : `Template ID: ${sch.scheduleId}`}
                                         </option>
                                      ))}
                                   </select>
                                   {schedules.length === 0 && <p className="text-xs text-muted-foreground mt-2">No alternative schedules found.</p>}
                                </div>

                                <Button
                                   onClick={handleRequestRelocate}
                                   disabled={relocateState === "sending_otp" || !selectedScheduleId}
                                   className="w-full h-14 rounded-2xl font-black uppercase tracking-wider shadow-lg shadow-primary/20"
                                >
                                   {relocateState === "sending_otp" ? <Loader2 className="animate-spin size-5" /> : "Request Relocation (Email OTP)"}
                                </Button>
                             </div>
                          ) : (
                             <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-primary text-sm font-bold text-center">
                                  {relocateMsg}
                                </div>
                                <div>
                                   <label className="text-xs font-black text-foreground uppercase tracking-widest mb-3 block text-center">Enter 6-Character OTP</label>
                                   <Input
                                      value={otp}
                                      onChange={(e) => setOtp(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
                                      placeholder="A B C 1 2 3"
                                      className="h-16 tracking-[1em] text-center text-3xl font-mono font-black bg-secondary/50 border-border rounded-2xl text-primary focus-visible:ring-primary/50"
                                      maxLength={6}
                                   />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                   <Button
                                      variant="outline"
                                      onClick={() => { setRelocateState("idle"); setOtp(""); setRelocateError(""); }}
                                      className="h-14 sm:w-1/3 rounded-2xl font-bold border-border"
                                   >
                                      Cancel
                                   </Button>
                                   <Button
                                      onClick={handleVerifyRelocate}
                                      disabled={relocateState === "verifying" || otp.length < 6}
                                      className="h-14 sm:w-2/3 rounded-2xl font-black uppercase tracking-wider"
                                   >
                                      {relocateState === "verifying" ? <Loader2 className="animate-spin size-5" /> : "Confirm Relocation"}
                                   </Button>
                                </div>
                             </div>
                          )}
                       </div>
                    )}
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
