import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { BookingStep1 } from "@/components/blocks/BookingStep1";
import { BookingStep2 } from "@/components/blocks/BookingStep2";
import { BookingStep3 } from "@/components/blocks/BookingStep3";
import { TourService, type TourResponse } from "@/services/TourService";

export interface BookingFormData {
  scheduleId: number;
  date: string;
  adultCount: number;
  childrenCount: number;
  pickupLocation: string;
  customerNote: string;
  customerName: string;
  email: string;
  phone: string;
  paymentMethod: "VNPAY" | "VISA";
  tourType: "GROUP" | "PRIVATE";
}

const DEFAULT_FORM: BookingFormData = {
  scheduleId: 0,
  date: "",
  adultCount: 1,
  childrenCount: 0,
  pickupLocation: "",
  customerNote: "",
  customerName: "",
  email: "",
  phone: "",
  paymentMethod: "VNPAY",
  tourType: "GROUP",
};

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const tourId = Number(searchParams.get("tourId")) || undefined;

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<BookingFormData>(DEFAULT_FORM);
  const [tour, setTour] = useState<TourResponse | null>(null);
  const [confirmedBookingCode, setConfirmedBookingCode] = useState<string | undefined>();

  useEffect(() => {
    if (tourId) {
      TourService.getTourById({ id: tourId })
        .then(setTour)
        .catch(console.error);
    }
  }, [tourId]);

  const updateForm = (patch: Partial<BookingFormData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header & Progress Bar (hidden on Step 3) */}
          {currentStep < 3 && (
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                    {tour?.tourName ?? "Book Your Adventure"}
                  </h1>
                  <div className="flex items-center text-sm text-muted-foreground gap-2 flex-wrap">
                    {tour?.duration && (
                      <>
                        <span className="font-bold">{tour.duration} Hours</span>
                        <span className="mx-1">•</span>
                      </>
                    )}
                    <span className="text-primary font-medium">Free Cancellation</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="w-full bg-card/50 rounded-xl p-6 border border-border">
                <div className="flex-1 w-full relative">
                  <div className="flex justify-between mb-2">
                    {["01. Date & Guests", "02. Payment", "03. Confirmation"].map(
                      (label, i) => (
                        <span
                          key={label}
                          className={`text-sm font-medium ${currentStep >= i + 1 ? "text-primary" : "text-muted-foreground"}`}
                        >
                          {label}
                        </span>
                      )
                    )}
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${currentStep === 1 ? 33 : currentStep === 2 ? 66 : 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Steps */}
          <div className="mt-8 transition-all duration-500">
            {currentStep === 1 && (
              <BookingStep1
                tourId={tourId}
                tour={tour}
                form={form}
                onUpdateForm={updateForm}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <BookingStep2
                tour={tour}
                form={form}
                onUpdateForm={updateForm}
                onBack={prevStep}
                onNext={(bookingCode) => {
                  setConfirmedBookingCode(bookingCode);
                  nextStep();
                }}
              />
            )}
            {currentStep === 3 && (
              <BookingStep3 bookingCode={confirmedBookingCode} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
