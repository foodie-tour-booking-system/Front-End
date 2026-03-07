

export function HeroSection() {
  return (
    <header className="relative w-full h-[400px] md:h-[500px]">
      <img
        alt="Saigon River Sunset Speedboat"
        className="w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMbDjex6LvdbBnwfYAPaAZAGMczXuHOY96rYCCJ_s3xQWINYZAYMg3pFyUDYmxNOhkV0OP1x7iQmcOGs6keK6pad6pkd8GGRNnUg8Yn1HN_9pSxFv6jRGIMhVPLI1MkKxqY9fVtI7T05QbBYJ0SH3LAxQwLzEUcJ9rIqT5J9j6FvAT4TfnyaL1LDHq_itP9dvkktBkIBRNGlwIBTwCWZwHEMuXPu-twmKCh6eFBExLQQhMwXX5cLVIg1dDiq54dJvizGiZE2AIi_ge"
      />
      {/* Hero Overlay gradient */}
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
          {/* Accent Line */}
          <div className="w-24 h-1 bg-primary mb-4"></div>
        </div>
      </div>
    </header>
  );
}
