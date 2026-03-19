import { useEffect, useState } from "react";
import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { TourService, type TourResponse } from "@/services/TourService";
import { TourImageService } from "@/services/TourImageService";

function FeaturedTourCard({ tour }: { tour: TourResponse }) {
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
      className="min-w-[300px] md:min-w-[380px] snap-center bg-card rounded shadow-sm border border-border group cursor-pointer hover:-translate-y-2 transition-transform duration-300 flex flex-col"
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
            {tour.groupPriceAdult?.toLocaleString()} VND
          </span>
          <span className="flex items-center gap-1">{tour.duration} hours</span>
        </div>
      </div>
    </Link>
  );
}

export function HomePage() {
  const [featuredTours, setFeaturedTours] = useState<TourResponse[]>([]);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground uppercase mb-2">
              Les Rives Authentic River Experience
            </h1>
            <h2 className="text-xl md:text-2xl font-display text-muted-foreground uppercase tracking-widest mt-4">
              Saigon River Tours Operator
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
                to the spectacular southern of Vietnam!
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Proud to be the pioneer in providing luxury Saigon River tours,
                Les Rives makes our guest's comfort, enjoyment and safety our
                top priorities. Our fleet will cruise to hidden destinations in
                southern Vietnam, taking you on half day and one day Saigon
                River tours to discover little known gems and exotic locales,
                all just a short ride from the bustling streets of Ho Chi Minh
                City.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base hidden md:block">
                Prepare to travel through the bustling streets of Ho Chi Minh
                City, also known as{" "}
                <strong className="text-foreground">Saigon</strong>, the winding
                canals of the{" "}
                <strong className="text-foreground">Mekong Delta</strong>, the
                UNESCO-listed{" "}
                <strong className="text-foreground">
                  Can Gio Biosphere Reserve
                </strong>{" "}
                or the intricate tunnel systems of{" "}
                <strong className="text-foreground">Cu Chi</strong>. Whichever
                route you take, you will quickly uncover this beautiful
                country's warm spirit, welcoming lush nature and rich history.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Les Rives <strong>does not offer coach tours</strong>, we offer{" "}
                <strong>luxury Saigon River tours by speedboat</strong>.
              </p>
            </div>

            <div className="relative h-[400px] md:h-[500px] w-full mt-8 lg:mt-0">
              <div className="absolute top-0 left-0 w-3/5 h-3/5 z-10 rounded shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <img
                  alt="Smiling tourist with hat"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj0BFONwsm9s4QeBqO8Tf2B6169fYt27tUj-BlXpefOJ98HaEpzPTdYBjIz1x446OQqEqONrDEqRBM67puOPh1Tsb_FIH2572SMvRsb0j72oILVxZmoK2UCGtg3GYxyEqLO7NpeskYyD4Q1edU69ocONTWwNroLI0JKdKYus-9jcsJINSXjjS2JnS7XBbEBcN7Bl8SsYnSXaB74IMKVx1oHqeoIMkri6SB9zVL4wjFMxYv4LKdB6WSk_LTZmgGk5yROUFXnrsXYjoJ"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3/4 h-3/5 z-20 rounded shadow-2xl overflow-hidden border-4 border-card transform hover:scale-105 transition-transform duration-500">
                <img
                  alt="Luxury speedboat on river"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf58rmcFedJqZG3MbaQpD21dFUp_f6K7w9r6iE1hkhbgBmmlInmAiaTO5XhGWq9QCKZ7b3B__BcxfyiZDuPAQ5yd3Dx1c4LjOmPUHakaND53Ce2_hm70YuVq7NPWN4l_-BlCO19t3tEcZ-uuVGxpv9saBv-H0yRh6dUK8WBqzU0lPwa1iECExWxQiApn0Eguie3rTIYXPcMYxTfTYnEYn_CZvGX4nH1lNZhMbPtWqHmWfITxO7OP6PKjvyq5HezLuaHZZN1F2nTbGc"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Experiences */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold uppercase text-foreground tracking-wide">
              Featured Experiences On Saigon River
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4 mb-8"></div>
            <div className="max-w-2xl mx-auto relative group">
              <Input
                className="w-full py-6 px-6 rounded-full border-border bg-background shadow-sm text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                placeholder="Start your experience..."
              />
              <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
            </div>
          </div>

          <div className="relative mt-12">
            <div
              className="flex overflow-x-auto gap-6 pb-8 snap-x"
              style={{ scrollbarWidth: "none" }}
            >
              {featuredTours.length > 0 ? (
                featuredTours.map(tour => (
                  <FeaturedTourCard key={tour.tourId} tour={tour} />
                ))
              ) : (
                <div className="w-full text-center py-12 text-muted-foreground bg-card rounded border border-border border-dashed h-56 flex items-center justify-center">
                  Loading amazing experiences...
                </div>
              )}
            </div>
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
                Guests Served Since 2010
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
