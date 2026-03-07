import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function TourDetailsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <header className="relative w-full h-[400px] md:h-[500px]">
        <img
          alt="Saigon River Sunset Speedboat"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMbDjex6LvdbBnwfYAPaAZAGMczXuHOY96rYCCJ_s3xQWINYZAYMg3pFyUDYmxNOhkV0OP1x7iQmcOGs6keK6pad6pkd8GGRNnUg8Yn1HN_9pSxFv6jRGIMhVPLI1MkKxqY9fVtI7T05QbBYJ0SH3LAxQwLzEUcJ9rIqT5J9j6FvAT4TfnyaL1LDHq_itP9dvkktBkIBRNGlwIBTwCWZwHEMuXPu-twmKCh6eFBExLQQhMwXX5cLVIg1dDiq54dJvizGiZE2AIi_ge"
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
              Saigon Night Food Tour By Luxury Speedboat
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
            <a className="hover:text-primary" href="/">
              Home
            </a>{" "}
            <span className="mx-1">&gt;</span>
            <a className="hover:text-primary" href="/tours">
              Tours
            </a>{" "}
            <span className="mx-1">&gt;</span>
            <span className="font-bold text-foreground">
              Saigon Night Food Tour
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-3/4 pr-0 lg:pr-8">
          <section className="mb-12">
            <h2 className="text-xl font-bold uppercase mb-6 text-foreground border-b-2 border-border pb-2 inline-block">
              What To Expect
            </h2>
            <div className="bg-card p-6 rounded shadow-sm border border-border space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">
                  Sunset Cruise on Saigon River:
                </strong>{" "}
                Start your evening with a breathtaking sunset view of the Ho Chi
                Minh City skyline from the comfort of our luxury speedboat.
              </p>
              <p>
                <strong className="text-foreground">
                  Authentic Street Food Adventure:
                </strong>{" "}
                Venture off the beaten path to taste the best local dishes that
                defined Saigon's culinary scene, guided by our food experts.
              </p>
              <p>
                <strong className="text-foreground">Cultural Immersion:</strong>{" "}
                Learn about the history and culture of the city through its
                food, visiting vibrant night markets and hidden alleyways.
              </p>
              <p>
                <strong className="text-foreground">
                  Riverside Dining Experience:
                </strong>{" "}
                Conclude your tour with a relaxed, romantic dinner at a
                riverside restaurant, enjoying traditional delicacies.
              </p>
              <p>
                <strong className="text-foreground">Seamless Comfort:</strong>{" "}
                Includes round-trip hotel pickup, unlimited refreshments on
                board, and English-speaking guides ensuring a worry-free
                evening.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold uppercase mb-6 text-foreground border-b-2 border-border pb-2 inline-block">
              Overview
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-6 text-sm font-bold">
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">
                  Departure Time:
                </span>
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded">
                  5:00 PM
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">Finish Time:</span>
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded">
                  9:00 PM
                </span>
              </div>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground text-justify">
              <p>
                Experience the magic of Saigon at night with our exclusive Night
                Food Tour by Luxury Speedboat. As the sun sets, escape the
                bustling city center traffic and glide along the Saigon River,
                witnessing the metropolis transform into a glittering spectacle
                of lights. Our speedboats offer a unique vantage point to
                appreciate the contrast between the modern skyline and
                traditional life along the banks.
              </p>
              <p>
                Your culinary journey begins as we dock at a local pier. You'll
                be whisked away to explore the vibrant food scene of the city.
                Unlike standard tours, we focus on authentic, high-quality
                street food spots frequented by locals. Taste iconic dishes like
                Banh Xeo (sizzling pancakes), Com Tam (broken rice), and fresh
                spring rolls, all explained by our passionate guides.
              </p>
              <p>
                The evening culminates in a serene riverside setting where you
                can reflect on the flavors and sights of the night. Whether you
                are a foodie or a culture enthusiast, this tour offers a perfect
                blend of sightseeing, gastronomy, and luxury comfort.
              </p>
              <div className="flex items-start gap-2 bg-secondary/50 p-3 rounded border border-border">
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
            <div className="bg-card p-6 rounded shadow-sm border border-border space-y-6 text-sm">
              <div>
                <p className="font-bold italic mb-2 text-foreground">
                  Evening Program (4 hours)
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">4:30 PM:</strong> Les
                    Rives guide will meet you at your hotel's lobby and bring
                    you by car to our pier at Bach Dang.
                  </p>
                  <p>
                    <strong className="text-foreground">5:00 PM:</strong> Depart
                    by luxury speedboat. Enjoy a complimentary cocktail as you
                    watch the sunset over the Saigon River. The guide will point
                    out significant landmarks along the way.
                  </p>
                  <p>
                    <strong className="text-foreground">5:45 PM:</strong> Arrive
                    at the first destination. Take a short walk through a local
                    market to see fresh ingredients being sold for evening
                    meals.
                  </p>
                  <p>
                    <strong className="text-foreground">6:30 PM:</strong> First
                    food stop. Enjoy "Banh Xeo" and fresh spring rolls at a
                    famous local eatery that has been serving for over 30 years.
                  </p>
                  <p>
                    <strong className="text-foreground">7:30 PM:</strong>{" "}
                    Continue by boat to a quieter district. Visit a hidden gem
                    for Vietnamese BBQ or seafood, a favorite pastime for
                    locals.
                  </p>
                  <p>
                    <strong className="text-foreground">8:30 PM:</strong>{" "}
                    Dessert time. Try sweet soup (Che) or flan cake before
                    heading back to the boat.
                  </p>
                  <p>
                    <strong className="text-foreground">9:00 PM:</strong> Arrive
                    back at Bach Dang pier. Our staff will transfer you back to
                    your hotel.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold uppercase mb-6 text-foreground border-b-2 border-border pb-2 inline-block">
              Saigon Night Food Tour FAQ
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is the food spicy?</AccordionTrigger>
                <AccordionContent>
                  Vietnamese food can be spicy, but on this tour, dishes are
                  generally mild. Chilli and sauces are usually served on the
                  side so you can adjust the spice level to your liking.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What happens if it rains?</AccordionTrigger>
                <AccordionContent>
                  Our speedboats have roofs and rain covers to keep you dry.
                  Rain in Saigon is often short-lived. We also provide ponchos
                  if needed during the walking portions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Are vegetarian options available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! Please inform us when booking, and we will arrange a
                  delicious vegetarian menu for you at each stop.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </main>

        <aside className="w-full lg:w-1/4">
          <div className="sticky top-24 bg-card p-6 rounded shadow-md border border-border">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="font-bold text-sm uppercase text-muted-foreground">
                  Adult
                </span>
                <span className="font-bold text-primary">2,199,000 VND*</span>
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
                <span className="font-bold text-primary">1,599,000 VND*</span>
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
