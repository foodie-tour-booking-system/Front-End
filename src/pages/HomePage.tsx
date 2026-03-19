import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { TourService, type TourResponse } from "@/services/TourService";
import saigonFoodBg from "@/assets/image/saigonfood.jpg";
import saigonFoodBg2 from "@/assets/image/saigonfood_2.jpg";
import { FeaturedTourCard } from "@/components/blocks/FeaturedTourCard";

export function HomePage() {
  const [featuredTours, setFeaturedTours] = useState<TourResponse[]>([]);
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we back from payment (VNPay params in URL)
    const params = new URLSearchParams(window.location.search);
    if (params.get("vnp_ResponseCode") || params.get("vnp_TransactionStatus")) {
      navigate("/dashboard");
      return;
    }

    TourService.getAllTours()
      .then(tours => {
        // Just take the first 6 active tours for the homepage
        const activeTours = tours.filter(t => t.tourStatus === 'ACTIVE').slice(0, 6);
        setFeaturedTours(activeTours);
      })
      .catch(console.error);
  }, [navigate]);

  const scroll = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.clientWidth ?? 700;
    el.scrollBy({ left: dir === "right" ? cardWidth + 24 : -(cardWidth + 24), behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground uppercase mb-2">
              Foodie Tour Authentic Street Food Experience
            </h1>
            <h2 className="text-xl md:text-2xl font-display text-muted-foreground uppercase tracking-widest mt-4">
              Saigon Culinary & Scooter Tour Operator
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight text-foreground">
                Let us lead your{" "}
                <span className="bg-primary text-white px-2 py-1 inline-block mt-1">
                  unforgettable journey
                </span>{" "}
                to the spectacular flavors of Vietnam!
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Proud to be the pioneer in providing authentic Saigon street food tours,
                Foodie Tour makes our guest's comfort, enjoyment and safety our
                top priorities. Our experienced local guides will take you to hidden culinary
                destinations in Ho Chi Minh City, taking you on half day and evening
                scooter tours to discover little known gems and exotic local dishes,
                all hidden in the bustling alleyways of Saigon.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base hidden md:block">
                Prepare to taste your way through the vibrant streets of Ho Chi Minh
                City, also known as{" "}
                <strong className="text-foreground">Saigon</strong>. From the
                sizzling woks of{" "}
                <strong className="text-foreground">District 4</strong> to the
                historic coffee shops hidden in secret apartments, you will
                quickly uncover this beautiful country's warm spirit, welcoming locals,
                and incredibly rich culinary history.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Foodie Tour <strong>does not offer generic bus tours</strong>, we offer{" "}
                <strong>authentic street food tasting experiences by scooter</strong>.
              </p>
            </div>

            <div className="relative h-[400px] md:h-[500px] w-full mt-8 lg:mt-0">
              <div className="absolute top-0 left-0 w-3/5 h-3/5 z-10 rounded shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <img
                  alt="Delicious Saigon Street Food"
                  className="w-full h-full object-cover"
                  src={saigonFoodBg}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3/4 h-3/5 z-20 rounded shadow-2xl overflow-hidden border-4 border-card transform hover:scale-105 transition-transform duration-500">
                <img
                  alt="Tourists enjoying food in Ho Chi Minh City"
                  className="w-full h-full object-cover"
                  src={saigonFoodBg2}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Experiences */}
      <section className="py-16 bg-white border-y border-border">
        <div className="text-center mb-10 px-4">
          <h2 className="text-2xl font-display font-bold uppercase text-foreground tracking-wide">
            Featured Culinary Experiences
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 mb-2"></div>
        </div>

        {/* Carousel with arrow buttons */}
        <div className="relative group/carousel">
          {/* Prev */}
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

          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory px-[12vw]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {featuredTours.length > 0 ? (
              featuredTours.map((tour) => (
                <FeaturedTourCard key={tour.tourId} tour={tour} />
              ))
            ) : (
              <div className="w-full text-center py-12 text-muted-foreground bg-card rounded border border-border border-dashed h-56 flex items-center justify-center">
                Loading amazing experiences...
              </div>
            )}
          </div>

          {/* Next */}
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

        <div className="mt-8 text-center">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 text-sm font-bold bg-primary text-primary-foreground px-6 py-3 rounded hover:bg-primary/90 transition-colors uppercase"
          >
            Explore All Tours
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-display font-bold uppercase text-foreground">
              Why Travel With Us?
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-8 md:gap-y-16">
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bold text-sm uppercase mb-3 text-foreground">
                Exclusive Small Group Tours
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Escape the crowds and enjoy intimate experiences tailored to
                your preferences.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bold text-sm uppercase mb-3 text-foreground">
                Strategic Timing
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Say goodbye to large bus crowds as we carefully plan our tours
                to avoid peak times.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bold text-sm uppercase mb-3 text-foreground">
                Authentic Experiences
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Dive deep into local culture with unique, off-the-beaten-path
                adventures.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-center">
            <div>
              <div className="text-5xl font-display text-primary font-bold mb-2">
                14
              </div>
              <div className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Years Certificate of Excellence
              </div>
            </div>
            <div>
              <div className="text-5xl font-display text-primary font-bold mb-2">
                4540
              </div>
              <div className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Excellent Reviews on TripAdvisor
              </div>
            </div>
            <div>
              <div className="text-5xl font-display text-primary font-bold mb-2">
                521320
              </div>
              <div className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Guests Served Since 2011
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
