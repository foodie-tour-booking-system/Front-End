import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function HomePage() {
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
              {/* Card 1 */}
              <Link
                to="/tours/1"
                className="min-w-[300px] md:min-w-[380px] snap-center bg-card rounded shadow-sm border border-border group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-56 overflow-hidden rounded-t">
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded z-10">
                    BEST SELLER
                  </span>
                  <img
                    alt="Cu Chi Tunnels Tour"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsOW9R_Wt7byyy5-b3m9n-UXfVF9gGkw0gFt0AnSlK1qIso-p_HnS_rdDNwyzhCDB9Y3xlW0gDn2q1uGCEMqohhs87PrUPm6aBh5oO1pFlOd7tc6R49YQnt8nbW7iihe-8k1wyA4bLOZH3TnV5yrqXFUUNM-84OjaArolPlX7764mrJWBuKEomT8jn38KJGwgUuLAUfhrKpVCBxB5yrPonn1hmWD5Hd3P222_EXsv8sbxT1y_Q25ERePuqUNzLES26-NRpdcQRS49v"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg mb-3 text-card-foreground h-14">
                    CU CHI TUNNELS TOUR BY SPEEDBOAT
                  </h3>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded">
                      2,199,000 VND
                    </span>
                    <span className="flex items-center gap-1">6 hours</span>
                  </div>
                </div>
              </Link>

              {/* Card 2 */}
              <Link
                to="/tours/2"
                className="min-w-[300px] md:min-w-[380px] snap-center bg-card rounded shadow-sm border border-border group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-56 overflow-hidden rounded-t">
                  <img
                    alt="Mekong Delta Tour"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPdBvLNMGBOlZP6sScJhCeuwmcJ0gVUG1tI3myjukijbe9ei9xsfOwWI_pGx1VGpCQFWQyobRfQrNK7uro8H4MJE8FJfhVf71BGjRKI9u7wIDqJ5aWkz3WU_a2sl_M9X7cgXfROCIulp_qDaPLlWYEC4qYimjEaQeRfPuYN8xeY_1AdXigWxrqAtsoSiThAjEt3-CQwZN_unrGAnKJn23_7XoyAaPWajlGRi2m3_o_KVbNyYe5IGNf7BxL4-K1ppmn4NSJ3TjbPRH6"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg mb-3 text-card-foreground h-14">
                    MEKONG DELTA DAY TOUR BY SPEEDBOAT
                  </h3>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded">
                      2,899,000 VND
                    </span>
                    <span className="flex items-center gap-1">8 hours</span>
                  </div>
                </div>
              </Link>

              {/* Card 3 */}
              <Link
                to="/tours/3"
                className="min-w-[300px] md:min-w-[380px] snap-center bg-card rounded shadow-sm border border-border group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-56 overflow-hidden rounded-t">
                  <img
                    alt="Cu Chi & Mekong Combo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWIuYcCsqbSELJJOoBfu7wI_XeWzRW_qqiWe51V-XSpwc3qFktxKpyU4HWmcSVLRRjnLIrClshvyMi_IMgJNgrqBq4rXKoB4-LuX32K9e1FeMUTxBZjYlLtjJVTxnRyeO0jUj4LgPjE2L4PW4amlwAx8_V9lku4ZsfwG4ctY2LFeuxvYNsBigqwN5BLjgmIoySJMeB-fFeTl5dQUoRe_Q6O7hgoYP8Qxw3pW46TgHA0WUPcNyVMXwUik4VXxbAsZcSpldsFR-jxnUn"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg mb-3 text-card-foreground h-14">
                    CU CHI TUNNELS & MEKONG DELTA FULL DAY
                  </h3>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded">
                      5,099,000 VND
                    </span>
                    <span className="flex items-center gap-1">10 hours</span>
                  </div>
                </div>
              </Link>
            </div>
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
