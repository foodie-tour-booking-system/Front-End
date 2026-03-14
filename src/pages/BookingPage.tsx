import { useState } from "react";
import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { BookingStep1 } from "@/components/blocks/BookingStep1";
import { BookingStep2 } from "@/components/blocks/BookingStep2";
import { BookingStep3 } from "@/components/blocks/BookingStep3";

export function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header & Progress Bar (Hidden on Step 3) */}
          {currentStep < 3 && (
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                    Saigon Night Food Tour
                  </h1>
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <span className="font-bold">4 Hours</span>
                    <span className="mx-2">•</span>
                    <span className="font-bold">Max 10 Guests</span>
                    <span className="mx-2">•</span>
                    <span className="text-primary font-medium">
                      Free Cancellation
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full bg-card/50 rounded-xl p-6 border border-border">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1 w-full relative">
                    <div className="flex justify-between mb-2">
                      <span
                        className={`text-sm font-medium ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}
                      >
                        01. Date & Guests
                      </span>
                      <span
                        className={`text-sm font-medium ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}
                      >
                        02. Payment
                      </span>
                      <span
                        className={`text-sm font-medium ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}
                      >
                        03. Confirmation
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#f1c40f] rounded-full transition-all duration-500 ease-in-out"
                        style={{
                          width:
                            currentStep === 1
                              ? "33%"
                              : currentStep === 2
                                ? "66%"
                                : "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Steps */}
          <div className="mt-8 transition-all duration-500">
            {currentStep === 1 && <BookingStep1 onNext={nextStep} />}
            {currentStep === 2 && (
              <BookingStep2 onNext={nextStep} onBack={prevStep} />
            )}
            {currentStep === 3 && <BookingStep3 />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
