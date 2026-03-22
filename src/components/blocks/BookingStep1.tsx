import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScheduleService, type ScheduleResponse } from "@/services/ScheduleService";
import type { TourResponse } from "@/services/TourService";
import type { BookingFormData } from "@/pages/BookingPage";
import { CalendarDays, Users, MapPin, Loader2, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

interface BookingStep1Props {
  tourId?: number;
  tour: TourResponse | null;
  form: BookingFormData;
  onUpdateForm: (patch: Partial<BookingFormData>) => void;
  onNext: () => void;
}

function formatScheduleTime(sch: ScheduleResponse) {
  if (sch.isTemplate && sch.time) {
    return sch.time.slice(0, 5);
  }
  if (!sch.departureAt) return "";
  try {
    return format(parseISO(sch.departureAt), "HH:mm");
  } catch {
    return "";
  }
}

export function BookingStep1({ tourId, tour, form, onUpdateForm, onNext }: BookingStep1Props) {
  const [schedules, setSchedules] = useState<ScheduleResponse[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!tourId) return;
    setLoadingSchedules(true);
    ScheduleService.getSchedules({ tourId, scheduleStatus: "ACTIVE" })
      .then((data) => {
        console.log("[BookingStep1] Schedules loaded:", JSON.stringify(data, null, 2));
        setSchedules(data);
      })
      .catch(console.error)
      .finally(() => setLoadingSchedules(false));
  }, [tourId]);

  const isPrivate = form.tourType === "PRIVATE";
  const adultPrice = isPrivate ? (tour?.privatePriceAdult ?? 0) : (tour?.groupPriceAdult ?? 0);
  const childPrice = isPrivate ? (tour?.privatePriceChild ?? 0) : (tour?.groupPriceChild ?? 0);
  const totalPrice = form.adultCount * adultPrice + form.childrenCount * childPrice;

  const changeCount = (field: "adultCount" | "childrenCount", delta: number) => {
    const next = Math.max(0, (form[field] as number) + delta);
    if (field === "adultCount" && next < 1) return; // min 1 adult
    onUpdateForm({ [field]: next });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.scheduleId) e.scheduleId = "Please select a departure schedule.";
    if (!form.date) e.date = "Please select a departure date.";
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
          <div className="mb-5">
            <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <CalendarDays className="w-5 h-5 text-primary" />
              Select Departure Date
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Note: Only dates with available departure schedules can be selected. Other dates are disabled.
            </p>
          </div>

          {loadingSchedules ? (
            <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              Loading schedules...
            </div>
          ) : schedules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarDays className="w-8 h-8 mx-auto mb-2 opacity-30" />
              No schedules available for this tour currently.
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Left: Calendar */}
              <div className="bg-secondary/20 p-6 rounded-2xl border border-border/50 shadow-inner">
                <Calendar
                  mode="single"
                  selected={form.date ? parseISO(form.date) : undefined}
                  onSelect={(d) => {
                    if (d) {
                      const dateStr = format(d, "yyyy-MM-dd");
                      onUpdateForm({ date: dateStr, scheduleId: undefined });
                    }
                  }}
                  disabled={(d) => {
                    const dateStr = format(d, "yyyy-MM-dd");
                    const today = new Date(new Date().setHours(0, 0, 0, 0));
                    if (d < today) return true; // always disable past dates

                    const hasDeparture = schedules.some(
                      (s) => !s.isTemplate && s.departureAt?.startsWith(dateStr)
                    );

                    // Treat as template if isTemplate===true, OR if startDate+endDate exist and no departureAt
                    const isWithinTemplate = schedules.some((s) => {
                      const isTemplateSchedule = s.isTemplate === true || (!s.departureAt && s.startDate && s.endDate);
                      if (!isTemplateSchedule) return false;
                      if (!s.startDate || !s.endDate) return false;
                      const start = s.startDate.slice(0, 10);
                      const end = s.endDate.slice(0, 10);
                      return dateStr >= start && dateStr <= end;
                    });

                    return !hasDeparture && !isWithinTemplate;
                  }}
                  className="rounded-md border-none [--cell-size:2.8rem]"
                />
              </div>

              {/* Right: Times slots for selected date */}
              <div className="flex-1 w-full space-y-4">
                {form.date ? (
                  <>
                    <h3 className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                      <Clock className="w-4 h-4 text-primary" />
                      Departure Time ({format(parseISO(form.date), "dd/MM/yyyy")})
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {schedules
                        .filter((s) => {
                          const isTemplateSchedule = s.isTemplate === true || (!s.departureAt && s.startDate && s.endDate);
                          if (!isTemplateSchedule) {
                            // Fixed schedule – match by departureAt date
                            return s.departureAt?.startsWith(form.date);
                          } else {
                            // Template schedule – match any date within its range
                            if (!s.startDate || !s.endDate) return false;
                            const start = s.startDate.slice(0, 10);
                            const end = s.endDate.slice(0, 10);
                            return form.date >= start && form.date <= end;
                          }
                        })
                        .map((sch) => {
                          const isSelected = form.scheduleId === sch.scheduleId;
                          return (
                            <button
                              key={sch.scheduleId}
                              onClick={() => onUpdateForm({ scheduleId: sch.scheduleId! })}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/10 shadow-sm"
                                  : "border-border hover:border-primary/40 hover:bg-secondary/30"
                                }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-bold text-lg text-foreground">
                                    {formatScheduleTime(sch)}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tight mt-1">
                                    {sch.minPax ?? "?"}-{sch.maxPax ?? "∞"} guests
                                  </p>
                                </div>
                                {isSelected && (
                                  <CheckCircle2 className="w-5 h-5 text-primary" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-secondary/10 rounded-2xl border border-dashed border-border opacity-60">
                    <CalendarDays className="w-10 h-10 mb-3 text-muted-foreground/30" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Please select a date to view available times
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          {errors.date && (
            <p className="text-xs text-destructive mt-4 flex items-center gap-1 font-medium bg-destructive/10 p-2 rounded-lg border border-destructive/20 animate-in slide-in-from-top-1">
              <AlertTriangle className="w-3.5 h-3.5" />{errors.date}
            </p>
          )}
          {errors.scheduleId && (
            <p className="text-xs text-destructive mt-4 flex items-center gap-1 font-medium bg-destructive/10 p-2 rounded-lg border border-destructive/20 animate-in slide-in-from-top-1">
              <AlertTriangle className="w-3.5 h-3.5" />{errors.scheduleId}
            </p>
          )}
        </section>

        {/* Tour Option (Group vs Private) */}
        <section className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-foreground">
            <Clock className="w-5 h-5 text-primary" />
            Select Tour Option
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onUpdateForm({ tourType: "GROUP" })}
              className={`flex flex-col p-4 rounded-xl border-2 transition-all text-left ${
                form.tourType === "GROUP"
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border hover:border-primary/40 hover:bg-secondary/30"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  form.tourType === "GROUP" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>Group Tour</span>
                {form.tourType === "GROUP" && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </div>
              <p className="font-bold text-foreground">Shared Experience</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Join other travelers in your journey.</p>
            </button>

            <button
              onClick={() => onUpdateForm({ tourType: "PRIVATE" })}
              className={`flex flex-col p-4 rounded-xl border-2 transition-all text-left ${
                form.tourType === "PRIVATE"
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border hover:border-primary/40 hover:bg-secondary/30"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  form.tourType === "PRIVATE" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>Private Tour</span>
                {form.tourType === "PRIVATE" && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </div>
              <p className="font-bold text-foreground">Exclusive Experience</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">The entire tour is for you and your group. Flexible itinerary.</p>
            </button>
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
                    {selectedSchedule && form.date
                      ? `${format(parseISO(form.date), "PPP", { locale: enUS })} at ${formatScheduleTime(selectedSchedule)}`
                      : "Not selected"}
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
                type="button"
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
