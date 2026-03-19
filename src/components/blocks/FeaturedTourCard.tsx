import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type TourResponse } from "@/services/TourService";
import { TourImageService } from "@/services/TourImageService";

export function FeaturedTourCard({ tour }: { tour: TourResponse }) {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBsOW9R_Wt7byyy5-b3m9n-UXfVF9gGkw0gFt0AnSlK1qIso-p_HnS_rdDNwyzhCDB9Y3xlW0gDn2q1uGCEMqohhs87PrUPm6aBh5oO1pFlOd7tc6R49YQnt8nbW7iihe-8k1wyA4bLOZH3TnV5yrqXFUUNM-84OjaArolPlX7764mrJWBuKEomT8jn38KJGwgUuLAUfhrKpVCBxB5yrPonn1hmWD5Hd3P222_EXsv8sbxT1y_Q25ERePuqUNzLES26-NRpdcQRS49v"
  );

  useEffect(() => {
    if (tour.tourId) {
      TourImageService.getImages({ tourId: tour.tourId })
        .then((images) => {
          const primary = images.find((img) => img.isPrimary) || images[0];
          if (primary?.imageUrl) setImageUrl(primary.imageUrl);
        })
        .catch(console.error);
    }
  }, [tour.tourId]);

  // Static mock rating for display (no rating API yet)
  const rating = 4.7;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <Link
      to={`/tours/${tour.tourId}`}
      /* Card width: ~75vw on mobile, fixed 700px on desktop — shows peek of adjacent cards */
      className="
        flex-shrink-0 snap-center
        w-[75vw] md:w-[600px] lg:w-[700px]
        bg-card rounded-2xl shadow-lg border border-border
        group cursor-pointer hover:-translate-y-2 transition-transform duration-300
        flex flex-col overflow-hidden
      "
    >
      {/* Image */}
      <div className="relative h-[320px] md:h-[380px] overflow-hidden">
        {tour.tourStatus === "ACTIVE" && (
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded z-10 uppercase tracking-wider shadow">
            Available
          </span>
        )}
        <img
          alt={tour.tourName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={imageUrl}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)" }} />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 bg-card">
        <h3 className="font-display font-bold text-lg text-card-foreground uppercase leading-tight line-clamp-2">
          {tour.tourName}
        </h3>

        {/* Price + Duration row */}
        <div className="flex items-center gap-3 text-sm flex-wrap">
          <span className="bg-primary text-primary-foreground font-bold px-4 py-1.5 rounded text-base">
            {tour.basePriceAdult?.toLocaleString()} VND
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {tour.duration} hours
          </span>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4"
                fill={i < fullStars ? "currentColor" : i === fullStars && halfStar ? "url(#half)" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">{rating}</span>
        </div>
      </div>
    </Link>
  );
}
