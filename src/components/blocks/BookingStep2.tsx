import { useState } from "react";
import { ShieldCheck, Loader2, AlertTriangle, Wallet, CreditCard, Smartphone } from "lucide-react";
import { BookingService } from "@/services/BookingService";
import type { TourResponse } from "@/services/TourService";
import type { BookingFormData } from "@/pages/BookingPage";

interface BookingStep2Props {
  tour: TourResponse | null;
  form: BookingFormData;
  onUpdateForm: (patch: Partial<BookingFormData>) => void;
  onBack: () => void;
  onNext: (bookingCode: string) => void;
}

const PAYMENT_OPTIONS: { value: "VNPAY" | "MOMO" | "VISA"; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: "VNPAY",
    label: "VNPay",
    icon: <Wallet className="w-5 h-5" />,
    description: "Pay via VNPay e-wallet or internet banking",
  },
  {
    value: "MOMO",
    label: "MoMo",
    icon: <Smartphone className="w-5 h-5" />,
    description: "Pay via MoMo mobile wallet",
  },
  {
    value: "VISA",
    label: "Visa / Credit Card",
    icon: <CreditCard className="w-5 h-5" />,
    description: "Pay with Visa, Mastercard, or JCB",
  },
];

export function BookingStep2({ tour, form, onUpdateForm, onBack, onNext }: BookingStep2Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const adultPrice = tour?.basePriceAdult ?? 0;
  const childPrice = tour?.basePriceChild ?? 0;
  const totalPrice = form.adultCount * adultPrice + form.childrenCount * childPrice;

  const handlePay = async () => {
    setError("");
    setLoading(true);
    try {
      // 1. Create booking
      const booking = await BookingService.createBooking({
        scheduleId: form.scheduleId,
        date: form.date,
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        adultCount: form.adultCount,
        childrenCount: form.childrenCount,
        pickupLocation: form.pickupLocation,
        customerNote: form.customerNote,
        paymentMethod: form.paymentMethod,
      });

      // Save booking code to local history
      try {
        const history = JSON.parse(localStorage.getItem("booking_history") || "[]");
        if (!history.includes(booking.bookingCode)) {
          history.push(booking.bookingCode);
          localStorage.setItem("booking_history", JSON.stringify(history));
        }
      } catch (e) {
        console.error("Failed to save booking history", e);
      }

      if (!booking.bookingId) throw new Error("Booking creation failed – no booking ID returned.");

      // 2. Generate payment URL
      let url: string | null = null;
      try {
        url = await BookingService.generatePaymentUrl_2({ bookingId: booking.bookingId });
        setPaymentUrl(url);
      } catch {
        // Payment URL generation may fail in dev – still continue to confirmation
      }

      // 3. If we have a URL, redirect to it; otherwise go to confirmation
      if (url) {
        window.location.href = url;
        return; // Stop execution here as we are redirecting
      }

      onNext(booking.bookingCode ?? "");
    } catch (err: any) {
      setError(err?.message ?? "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm font-medium text-muted-foreground">
        <ol className="flex items-center space-x-2">
          <li>
            <button onClick={onBack} className="hover:text-primary transition-colors">
              Select Tour
            </button>
          </li>
          <li><span className="mx-2">/</span></li>
          <li className="text-primary">Payment Details</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left – Payment Methods */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Select Payment Method</h1>
            <p className="text-muted-foreground">Choose how you'd like to pay for your adventure.</p>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            {PAYMENT_OPTIONS.map((opt, i) => {
              const isSelected = form.paymentMethod === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onUpdateForm({ paymentMethod: opt.value })}
                  className={`w-full flex items-center gap-4 px-6 py-5 text-left transition-all ${
                    i > 0 ? "border-t border-border" : ""
                  } ${isSelected ? "bg-primary/10" : "hover:bg-secondary/30"}`}
                >
                  {/* Radio dot */}
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? "border-primary" : "border-border"
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>

                  <div className={`flex-shrink-0 p-2 rounded-lg ${isSelected ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                    {opt.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{opt.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Extra note for VISA */}
          {form.paymentMethod === "VISA" && (
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-4 animate-in slide-in-from-left-4 duration-300">
              <p className="text-sm font-medium text-muted-foreground">
                You'll be redirected to our secure payment page to enter your card details.
              </p>
            </div>
          )}

          {paymentUrl && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-sm text-green-700 dark:text-green-400">
              Payment page generated.{" "}
              <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                Click here to complete payment ↗
              </a>
            </div>
          )}
        </div>

        {/* Right – Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-card rounded-xl border border-border p-6 sticky top-24 shadow-lg">
            <h3 className="text-lg font-bold text-foreground mb-6">Order Summary</h3>

            {/* Mini tour card */}
            <div className="flex gap-4 mb-6 pb-6 border-b border-border">
              <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2670&auto=format&fit=crop"
                  alt="Tour"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-foreground leading-tight mb-1">
                  {tour?.tourName ?? "Tour"}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {tour?.duration ? `${tour.duration} Hours` : ""}
                </p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2.5 text-sm mb-6">
              {form.adultCount > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>{form.adultCount} Adults × {adultPrice.toLocaleString()} VND</span>
                  <span className="font-medium text-foreground">
                    {(form.adultCount * adultPrice).toLocaleString()} VND
                  </span>
                </div>
              )}
              {form.childrenCount > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>{form.childrenCount} Children × {childPrice.toLocaleString()} VND</span>
                  <span className="font-medium text-foreground">
                    {(form.childrenCount * childPrice).toLocaleString()} VND
                  </span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-border flex justify-between items-end mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-0.5">Total Price</p>
                <p className="text-xs text-muted-foreground">Includes all taxes</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{totalPrice.toLocaleString()}<span className="text-sm font-medium ml-1">VND</span></p>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
              ) : (
                <>Pay Now</>
              )}
            </button>

            {/* Security badge */}
            <div className="mt-5 flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium bg-secondary/50 px-3 py-1.5 rounded-full">
                <ShieldCheck className="text-green-500 w-4 h-4" />
                Secure SSL Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
