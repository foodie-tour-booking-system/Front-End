import { useEffect, useState } from "react";
import { Navbar } from "@/components/blocks/Navbar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthService } from "@/services/AuthService";
import { BookingService, type BookingResponse } from "@/services/BookingService";
import { ScheduleService, type ScheduleResponse } from "@/services/ScheduleService";
import { jwtDecode } from "jwt-decode";
import { MapPin, Hash, Calendar, Loader2, CreditCard, X, Ticket, CheckCircle2, QrCode, AlertTriangle, CalendarSync, User, Lock, Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";

function formatDateTimeRange(startIso?: string, duration?: number) {
  if (!startIso) return "—";
  try {
    const start = new Date(startIso);
    const durMs = duration ? (duration > 24 ? duration * 60 * 1000 : duration * 60 * 60 * 1000) : 0;
    const end = durMs ? new Date(start.getTime() + durMs) : null;
    
    const dateStr = start.toLocaleDateString("en-US", { dateStyle: "medium" });
    const startTimeStr = start.toLocaleTimeString("en-US", { timeStyle: "short" });
    
    if (!end) return `${dateStr}, ${startTimeStr}`;
    
    if (start.getDate() === end.getDate()) {
       return `${dateStr}, ${startTimeStr} - ${end.toLocaleTimeString("en-US", { timeStyle: "short" })}`;
    } else {
       return `${startTimeStr} ${dateStr} - ${end.toLocaleTimeString("en-US", { timeStyle: "short" })} ${end.toLocaleDateString("en-US", { dateStyle: "medium" })}`;
    }
  } catch {
    return startIso;
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
              <p className="text-sm font-bold text-foreground">{formatDateTimeRange(booking.departureTime, booking.duration)}</p>
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

// Reschedule / Relocate Modal
function RescheduleRelocateModal({ booking, onClose, onSuccess }: { booking: BookingResponse; onClose: () => void; onSuccess: () => void }) {
  const [activeTab, setActiveTab] = useState<"reschedule" | "relocate">("reschedule");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Reschedule
  const [rescheduleScheduleId, setRescheduleScheduleId] = useState("");
  const [rescheduleSchedules, setRescheduleSchedules] = useState<ScheduleResponse[]>([]);
  const [loadingRescheduleSchedules, setLoadingRescheduleSchedules] = useState(false);

  // Relocate
  const [relocateStep, setRelocateStep] = useState<1 | 2>(1);
  const [relocateToken, setRelocateToken] = useState(""); // ← token trả về từ bước gửi OTP
  const [otp, setOtp] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [schedules, setSchedules] = useState<ScheduleResponse[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);

  // Load schedules for reschedule tab — chỉ lịch cùng tour, trong tương lai
  useEffect(() => {
    if (activeTab === "reschedule" && rescheduleSchedules.length === 0) {
      setLoadingRescheduleSchedules(true);
      ScheduleService.getSchedules({
        tourId: booking.tourId,          // ← chỉ lấy lịch của cùng 1 tour
        scheduleStatus: "ACTIVE",
      })
        .then(res => {
          const now = new Date();
          const future = (res || []).filter(s => {
            if (!s.departureAt) return false;
            const depDate = new Date(s.departureAt);
            // Loại bỏ lịch trong quá khứ và lịch hiện tại của booking này
            return depDate > now && s.departureAt !== booking.departureTime;
          });
          setRescheduleSchedules(future);
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingRescheduleSchedules(false));
    }
  }, [activeTab, rescheduleSchedules.length]);


  // Load schedules for relocate tab
  useEffect(() => {
    if (activeTab === "relocate" && relocateStep === 2 && schedules.length === 0) {
      setLoadingSchedules(true);
      ScheduleService.getSchedules()
        .then(res => {
          setSchedules(res || []);
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingSchedules(false));
    }
  }, [activeTab, relocateStep, schedules.length]);

  const handleReschedule = async () => {
    if (!rescheduleScheduleId) {
      setError("Please select a new schedule.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      // Gửi scheduleId để Backend tìm chính xác lịch trình
      await BookingService.rescheduleBooking({
        bookingId: booking.bookingId,
        scheduleId: Number(rescheduleScheduleId),
        reason: "Reschedule request from user",

      });
      setSuccessMsg("Schedule changed successfully!");

      onSuccess();
      setTimeout(onClose, 2000);
    } catch (err: any) {
      setError(err?.message || "Error changing schedule.");

    } finally {
      setLoading(false);
    }
  };

  const handleRelocateStart = async () => {
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      // Backend trả về relocate-token đặc biệt (khác với JWT đăng nhập)
      const token = await BookingService.relocateBooking({ bookingCode: booking.bookingCode! });
      setRelocateToken(token); // ← lưu lại token để dùng ở bước 2
      setRelocateStep(2);
      setSuccessMsg("OTP has been sent to your email.");

    } catch (err: any) {
      setError(err?.message || "Error initiating request.");

    } finally {
      setLoading(false);
    }
  };

  const handleRelocateVerify = async () => {
    if (!otp || !scheduleId) {
      setError("Please enter OTP and select a new schedule.");

      return;
    }
    if (!relocateToken) {
      setError("Session expired. Please start again.");

      return;
    }
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      // Truyền đúng relocate-token (trả về từ bước gửi OTP), KHÔNG phải JWT cookie
      await BookingService.verifyBooking({
        bookingCode: booking.bookingCode,
        otp,
        scheduleId: Number(scheduleId),
      }, relocateToken);
      setSuccessMsg("OTP verified! Reschedule request created successfully!");

      onSuccess();
      setTimeout(onClose, 2000);
    } catch (err: any) {
      setError(err?.message || "Invalid OTP or error.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <CalendarSync className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Change Schedule</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("reschedule")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === "reschedule" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:bg-secondary/20"
            }`}
          >
            Quick Reschedule
          </button>
          <button
            onClick={() => setActiveTab("relocate")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === "relocate" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:bg-secondary/20"
            }`}
          >
            Change Tour (OTP)
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              {successMsg}
            </div>
          )}

          {activeTab === "reschedule" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Select New Schedule</label>
                {loadingRescheduleSchedules ? (
                  <div className="flex items-center justify-center h-11 gap-2 text-muted-foreground text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading schedules...
                  </div>
                ) : rescheduleSchedules.length === 0 ? (
                  <div className="flex items-center justify-center h-11 text-muted-foreground text-sm border border-dashed border-border rounded-lg">
                    No schedules available
                  </div>
                ) : (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {rescheduleSchedules.map(s => (
                      <button
                        key={s.scheduleId}
                        type="button"
                        onClick={() => setRescheduleScheduleId(String(s.scheduleId))}
                        className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${
                          rescheduleScheduleId === String(s.scheduleId)
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-background hover:border-primary/50 hover:bg-primary/5 text-foreground"
                        }`}
                      >
                        <p className="text-sm font-bold">{formatDateTimeRange(s.departureAt)}</p>
                        {s.scheduleDescription && (
                          <p className="text-xs text-muted-foreground mt-0.5">{s.scheduleDescription}</p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={handleReschedule} disabled={loading || !rescheduleScheduleId} className="w-full font-bold">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Submit Reschedule Request
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {relocateStep === 1 ? (
                <>
                  <p className="text-sm text-muted-foreground">An OTP will be sent to your email to verify the tour change request.</p>
                  <Button onClick={handleRelocateStart} disabled={loading} className="w-full font-bold">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Start (Send OTP)
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">OTP Code</label>
                    <input
                      type="text"
                      placeholder="Enter OTP from your email"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full flex h-11 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Select New Schedule</label>
                    <div className="relative">
                      <select
                        value={scheduleId}
                        onChange={(e) => setScheduleId(e.target.value)}
                        disabled={loadingSchedules}
                        className="w-full flex h-11 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <option value="" disabled>
                          {loadingSchedules ? "Loading schedules..." : "-- Select new schedule --"}
                        </option>
                        {schedules.map(s => (
                          <option key={s.scheduleId} value={s.scheduleId}>
                            {s.scheduleDescription || formatDateTimeRange(s.departureAt)} (ID: {s.scheduleId})
                          </option>
                        ))}
                      </select>
                      {loadingSchedules && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <Button onClick={handleRelocateVerify} disabled={loading} className="w-full font-bold">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Confirm & Submit Request
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Account Settings Panel Component
function AccountSettingsPanel({ userInfo }: { userInfo: { name: string; email: string } | null }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const hasLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^0-9a-zA-Z]/.test(password);
  const strength = [hasLength, hasNumber, hasSpecial].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (password.length === 0) return "Not set";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Strong";
    return "Weak";
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      // Mocking API call for now as no endpoint exists in AuthService yet
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage({ type: "success", text: "Password updated successfully!" });
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold mb-4 border-4 border-background shadow-inner">
                {userInfo?.name.charAt(0) || "U"}
              </div>
              <h3 className="text-lg font-bold text-foreground">{userInfo?.name || "User"}</h3>
              <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">Premium Member</p>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email Address</p>
                  <p className="text-sm font-medium text-foreground truncate">{userInfo?.email || "n/a"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Account Status</p>
                  <p className="text-sm font-medium text-green-500">Verified</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Security Tip
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enable two-factor authentication to add an extra layer of security to your account and protect your personal data.
            </p>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-border bg-secondary/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Security & Password
              </h3>
            </div>
            
            <form onSubmit={handleUpdatePassword} className="p-6 space-y-6">
              {message.text && (
                <div className={`p-3 rounded-lg flex items-center gap-2 text-sm font-medium animate-in zoom-in-95 ${
                  message.type === "success" ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-red-500/10 text-red-600 border border-red-500/20"
                }`}>
                  {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Password */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Current Password</label>
                  <div className="relative">
                    <input 
                      type={showCurrent ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">New Password</label>
                  <div className="relative">
                    <input 
                      type={showNew ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Strength Meter */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Security</span>
                      <span className={`text-[10px] font-bold uppercase ${
                        strength === 3 ? "text-green-500" : strength === 2 ? "text-primary" : "text-muted-foreground"
                      }`}>{getStrengthLabel()}</span>
                    </div>
                    <div className="flex gap-1 h-1">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex-1 rounded-full ${
                          strength >= s ? (strength === 3 ? "bg-green-500" : "bg-primary") : "bg-secondary"
                        }`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                    <button 
                       type="button"
                       onClick={() => setShowConfirm(!showConfirm)}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button disabled={loading || !password || password !== confirmPassword} className="font-bold px-8 shadow-lg shadow-primary/20">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"bookings" | "settings">("bookings");
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<BookingResponse | null>(null);
  const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState<BookingResponse | null>(null);
  const [activeBookingId, setActiveBookingId] = useState<number | null>(null);

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
          return new Date(b.departureTime || "").getTime() - new Date(a.departureTime || "").getTime();
        });
        
        setBookings(sorted);
        if (sorted.length > 0) {
          setActiveBookingId(sorted[0].bookingId!);
        }
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

  const currentBooking = activeBookingId 
    ? bookings.find(b => b.bookingId === activeBookingId) || bookings[0]
    : bookings.length > 0 ? bookings[0] : null;
    
  const pastBookings = currentBooking 
    ? bookings.filter(b => b.bookingId !== currentBooking.bookingId) 
    : [];

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

      {selectedBookingForReschedule && (
        <RescheduleRelocateModal
          booking={selectedBookingForReschedule}
          onClose={() => setSelectedBookingForReschedule(null)}
          onSuccess={() => {
            // Optional: refresh data if needed
          }}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="hidden w-64 flex-col border-r border-border bg-card p-6 lg:flex overflow-y-auto">
          <div className="flex items-center gap-4 pb-8 border-b border-border mb-6">
            <div className="bg-primary/20 size-12 rounded-full flex items-center justify-center text-primary font-bold text-xl uppercase shadow-inner">
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
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "bookings" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-secondary text-muted-foreground"
              }`}
            >
              <Ticket className="w-5 h-5 shrink-0" />
              <span className="font-bold">My Bookings</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "settings" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-secondary text-muted-foreground"
              }`}
            >
              <User className="w-5 h-5 shrink-0" />
              <span className="font-bold">Account Settings</span>
            </button>
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
            {activeTab === "bookings" ? (
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
                          <h2 className="text-xl font-bold text-foreground">Trip Details</h2>
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border ${
                            ['COMPLETED', 'CONFIRMED', 'RESCHEDULED'].includes(currentBooking.bookingStatus || '')
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
                                <p className="text-sm font-bold text-foreground">{formatDateTimeRange(currentBooking.departureTime, currentBooking.duration)}</p>
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
                                 onClick={() => setSelectedBookingForReschedule(currentBooking)}
                                 variant="secondary" 
                                 className="flex-1 sm:flex-none font-bold px-8"
                               >
                                 Change Schedule
                               </Button>
                               <Button 
                                 onClick={() => setSelectedBookingForPass(currentBooking)}
                                 variant="outline" 
                                 className="flex-1 sm:flex-none font-bold px-8 border-border"
                               >
                                 View Pass
                               </Button>
                               <Link to={`/tracking/${currentBooking.bookingCode}`} className="flex-1 sm:flex-none">
                                 <Button variant="outline" className="w-full font-bold px-8 border-primary text-primary hover:bg-primary/5">
                                   Track Journey
                                 </Button>
                               </Link>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Other Bookings */}
                    {pastBookings.length > 0 && (
                      <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">Other Bookings</h2>
                        <div className="grid gap-3">
                          {pastBookings.map((b) => (
                            <div 
                              key={b.bookingId} 
                              onClick={() => setActiveBookingId(b.bookingId!)}
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
                                    {formatDateTimeRange(b.departureTime, b.duration)} • <span className={
                                      ['COMPLETED', 'CONFIRMED', 'RESCHEDULED'].includes(b.bookingStatus || '')
                                        ? 'text-green-600 font-bold'
                                        : b.bookingStatus === 'CANCELLED'
                                        ? 'text-red-500 font-bold'
                                        : 'font-bold'
                                    }>{b.bookingStatus}</span>
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
            ) : (
              <AccountSettingsPanel userInfo={userInfo} />
            )}
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
