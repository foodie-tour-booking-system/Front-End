import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { Button } from "@/components/ui/button";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { TourService, type TourResponse } from "@/services/TourService";
import {
  TourImageService,
  type TourImageResponse,
} from "@/services/TourImageService";
import {
  RouteService,
  type RouteResponse,
  type RouteDetailRequest,
} from "@/services/RouteService";

function CheckpointModal({
  checkpoint,
  onClose,
}: {
  checkpoint: RouteDetailRequest;
  onClose: () => void;
}) {
  const images = checkpoint.imageUrls ?? [];
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = useCallback(
    () => setActiveIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setActiveIdx((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          background:
            "linear-gradient(160deg, #1c1c1c 0%, #2d2d2d 50%, #1a1a1a 100%)",
          animation: "modalIn 0.28s cubic-bezier(.22,.68,0,1.2) both",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-yellow-400/80 mb-0.5">
              Stop {checkpoint.locationOrder}
            </p>
            <h2 className="text-white font-bold text-lg leading-tight">
              {checkpoint.locationName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-xl font-light"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Main image / empty state */}
        {images.length > 0 ? (
          <>
            <div
              className="relative overflow-hidden flex-shrink-0"
              style={{ height: "420px" }}
            >
              <img
                key={activeIdx}
                src={images[activeIdx]}
                alt={`${checkpoint.locationName} — ${activeIdx + 1}`}
                className="w-full h-full object-cover"
                style={{ animation: "imgFade 0.35s ease both" }}
              />
              {/* Bottom overlay */}
              <div
                className="absolute inset-x-0 bottom-0 h-24"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              />
              {/* Counter */}
              <span className="absolute top-4 right-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {activeIdx + 1} / {images.length}
              </span>
              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-yellow-500 text-white text-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-yellow-500 text-white text-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide">
                {images.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === activeIdx
                        ? "border-yellow-400 scale-105 shadow-lg shadow-yellow-400/30"
                        : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-white/40">
            <span className="text-5xl">🖼️</span>
            <p className="text-sm">No images for this location</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes imgFade {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tour Details Page
───────────────────────────────────────────── */
export function TourDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<TourResponse | null>(null);
  const [images, setImages] = useState<TourImageResponse[]>([]);
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<RouteDetailRequest | null>(null);

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
        .catch((err) => console.error(err))
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

      {/* ── Hero ── */}
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
            <div className="w-24 h-1 bg-primary mb-4" />
          </div>
        </div>
      </header>

      {/* ── Breadcrumb bar ── */}
      <div className="bg-card border-b border-border py-3">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <span className="font-bold">438 shares</span>
            <button className="flex items-center space-x-1 text-blue-600 hover:underline">
              <span className="font-bold">f</span>{" "}
              <span>Facebook 296</span>
            </button>
            <button className="flex items-center space-x-1 hover:underline">
              <span className="font-bold">X</span> <span>Twitter 43</span>
            </button>
            <button className="flex items-center space-x-1 text-red-600 hover:underline">
              <span className="font-bold">P</span>{" "}
              <span>Pinterest 99</span>
            </button>
          </div>
          <div className="uppercase tracking-wider">
            <Link className="hover:text-primary" to="/">
              Home
            </Link>{" "}
            <span className="mx-1">&gt;</span>
            <span className="hover:text-primary cursor-pointer">Tours</span>{" "}
            <span className="mx-1">&gt;</span>
            <span className="font-bold text-foreground">{tour.tourName}</span>
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-3/4 pr-0 lg:pr-8">

          {/* Overview */}
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

          {/* Itinerary */}
          <section className="mb-12">
            <h2 className="text-xl font-bold uppercase mb-6 text-foreground border-b-2 border-border pb-2 inline-block">
              Itinerary
            </h2>

            {routes.length > 0 ? (
              <div className="space-y-8">
                {routes.map((route, routeIdx) => (
                  <div
                    key={route.routeId || routeIdx}
                    className="bg-card p-6 rounded-xl shadow-sm border border-border text-sm"
                  >
                    <p className="font-bold mb-4 text-foreground text-lg border-b border-border pb-2 inline-block">
                      {route.routeName}
                    </p>

                    {route.routeDetails && route.routeDetails.length > 0 ? (
                      <div className="space-y-3 pt-2">
                        {route.routeDetails
                          .slice()
                          .sort(
                            (a, b) =>
                              (a.locationOrder ?? 0) - (b.locationOrder ?? 0)
                          )
                          .map((detail, idx) => {
                            const hasImages =
                              (detail.imageUrls?.length ?? 0) > 0;
                            return (
                              <div
                                key={idx}
                                className={`group relative flex gap-3 items-start pl-4 py-2 border-l-2 rounded-r-lg transition-all duration-200 cursor-pointer ${hasImages
                                    ? "border-yellow-400 hover:border-yellow-300 hover:bg-yellow-400/5"
                                    : "border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                                  }`}
                                onClick={() => setSelectedCheckpoint(detail)}
                                title="Nhấn để xem hình ảnh địa điểm"
                              >
                                {/* Timeline dot */}
                                <div
                                  className={`absolute w-3 h-3 rounded-full -left-[7px] top-3 shadow transition-all duration-200 group-hover:scale-125 ${hasImages
                                      ? "bg-yellow-400 group-hover:shadow-yellow-400/50 group-hover:shadow-md"
                                      : "bg-primary group-hover:shadow-primary/40 group-hover:shadow-md"
                                    }`}
                                />

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3
                                      className={`font-bold text-base transition-colors duration-200 ${hasImages
                                          ? "text-foreground group-hover:text-yellow-500"
                                          : "text-foreground group-hover:text-primary"
                                        }`}
                                    >
                                      Stop {detail.locationOrder}:{" "}
                                      {detail.locationName}
                                    </h3>

                                    {/* Camera badge */}
                                    {hasImages && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-yellow-400/15 text-yellow-500 border border-yellow-400/30 px-2 py-0.5 rounded-full">
                                        <svg
                                          className="w-3 h-3"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          viewBox="0 0 24 24"
                                        >
                                          <rect
                                            x="3"
                                            y="7"
                                            width="18"
                                            height="13"
                                            rx="2"
                                          />
                                          <circle cx="12" cy="13.5" r="3" />
                                          <path d="M8 7l1.5-3h5L16 7" />
                                        </svg>
                                        {detail.imageUrls!.length} pictures
                                      </span>
                                    )}
                                  </div>

                                  {detail.durationAtLocation ? (
                                    <span className="inline-block text-xs font-semibold text-primary/80 uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded mt-1">
                                      Duration: {detail.durationAtLocation} min
                                    </span>
                                  ) : null}
                                </div>

                                {/* Chevron arrow (only when clickable) */}
                                {hasImages && (
                                  <svg
                                    className="w-4 h-4 text-yellow-400/50 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all duration-200 mt-1 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M9 18l6-6-6-6" />
                                  </svg>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic mt-2">
                        No details available for this route.
                      </p>
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

        {/* ── Sidebar ── */}
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
              * Includes mandatory Government Tax &amp; Service Charge
            </p>
          </div>
        </aside>
      </div>

      <Footer />

      {/* ── Checkpoint Image Modal ── */}
      {selectedCheckpoint && (
        <CheckpointModal
          checkpoint={selectedCheckpoint}
          onClose={() => setSelectedCheckpoint(null)}
        />
      )}
    </div>
  );
}
