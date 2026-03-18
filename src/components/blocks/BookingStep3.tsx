import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Calendar, MapPin, CreditCard, Loader2, AlertTriangle } from "lucide-react";
import { BookingService, type BookingResponse } from "@/services/BookingService";

interface BookingStep3Props {
  bookingCode?: string;
}

function formatDate(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-400/30",
  COMPLETED: "bg-green-500/10 text-green-600 border-green-400/30",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-400/30",
};

export function BookingStep3({ bookingCode }: BookingStep3Props) {
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingCode) return;
    setLoading(true);
    BookingService.getBookingById({ bookingCode })
      .then(setBooking)
      .catch((err) => setError(err?.message ?? "Could not load booking details."))
      .finally(() => setLoading(false));

    // Redirect to dashboard after 8 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 8000);

    return () => clearTimeout(timer);
  }, [bookingCode, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground gap-2 animate-in fade-in">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        Loading booking details…
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 animate-in slide-in-from-bottom-8 duration-700">

      {/* Success Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-in zoom-in duration-500 delay-150">
          <CheckCircle2 className="text-green-500 w-10 h-10" />
        </div>
        <div>
          <h1 className="text-foreground text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground text-base max-w-md">
            Your booking has been received. A confirmation has been sent to{" "}
            <span className="text-primary font-semibold">your email</span>.
          </p>
          <p className="text-sm text-muted-foreground mt-4 italic">
            Redirecting to your booking history in 8 seconds...
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
          {bookingCode && (
            <span className="ml-1 font-semibold">Booking Code: {bookingCode}</span>
          )}
        </div>
      )}

      {/* Booking Details Card */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-4 bg-secondary/30 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
              Booking Reference
            </p>
            <p className="text-foreground text-lg font-bold font-mono tracking-wide">
              {booking?.bookingCode ?? bookingCode ?? "—"}
            </p>
          </div>
          {booking?.bookingStatus && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                STATUS_COLORS[booking.bookingStatus] ?? "bg-secondary text-muted-foreground border-border"
              }`}
            >
              {booking.bookingStatus}
            </span>
          )}
        </div>

        {/* Details Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="text-primary w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-0.5">Departure</p>
              <p className="text-foreground font-semibold text-sm">{formatDate(booking?.departureTime)}</p>
              <p className="text-muted-foreground text-xs mt-0.5">Please arrive 15 mins early</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="text-primary w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-0.5">Pickup Location</p>
              <p className="text-foreground font-semibold text-sm">
                {booking?.pickupLocation || "As arranged"}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CreditCard className="text-primary w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-0.5">Total Paid</p>
              <p className="text-foreground font-semibold text-sm">
                {booking?.totalPrice != null
                  ? `${booking.totalPrice.toLocaleString()} VND`
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-5 border-t border-border bg-secondary/10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm transition-all hover:bg-primary/90 shadow-lg uppercase"
          >
            View My Bookings
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card border border-border hover:bg-secondary/30 text-foreground font-bold text-sm transition-all uppercase"
          >
            Back to Home
          </Link>
        </div>
      </div>

    </div>
  );
}
