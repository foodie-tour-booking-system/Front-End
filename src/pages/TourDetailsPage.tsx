import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TourService, type TourResponse } from "@/services/TourService";
import {
  TourImageService,
  type TourImageResponse,
} from "@/services/TourImageService";
import { RouteService, type RouteResponse } from "@/services/RouteService";

export function TourDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<TourResponse | null>(null);
  const [images, setImages] = useState<TourImageResponse[]>([]);
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([
        TourService.getTourById({ id: Number(id) }),
        TourImageService.getImages({ tourId: Number(id) }).catch(() => []),
        RouteService.getRouteByTourId({ tourId: Number(id) }).catch(() => []),
      ])
        .then(([tourData, imagesData, routesData]) => {
          setTour(tourData);
          setImages(imagesData);
          setRoutes(routesData);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading || !tour) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <span className="text-muted-foreground animate-pulse p-8">
            Loading tour details...
          </span>
        </div>
        <Footer />
      </div>
    );
  }

  const primaryImage = images.find((img) => img.isPrimary) || images[0];
  const heroImage =
    primaryImage?.imageUrl ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDMbDjex6LvdbBnwfYAPaAZAGMczXuHOY96rYCCJ_s3xQWINYZAYMg3pFyUDYmxNOhkV0OP1x7iQmcOGs6keK6pad6pkd8GGRNnUg8Yn1HN_9pSxFv6jRGIMhVPLI1MkKxqY9fVtI7T05QbBYJ0SH3LAxQwLzEUcJ9rIqT5J9j6FvAT4TfnyaL1LDHq_itP9dvkktBkIBRNGlwIBTwCWZwHEMuXPu-twmKCh6eFBExLQQhMwXX5cLVIg1dDiq54dJvizGiZE2AIi_ge";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <header className="relative w-full h-[400px] md:h-[500px]">
        <img
          alt={tour.tourName}
          className="w-full h-full object-cover"
          src={heroImage}
        />
        <div
          className="absolute inset-0 flex flex-col justify-end pb-12 px-4 md:px-12"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white uppercase font-display tracking-wide mb-2 drop-shadow-lg">
              {tour.tourName}
            </h1>
            <div className="w-24 h-1 bg-primary mb-4"></div>
          </div>
        </div>
      </header>

      <div className="bg-card border-b border-border py-3">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <span className="font-bold">438 shares</span>
            <button className="flex items-center space-x-1 text-blue-600 hover:underline">
              <span className="font-bold">f</span> <span>Facebook 296</span>
            </button>
            <button className="flex items-center space-x-1 hover:underline">
              <span className="font-bold">X</span> <span>Twitter 43</span>
            </button>
            <button className="flex items-center space-x-1 text-red-600 hover:underline">
              <span className="font-bold">P</span> <span>Pinterest 99</span>
            </button>
          </div>
          <div className="uppercase tracking-wider">
            <Link className="hover:text-primary" to="/">
              Home
            </Link>{" "}
            <span className="mx-1">&gt;</span>
            <span className="hover:text-primary cursor-pointer">
              Tours
            </span>{" "}
            <span className="mx-1">&gt;</span>
            <span className="font-bold text-foreground">{tour.tourName}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-3/4 pr-0 lg:pr-8">
          <section className="mb-12">
            <h2 className="text-xl font-bold uppercase mb-6 text-foreground border-b-2 border-border pb-2 inline-block">
              Overview
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-6 text-sm font-bold">
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">Duration:</span>
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded">
                  {tour.duration} hours
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">Type:</span>
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded">
                  {tour.tourType}
                </span>
              </div>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground text-justify whitespace-pre-wrap">
              {tour.tourDescription || "No description available."}
              <div className="flex items-start gap-2 bg-secondary/50 p-3 rounded border border-border mt-4">
                <p className="text-xs text-muted-foreground">
                  Please inform us of any dietary restrictions or allergies upon
                  booking so we can tailor the menu for you.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold uppercase mb-6 text-foreground border-b-2 border-border pb-2 inline-block">
              Itinerary
            </h2>
            {routes.length > 0 ? (
              <div className="space-y-8">
                {routes.map((route, routeIdx) => (
                  <div key={route.routeId || routeIdx} className="bg-card p-6 rounded shadow-sm border border-border space-y-4 text-sm">
                    <p className="font-bold mb-2 text-foreground text-lg border-b border-border pb-2 inline-block">
                      {route.routeName}
                    </p>

                    {route.routeDetails && route.routeDetails.length > 0 ? (
                      <div className="space-y-6 pt-2">
                        {route.routeDetails.sort((a, b) => (a.locationOrder || 0) - (b.locationOrder || 0)).map((detail, idx) => (
                          <div key={idx} className="flex gap-4 items-start pl-2 border-l-2 border-primary/30 relative">
                             <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 shadow" />
                             <div className="flex-1">
                                <h3 className="font-bold text-foreground text-base mb-1">
                                  Stop {detail.locationOrder}: {detail.locationName}
                                </h3>
                                {detail.durationAtLocation && (
                                   <span className="inline-block text-xs font-semibold text-primary/80 uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded mt-1">
                                     Duration: {detail.durationAtLocation} min
                                   </span>
                                )}
                             </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic mt-2">No details available for this route.</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-6 rounded shadow-sm border border-border text-center text-muted-foreground italic text-sm">
                No itinerary information available at the moment.
              </div>
            )}
          </section>

        </main>

        <aside className="w-full lg:w-1/4">
          <div className="sticky top-24 bg-card p-6 rounded shadow-md border border-border">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="font-bold text-sm uppercase text-muted-foreground">
                  Adult
                </span>
                <span className="font-bold text-primary">
                  {tour.basePriceAdult?.toLocaleString() || "0"} VND*
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <div className="flex flex-col">
                  <span className="font-bold text-sm uppercase text-muted-foreground">
                    Child
                  </span>
                  <span className="text-xs text-muted-foreground">
                    4-12 years old
                  </span>
                </div>
                <span className="font-bold text-primary">
                  {tour.basePriceChild?.toLocaleString() || "0"} VND*
                </span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <div className="flex flex-col">
                  <span className="font-bold text-sm uppercase text-muted-foreground">
                    Infant
                  </span>
                  <span className="text-xs text-muted-foreground">
                    0-3 years old
                  </span>
                </div>
                <span className="font-bold text-foreground">
                  Free of charge
                </span>
              </div>
            </div>
            <Button
              onClick={() => navigate(`/booking?tourId=${tour.tourId}`)}
              className="w-full hover:-translate-y-0.5 transition-transform"
              size="lg"
            >
              BOOK NOW
            </Button>
            <p className="mt-4 text-xs text-center text-muted-foreground leading-tight">
              * Includes mandatory Government Tax & Service Charge
            </p>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
