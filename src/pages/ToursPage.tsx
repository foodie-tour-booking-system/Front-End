import { useEffect, useState } from "react";
import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { TourService, type TourResponse } from "@/services/TourService";
import { FeaturedTourCard } from "@/components/blocks/FeaturedTourCard";

export function ToursPage() {
  const [tours, setTours] = useState<TourResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TourService.getAllTours()
      .then(toursData => {
        setTours(toursData.filter(t => t.tourStatus === 'ACTIVE'));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground uppercase mb-4">
              All Culinary Experiences
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              Browse our full catalog of authentic street food tours and scooter adventures in Saigon.
            </p>
          </div>

          {loading ? (
             <div className="text-center py-12 text-muted-foreground animate-pulse">
                Loading delicious tours...
             </div>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tours.map(tour => (
                <FeaturedTourCard key={tour.tourId} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground bg-card rounded border border-border border-dashed">
              No tours available at the moment. Please check back later!
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
