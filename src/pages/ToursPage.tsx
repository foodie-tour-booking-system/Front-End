import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { TourService, type TourResponse } from "@/services/TourService";
import { FeaturedTourCard } from "@/components/blocks/FeaturedTourCard";

export function ToursPage() {
  const [tours, setTours] = useState<TourResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    TourService.getAllTours()
      .then((toursData) => {
        setTours(toursData.filter((t) => t.tourStatus === "ACTIVE"));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.clientWidth ?? 700;
    el.scrollBy({ left: dir === "right" ? cardWidth + 24 : -(cardWidth + 24), behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground uppercase mb-4">
            All Culinary Experiences
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Browse our full catalog of authentic street food tours and scooter
            adventures in Saigon.
          </p>
        </div>

        {/* Carousel with arrow buttons */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground animate-pulse">
            Loading delicious tours...
          </div>
        ) : tours.length > 0 ? (
          <div className="relative group/carousel">
            {/* Prev button */}
            <button
              onClick={() => scroll("left")}
              aria-label="Previous"
              className="
                absolute left-3 top-1/2 -translate-y-1/2 z-20
                w-12 h-12 rounded-full bg-white shadow-lg border border-border
                flex items-center justify-center text-2xl text-foreground
                opacity-0 group-hover/carousel:opacity-100
                hover:bg-primary hover:text-primary-foreground hover:border-primary
                transition-all duration-200 hover:scale-110
              "
            >
              ‹
            </button>

            {/* Scrollable carousel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory px-[12vw]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {tours.map((tour) => (
                <FeaturedTourCard key={tour.tourId} tour={tour} />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => scroll("right")}
              aria-label="Next"
              className="
                absolute right-3 top-1/2 -translate-y-1/2 z-20
                w-12 h-12 rounded-full bg-white shadow-lg border border-border
                flex items-center justify-center text-2xl text-foreground
                opacity-0 group-hover/carousel:opacity-100
                hover:bg-primary hover:text-primary-foreground hover:border-primary
                transition-all duration-200 hover:scale-110
              "
            >
              ›
            </button>
          </div>
        ) : (
          <div className="mx-4 text-center py-12 text-muted-foreground bg-card rounded border border-border border-dashed">
            No tours available at the moment. Please check back later!
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
