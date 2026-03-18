import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type TourResponse } from "@/services/TourService";
import { TourImageService } from "@/services/TourImageService";

export function FeaturedTourCard({ tour }: { tour: TourResponse }) {
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
      className="min-w-[300px] md:min-w-[380px] snap-center bg-card rounded shadow-sm border border-border group cursor-pointer hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
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
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto pt-2">
          <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded">
            {tour.basePriceAdult?.toLocaleString()} VND
          </span>
          <span className="flex items-center gap-1">{tour.duration} hours</span>
        </div>
      </div>
    </Link>
  );
}
