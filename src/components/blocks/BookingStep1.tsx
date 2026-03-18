import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScheduleService, type ScheduleResponse } from "@/services/ScheduleService";
import type { TourResponse } from "@/services/TourService";
import type { BookingFormData } from "@/pages/BookingPage";
import { CalendarDays, Users, MapPin, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";

interface BookingStep1Props {
  tourId?: number;
  tour: TourResponse | null;
  form: BookingFormData;
  onUpdateForm: (patch: Partial<BookingFormData>) => void;
  onNext: () => void;
}

function formatScheduleDate(timeStr?: string) {
  if (!timeStr) return "TBD";
  if (timeStr.length >= 5) {
    return timeStr.slice(0, 5); // Return HH:mm
  }
  return timeStr;
}

export function BookingStep1({ tourId, tour, form, onUpdateForm, onNext }: BookingStep1Props) {
  const [schedules, setSchedules] = useState<ScheduleResponse[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!tourId) return;
    setLoadingSchedules(true);
    ScheduleService.getSchedules({ tourId, scheduleStatus: "ACTIVE" })
      .then(setSchedules)
      .catch(console.error)
      .finally(() => setLoadingSchedules(false));
  }, [tourId]);

  const adultPrice = tour?.basePriceAdult ?? 0;
  const childPrice = tour?.basePriceChild ?? 0;
  const totalPrice = form.adultCount * adultPrice + form.childrenCount * childPrice;

  const changeCount = (field: "adultCount" | "childrenCount", delta: number) => {
    const next = Math.max(0, (form[field] as number) + delta);
    if (field === "adultCount" && next < 1) return; // min 1 adult
    onUpdateForm({ [field]: next });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.scheduleId) e.scheduleId = "Please select a departure schedule.";
    if (!form.dateTime) e.dateTime = "Please select a departure date.";
    if (!form.customerName.trim()) e.customerName = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) onNext();
  };

  const inputCls = (err?: string) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors ${
      err ? "border-destructive focus:ring-destructive" : "border-border"
    }`;

  const selectedSchedule = schedules.find((s) => s.scheduleId === form.scheduleId);

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in slide-in-from-right-8 duration-500">
      {/* Left Column */}
      <div className="flex-1 space-y-6">

        {/* Schedule Selection */}
        <section className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-foreground">
            <CalendarDays className="w-5 h-5 text-primary" />
            Select Departure Schedule
          </h2>

          {loadingSchedules ? (
            <div className="flex items-center gap-2 text-muted-foreground py-6 justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              Loading available schedules…
            </div>
          ) : schedules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarDays className="w-8 h-8 mx-auto mb-2 opacity-30" />
              No available departure schedules for this tour.
            </div>
          ) : (
            <div className="grid gap-3">
              {schedules.map((sch) => {
                const isSelected = form.scheduleId === sch.scheduleId;
                return (
                  <button
                    key={sch.scheduleId}
                    onClick={() => onUpdateForm({ scheduleId: sch.scheduleId! })}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/40 hover:bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground text-sm flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-primary" />
                          Departure Time: <span className="text-xl tracking-wide">{formatScheduleDate(sch.departureAt)}</span>
                        </p>
                        {sch.scheduleNote && (
                          <p className="text-xs text-muted-foreground mt-1">{sch.scheduleNote}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {sch.minPax ?? "?"} – {sch.maxPax ?? "∞"} guests limit
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          {errors.scheduleId && (
            <p className="text-xs text-destructive mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />{errors.scheduleId}
            </p>
          )}

          {/* New Date Picker Input */}
          <div className="mt-5 border-t border-border pt-5">
            <label className="block text-sm font-semibold text-foreground mb-2">Select Departure Date *</label>
            <input
              type="date"
              className={inputCls(errors.dateTime)}
              value={form.dateTime}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => onUpdateForm({ dateTime: e.target.value })}
            />
            {errors.dateTime && (
              <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                 <AlertTriangle className="w-3.5 h-3.5" />{errors.dateTime}
              </p>
            )}
          </div>
        </section>

        {/* Guest Count */}
        <section className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-foreground">
            <Users className="w-5 h-5 text-primary" />
            Select Guests
          </h2>
          <div className="space-y-5">
            {[
              { label: "Adults", sub: "Age 12+", price: adultPrice, field: "adultCount" as const, min: 1 },
              { label: "Children", sub: "Age 4–11", price: childPrice, field: "childrenCount" as const, min: 0 },
            ].map(({ label, sub, price, field, min }) => (
              <div key={field} className="flex items-center justify-between pb-5 border-b border-dashed border-border last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{sub}</p>
                  <p className="text-primary font-bold mt-1 text-sm">
                    {price.toLocaleString()} VND
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-secondary/20 rounded-lg p-1.5 border border-border">
                  <button
                    onClick={() => changeCount(field, -1)}
                    disabled={form[field] <= min}
                    className="size-8 flex items-center justify-center rounded bg-background text-foreground shadow-sm hover:text-primary disabled:opacity-40 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-bold text-lg">{form[field]}</span>
                  <button
                    onClick={() => changeCount(field, 1)}
                    className="size-8 flex items-center justify-center rounded bg-background text-foreground shadow-sm hover:text-primary transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Info */}
        <section className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            Your Details
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Full Name *</label>
                <input
                  className={inputCls(errors.customerName)}
                  placeholder="Nguyen Van A"
                  value={form.customerName}
                  onChange={(e) => onUpdateForm({ customerName: e.target.value })}
                />
                {errors.customerName && <p className="text-xs text-destructive mt-1">{errors.customerName}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Phone *</label>
                <input
                  className={inputCls(errors.phone)}
                  placeholder="+84 90 123 4567"
                  value={form.phone}
                  onChange={(e) => onUpdateForm({ phone: e.target.value })}
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Email *</label>
              <input
                type="email"
                className={inputCls(errors.email)}
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => onUpdateForm({ email: e.target.value })}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Pickup Location</label>
              <input
                className={inputCls()}
                placeholder="Hotel name or address"
                value={form.pickupLocation}
                onChange={(e) => onUpdateForm({ pickupLocation: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Notes</label>
              <textarea
                className={`${inputCls()} resize-none h-20`}
                placeholder="Dietary restrictions, special requests…"
                value={form.customerNote}
                onChange={(e) => onUpdateForm({ customerNote: e.target.value })}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Right – Summary Sidebar */}
      <div className="lg:w-[360px] shrink-0">
        <div className="sticky top-24">
          <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
            {/* Tour image */}
            <div className="h-32 w-full relative bg-secondary">
              <img
                className="h-full w-full object-cover opacity-80"
                alt={tour?.tourName ?? "Tour"}
                src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2670&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="p-5">
              <h3 className="text-base font-bold text-foreground mb-4">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Schedule</p>
                  <p className="font-semibold text-foreground">
                    {form.dateTime ? new Date(form.dateTime).toLocaleDateString() : "Date not chosen"} at {selectedSchedule ? formatScheduleDate(selectedSchedule.departureAt) : "Time not chosen"}
                  </p>
                </div>
                <div className="border-t border-border pt-3 space-y-1.5">
                  {form.adultCount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Adults × {form.adultCount}</span>
                      <span className="font-medium">{(form.adultCount * adultPrice).toLocaleString()} VND</span>
                    </div>
                  )}
                  {form.childrenCount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Children × {form.childrenCount}</span>
                      <span className="font-medium">{(form.childrenCount * childPrice).toLocaleString()} VND</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-end">
                  <span className="text-muted-foreground font-medium">Total</span>
                  <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} VND</span>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full mt-5 font-bold text-primary-foreground py-5 text-base"
              >
                Continue to Payment →
              </Button>
            </div>
          </div>

          <div className="mt-4 bg-secondary/30 rounded-xl p-4 flex items-center gap-4 border border-border">
            <div>
              <p className="text-sm font-bold text-foreground">Need help booking?</p>
              <p className="text-xs text-muted-foreground">
                Call us 24/7 at{" "}
                <a className="underline hover:text-primary" href="tel:+84901234567">
                  +84 90 123 4567
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
