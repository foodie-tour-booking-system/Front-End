import { Button } from "@/components/ui/button";

interface BookingStep1Props {
  onNext: () => void;
}

export function BookingStep1({ onNext }: BookingStep1Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in slide-in-from-right-8 duration-500">
      <div className="flex-1 space-y-8">
        <section className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
            Select Travel Date
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="flex-1 max-w-sm mx-auto md:mx-0">
              <div className="flex items-center justify-between mb-4">
                <button className="p-1 hover:bg-secondary rounded-full text-foreground">
                  {"<"}
                </button>
                <span className="font-bold text-foreground">
                  October 2026
                </span>
                <div className="w-8"></div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                <span className="text-xs font-bold text-muted-foreground uppercase">S</span>
                <span className="text-xs font-bold text-muted-foreground uppercase">M</span>
                <span className="text-xs font-bold text-muted-foreground uppercase">T</span>
                <span className="text-xs font-bold text-muted-foreground uppercase">W</span>
                <span className="text-xs font-bold text-muted-foreground uppercase">T</span>
                <span className="text-xs font-bold text-muted-foreground uppercase">F</span>
                <span className="text-xs font-bold text-muted-foreground uppercase">S</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <button
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-full text-sm ${i === 1 ? "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20" : "hover:bg-primary/20 hover:text-primary transition-colors text-foreground"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
            Select Guests
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-dashed border-border">
              <div>
                <p className="font-bold text-foreground">Adults</p>
                <p className="text-sm text-muted-foreground">Age 12+</p>
                <p className="text-primary font-bold mt-1">$125.00</p>
              </div>
              <div className="flex items-center gap-4 bg-secondary/20 rounded-lg p-1.5 border border-border">
                <button className="size-8 flex items-center justify-center rounded bg-background text-foreground shadow-sm hover:text-primary disabled:opacity-50 transition-colors">
                  -
                </button>
                <span className="w-4 text-center font-bold text-lg">
                  2
                </span>
                <button className="size-8 flex items-center justify-center rounded bg-background text-foreground shadow-sm hover:text-primary transition-colors">
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-dashed border-border">
              <div>
                <p className="font-bold text-foreground">Children</p>
                <p className="text-sm text-muted-foreground">Age 4-11</p>
                <p className="text-primary font-bold mt-1">$85.00</p>
              </div>
              <div className="flex items-center gap-4 bg-secondary/20 rounded-lg p-1.5 border border-border">
                <button
                  disabled
                  className="size-8 flex items-center justify-center rounded bg-background text-foreground shadow-sm hover:text-primary disabled:opacity-50 transition-colors"
                >
                  -
                </button>
                <span className="w-4 text-center font-bold text-lg">
                  0
                </span>
                <button className="size-8 flex items-center justify-center rounded bg-background text-foreground shadow-sm hover:text-primary transition-colors">
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Infants</p>
                <p className="text-sm text-muted-foreground">Age 0-3</p>
                <p className="text-green-500 font-bold mt-1">Free</p>
              </div>
              <div className="flex items-center gap-4 bg-secondary/20 rounded-lg p-1.5 border border-border">
                <button
                  disabled
                  className="size-8 flex items-center justify-center rounded bg-background text-foreground shadow-sm hover:text-primary disabled:opacity-50 transition-colors"
                >
                  -
                </button>
                <span className="w-4 text-center font-bold text-lg">
                  0
                </span>
                <button className="size-8 flex items-center justify-center rounded bg-background text-foreground shadow-sm hover:text-primary transition-colors">
                  +
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="lg:w-[380px] shrink-0">
        <div className="sticky top-24">
          <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
            <div className="h-32 w-full relative bg-secondary">
              <img
                className="h-full w-full object-cover opacity-80"
                alt="Tour View"
                src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2670&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#f1c40f] text-slate-900 text-xs font-bold px-2 py-1 rounded">
                  Best Seller
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Booking Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                    <p className="font-bold text-foreground">Oct 02, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Time</p>
                    <p className="font-bold text-foreground">18:00 - 22:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-4 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Guests</p>
                    <p className="font-bold text-foreground">2 Adults</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Adult (x2)</span>
                    <span className="font-medium text-foreground">$250.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Taxes & Fees</span>
                    <span className="font-medium text-foreground">$12.50</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-4">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-base font-medium text-muted-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">$262.50</span>
                  </div>
                  <Button 
                    onClick={onNext}
                    className="w-full bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 font-bold py-6 px-6 text-lg rounded-lg shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                  >
                    Continue to Payment -&gt;
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-secondary/30 rounded-xl p-4 flex items-center gap-4 border border-border">
            <div>
              <p className="text-sm font-bold text-foreground">Need help booking?</p>
              <p className="text-xs text-muted-foreground">
                Call us 24/7 at <a className="underline hover:text-primary" href="#">+84 90 123 4567</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
