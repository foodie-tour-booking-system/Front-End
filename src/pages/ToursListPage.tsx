import { useEffect, useState } from "react";
import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { Link } from "react-router-dom";
import { TourService, type TourResponse } from "@/services/TourService";
import { TourImageService } from "@/services/TourImageService";

function TourCard({ tour }: { tour: TourResponse }) {
  const [imageUrl, setImageUrl] = useState<string>("https://lh3.googleusercontent.com/aida-public/AB6AXuBsOW9R_Wt7byyy5-b3m9n-UXfVF9gGkw0gFt0AnSlK1qIso-p_HnS_rdDNwyzhCDB9Y3xlW0gDn2q1uGCEMqohhs87PrUPm6aBh5oO1pFlOd7tc6R49YQnt8nbW7iihe-8k1wyA4bLOZH3TnV5yrqXFUUNM-84OjaArolPlX7764mrJWBuKEomT8jn38KJGwgUuLAUfhrKpVCBxB5yrPonn1hmWD5Hd3P222_EXsv8sbxT1y_Q25ERePuqUNzLES26-NRpdcQRS49v");

  useEffect(() => {
    if (tour.tourId) {
      TourImageService.getImages({ tourId: tour.tourId })
        .then(images => {
          const primary = images.find(img => img.isPrimary) || images[0];
          if (primary?.imageUrl) {
            setImageUrl(primary.imageUrl);
          }
        })
        .catch(console.error);
    }
  }, [tour.tourId]);

  return (
    <Link
      to={`/tours/${tour.tourId}`}
      className="bg-card rounded shadow-sm border border-border group cursor-pointer hover:-translate-y-2 transition-transform duration-300 flex flex-col"
    >
      <div className="relative h-56 overflow-hidden rounded-t">
        {tour.tourStatus === "ACTIVE" && (
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded z-10">
            AVAILABLE
          </span>
        )}
        <img
          alt={tour.tourName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={imageUrl}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <h3 className="font-display font-bold text-lg mb-3 text-card-foreground line-clamp-2 uppercase">
          {tour.tourName}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {tour.tourDescription}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-2">
          <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded">
            {tour.basePriceAdult?.toLocaleString()} VND
          </span>
          <span className="flex items-center gap-1 font-medium">{tour.duration} hours</span>
        </div>
      </div>
    </Link>
  );
}

export function ToursListPage() {
  const [tours, setTours] = useState<TourResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    TourService.getAllTours()
      .then(data => {
        const activeTours = data.filter(t => t.tourStatus === 'ACTIVE');
        setTours(activeTours);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Navbar />

      <header className="py-12 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground uppercase mb-4">
              Our Tours
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the beauty of Saigon and its surroundings. From the bustling river life to the historical landmarks, 
              we offer premium speedboat experiences that you'll never forget.
            </p>
            <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map(tour => (
                <TourCard key={tour.tourId} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-border rounded-lg bg-card">
              <h3 className="text-xl font-medium text-muted-foreground">No tours available at the moment.</h3>
              <p className="text-sm text-muted-foreground mt-2">Please check back later or contact us for more information.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
