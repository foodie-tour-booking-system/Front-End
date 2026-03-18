import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import saigonFoodBg from "@/assets/image/saigonfood.jpg";
import saigonFoodBg2 from "@/assets/image/saigonfood_2.jpg";

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${saigonFoodBg})`,
          }}
        >
          <div className="text-center z-10 px-4">
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-md font-display uppercase">
              OUR CULINARY JOURNEY
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
              Savor the Authentic Flavors of Ho Chi Minh City
            </p>
          </div>
        </section>

        {/* Authentic Experiences Section */}
        <section className="py-16 md:py-24 max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">
                Authentic Experiences
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight text-foreground">
                Our Beginnings & Mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-sans">
                Founded with an insatiable passion for Vietnam's vibrant street
                food culture, Foodie Tour offers an intimate taste of local
                life. From humble beginnings exploring hidden alleyways, we have
                perfected a curated selection of 4 to 6 exclusive food tours,
                dedicated to providing safe, delicious, and deeply authentic
                culinary experiences.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed font-sans">
                We believe that the best way to understand Vietnam is through
                its food. Our mission is to connect travelers with the true
                heart of Saigon, navigating beyond the typical tourist
                restaurants to pull up a plastic stool and taste the real Ho Chi
                Minh City alongside the locals.
              </p>
              <div className="pt-4">
                <button className="text-primary font-bold text-sm uppercase tracking-wider border-b-2 border-primary pb-1 hover:brightness-90 transition-colors">
                  View Our Menu of Tours
                </button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${saigonFoodBg2})`,
                }}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-display text-xl italic">
                  "Real Flavors on Saigon's Busy Streets"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="bg-secondary/30 py-20 border-y border-border">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground uppercase">
                Our Core Values
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-card hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield-check"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.89 0 4.78 1 6.83 2a1 1 0 0 1 .17 1.7z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-foreground uppercase">
                  Hygiene & Safety
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  We carefully vet every single food vendor and stall we visit,
                  ensuring the highest standards of food hygiene so you can
                  enjoy Saigon's street food with complete peace of mind.
                </p>
              </div>

              <div className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-card hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map"
                  >
                    <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                    <path d="M15 5.764v15" />
                    <path d="M9 3.236v15" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-foreground uppercase">
                  Expert Foodie Guides
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  Our guides are born-and-raised Saigonese food lovers who know
                  every hidden family recipe, offering delicious stories you
                  won't find in guidebooks.
                </p>
              </div>

              <div className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-card hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-leaf"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-foreground uppercase">
                  Supporting Local Vendors
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  We are committed to supporting family-run stalls and giving
                  back to the local culinary community that makes Saigon's food
                  scene so incredibly rich.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Milestones */}
        <section className="py-20 max-w-[900px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12 text-foreground uppercase">
            Our Journey
          </h2>
          <div className="relative border-l-2 border-primary/30 ml-3 md:ml-0 md:pl-0 space-y-12">
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
              <div className="md:w-1/3 text-left md:text-right pt-1 md:pt-0">
                <span className="text-4xl font-bold text-primary/40 group-hover:text-primary transition-colors font-display">
                  2011
                </span>
              </div>
              <div className="md:w-2/3 pb-8 border-b border-border last:border-0">
                <h3 className="text-xl font-bold font-display mb-2 text-foreground">
                  The First Bite
                </h3>
                <p className="text-muted-foreground font-sans">
                  Foodie Tour was founded with a single walking tour, guiding a
                  small group of friends through the bustling street food alleys
                  of District 4.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
              <div className="md:w-1/3 text-left md:text-right pt-1 md:pt-0">
                <span className="text-4xl font-bold text-primary/40 group-hover:text-primary transition-colors font-display">
                  2015
                </span>
              </div>
              <div className="md:w-2/3 pb-8 border-b border-border last:border-0">
                <h3 className="text-xl font-bold font-display mb-2 text-foreground">
                  Expanding the Menu
                </h3>
                <p className="text-muted-foreground font-sans">
                  We launched our signature scooter foodie tours, expanding our
                  catalog to 4-6 specialized routes, quickly becoming a
                  top-rated culinary experience.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
              <div className="md:w-1/3 text-left md:text-right pt-1 md:pt-0">
                <span className="text-4xl font-bold text-primary/40 group-hover:text-primary transition-colors font-display">
                  2019
                </span>
              </div>
              <div className="md:w-2/3 pb-8 border-b border-border last:border-0">
                <h3 className="text-xl font-bold font-display mb-2 text-foreground">
                  Culinary Excellence
                </h3>
                <p className="text-muted-foreground font-sans">
                  Partnered with over 50 beloved local vendors and introduced
                  our premium tasting options for ultimate comfort and variety.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
              <div className="md:w-1/3 text-left md:text-right pt-1 md:pt-0">
                <span className="text-4xl font-bold text-primary/40 group-hover:text-primary transition-colors font-display">
                  Today
                </span>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold font-display mb-2 text-foreground">
                  Leading the Food Scene
                </h3>
                <p className="text-muted-foreground font-sans">
                  Foodie Tour continues to innovate with new curated gastronomic
                  routes, showcasing the ever-evolving flavors of Ho Chi Minh
                  City.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
