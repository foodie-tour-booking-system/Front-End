import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { VnPayService } from "@/services/VnPayService";
import { Navbar } from "@/components/blocks/Navbar";
import { Footer } from "@/components/blocks/Footer";
import type { BookingResponse } from "@/services/BookingService";

interface VNPayResult {
  status: "SUCCESS" | "FAILED";
  message: string;
  booking: BookingResponse;
}

export function VnPayResultPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VNPayResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams.entries());
    console.log("[VnPay] Query params:", queryParams);

    VnPayService.handlePaymentCallback(queryParams)
      .then((res: VNPayResult) => {
        console.log("[VnPay] Callback response:", res);
        setResult(res);
      })
      .catch((err) => {
        console.error("[VnPay] Callback error:", err);
        setError(
          typeof err === "string"
            ? err
            : (err?.message ?? "Không thể xác minh kết quả thanh toán."),
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <h2 className="text-2xl font-bold">Verifying Payment...</h2>
            <p className="text-muted-foreground">
              Please do not close this window.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-card rounded-2xl border border-border p-8 text-center space-y-6 shadow-xl">
            <XCircle className="w-20 h-20 text-red-500 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Verification Failed</h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
            <Link
              to="/"
              className="inline-block w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isSuccess = result?.status === "SUCCESS";
  const booking = result?.booking;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {isSuccess ? (
            <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-2xl animate-in zoom-in duration-500">
              <div className="bg-green-500 p-8 text-white text-center">
                <CheckCircle2 className="w-20 h-20 mx-auto mb-4" />
                <h1 className="text-4xl font-black tracking-tight">
                  Booking Confirmed!
                </h1>
                <p className="mt-2 text-green-100 font-medium opacity-90">
                  {result?.message ||
                    "Your payment was processed successfully."}
                </p>
              </div>

              <div className="p-8 md:p-12 space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
                        Booking Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-muted-foreground">
                            Booking Code
                          </span>
                          <span className="font-black text-primary bg-primary/5 px-3 py-1 rounded-lg">
                            #{booking?.bookingCode}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-muted-foreground">
                            Total Price
                          </span>
                          <span className="font-bold">
                            {booking?.totalPrice?.toLocaleString()} VND
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-muted-foreground">
                            Amount Paid
                          </span>
                          <span className="font-bold text-green-600">
                            {booking?.amountPaid?.toLocaleString()} VND
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
                        Tour Highlights
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold">Departure Date</p>
                            <p className="text-sm text-muted-foreground font-medium">
                              {booking?.departureTime
                                ? new Date(
                                    booking.departureTime,
                                  ).toLocaleDateString()
                                : "To be confirmed"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold">Pickup Location</p>
                            <p className="text-sm text-muted-foreground font-medium">
                              {booking?.pickupLocation || "TBA"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold">Duration</p>
                            <p className="text-sm text-muted-foreground font-medium">
                              {booking?.duration} Hours
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    to={`/tracking/${booking?.bookingCode}`}
                    className="flex-1 text-center py-4 px-6 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Manage Booking <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/"
                    className="flex-1 text-center py-4 px-6 bg-secondary text-secondary-foreground rounded-2xl font-bold text-lg hover:bg-secondary/80 transition-all duration-300"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-2xl animate-in zoom-in duration-500">
              <div className="bg-red-500 p-8 text-white text-center">
                <XCircle className="w-20 h-20 mx-auto mb-4" />
                <h1 className="text-4xl font-black tracking-tight">
                  Payment Failed
                </h1>
                <p className="mt-2 text-red-100 font-medium opacity-90">
                  {result?.message ||
                    "There was an issue processing your payment."}
                </p>
              </div>
              <div className="p-12 text-center space-y-8">
                <p className="text-lg text-muted-foreground font-medium max-w-md mx-auto">
                  Don't worry, your booking hasn't been cancelled yet. You can
                  try paying again from your dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Link
                    to="/booking"
                    className="flex-1 py-4 px-6 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Try Again
                  </Link>
                  <Link
                    to="/"
                    className="flex-1 py-4 px-6 bg-secondary text-secondary-foreground rounded-2xl font-bold text-lg hover:bg-secondary/80 transition-all duration-300"
                  >
                    Return Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
