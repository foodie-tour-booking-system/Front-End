import { Footer } from "@/components/blocks/Footer";
import { Navbar } from "@/components/blocks/Navbar";

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAjG_ffuoW77v9q6WbaCZ5HFx0Y9YDlPkCoeBOybo_EvNOXEYCrXt0G4_mvLRSjs5WVcI2lDAQ1fOa7a0jlOuc2FZih6ScdyN1nA9RFZEQJrdw2mBWr5qRZHFdIcniA1-azStsSfvybw0CRXRqYJj5VgHdBau_SvWznNnmC5sfW57cnMdxQcsdpjfm9KR6hkGLi4MERpdBhkQOmhiYpVDH4IO2xeVWobZubX6R_-swm-VK39zNETLZFIcfsCUtlsKaefqH3IF0T5Lvz')",
          }}
        >
          <div className="text-center z-10 px-4">
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-md font-display uppercase">
              OUR STORY
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
              Experience the Authentic Mekong Delta & Saigon River
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
                Founded with a passion for showcasing the hidden gems of
                Vietnam's waterways, Les Rives offers an intimate look at local
                life. From humble beginnings with a single vessel, we have grown
                into a fleet of luxury speedboats, dedicated to providing
                comfort, safety, and authentic cultural immersion.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed font-sans">
                We believe that the best way to understand a country is through
                its rivers. Our mission is to connect travelers with the heart
                of Vietnam, navigating beyond the typical tourist paths to
                reveal the vibrant life along the banks of the Mekong and Saigon
                rivers.
              </p>
              <div className="pt-4">
                <button className="text-primary font-bold text-sm uppercase tracking-wider border-b-2 border-primary pb-1 hover:brightness-90 transition-colors">
                  Read Full History
                </button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-nZ37OyCCkpFtt6zl3-xsp-Qsk1jiaVJ3e4Ivk4MNsHbXqVLm9MuAup_fyFZlaFmvesLleL5F1dOjDzLxgmYbrXQGsWEKP5dDuQFjXLUCB73RqC8RSUZERyLaOzdspVZgaqeOqbasMCWTfTZaLCd-JRTqND_ZwrYUMjqNxv76N3vhGMR3VHk999O8inRnZhEfAwCWj5Fg2Guu1fwlRlxft0z6WcsXu1WlYmSoqCzOfLWlMkiMsbZwm-ypjS1vb2fjMbYGgM7DKk4M')",
                }}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-display text-xl italic">
                  "Vintage Elegance on Modern Waters"
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
                  Safety First
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  We adhere to the highest international safety standards. Our
                  vessels are meticulously maintained and equipped with modern
                  navigation technology.
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
                  Local Expertise
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  Our guides are locals with deep knowledge and passion for
                  their heritage, offering stories you won't find in guidebooks.
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
                  Sustainable Tourism
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  We are committed to preserving the Mekong's ecosystem and
                  supporting local river communities through responsible travel
                  practices.
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
                  The Launch
                </h3>
                <p className="text-muted-foreground font-sans">
                  Les Rives was founded with a single 10-seater speedboat,
                  offering bespoke sunset cruises on the Saigon River.
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
                  Expansion to Mekong
                </h3>
                <p className="text-muted-foreground font-sans">
                  We launched our signature full-day Mekong Delta tour, quickly
                  becoming the top-rated river experience in Ho Chi Minh City.
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
                  Fleet Modernization
                </h3>
                <p className="text-muted-foreground font-sans">
                  Introduced 5 new custom-built luxury vessels designed for
                  stability and comfort, setting a new standard for river
                  transport.
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
                  Leading the Way
                </h3>
                <p className="text-muted-foreground font-sans">
                  Les Rives continues to innovate with sustainable practices and
                  new curated routes to untouched destinations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet The Team Section */}
        <section className="py-20 bg-secondary/30">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-primary font-bold tracking-widest text-sm uppercase">
                  Our People
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 text-foreground uppercase">
                  Meet The Team
                </h2>
              </div>
              <p className="md:w-1/2 text-muted-foreground font-sans text-lg">
                Our crew is the heart of Les Rives. Professional, friendly, and
                deeply knowledgeable, they ensure every journey is memorable.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-3 group">
                <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden relative">
                  <img
                    alt="Female tour guide smiling professional"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ9Aoo97Cz3zocn9NdlUHBzyT5NpipUPknnNpyDZukAJf1nPgZEeMEbSo9qm8pDwz_Q_TdiMZnsFWYfgxMcpMeveWwFXPjjvYVMQvFe4DQ14Q0BzVKkgcGFNjHXtwk6L06Bkd3VCD_ZGgd_pVfR5IUGvJsLgcQRvYtthIiDhHWWsaHzdBCd9WVCej2NBmwb39O_sSuG_rbhPbEF0tigthB4aCNN0jsk3vLQmspG0ly66W3lOqkGhgFRoICKD1sIBcgnHW1rIfwywWN"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-display text-foreground">
                    Linh Nguyen
                  </h3>
                  <p className="text-primary text-sm font-medium uppercase font-sans">
                    Senior Guide
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 group">
                <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden relative">
                  <img
                    alt="Male boat captain in uniform"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVPbzujQiLCNOucj5RVIcoQUG8U4sJPwBjuBeIz3ziTIMiZohUERgiQzXyWcDCbq4UTOcn_VnSn7yzCXhJOmTCAIaNq8eggwfQDXiWWJimH7SRjYF8hzpGAeFX639pg4ANbw4WiXg123_mPlee_WmaPld696sDUoumSKuTDUKtnBHKHm8zERtd_w5zdIVcRaencRLomzQH6U55QNt4r0i_pevTvvcaxFsWGh1_Upk7WyOHkBzBqftJ1HHCdAOAdyT-B35MUatX-CrC"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-display text-foreground">
                    Minh Tran
                  </h3>
                  <p className="text-primary text-sm font-medium uppercase font-sans">
                    Fleet Captain
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 group">
                <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden relative">
                  <img
                    alt="Male tour operations manager portrait"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnA1B_5xezCAQ_r41XVgfHmOIlXe3GPS2knsoqHu2W6hdouAetWPcr7wp9U43doNU8fABJ5iuXrYxuAAbhWKfnpXNfg5-DKvjmrCuFkxecXsgeyhkl691rE_65pecRpVYa011Jhp0XnTcP2aRmJ9Dl5hewSlztZ_cyFnnai8CzLtoF9bfTCeu82xKahR5vi4mVT4sTx-LvjIJ2bEBOt4iQabpvcQ1q3uVG7C9UmwRUpwJOohHkS-VMzB_v_tXqS91SxPZ20pHEumei"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-display text-foreground">
                    David Hoang
                  </h3>
                  <p className="text-primary text-sm font-medium uppercase font-sans">
                    Operations Manager
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 group">
                <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden relative">
                  <img
                    alt="Female customer service representative portrait"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCU-gj8bGS5vkKSkoewaGsvpcGzztFI03Fx4rtEmM6B7lbmQhGtQ0qktdxxXoS_WjY3Bo_IhH0ezFeNrcc1kH4PFD6WvMae_iCIKXfJLNGbAN_rZmPZnNehVj2nP97wZGpNzW5YX9f4Ye5__yN-qcJcyl25cWuK8gvC4UmieRffyIcpgAzzNIaOq3RMaPuPG9C0qwvacppjcLpaIbiGSpmZ82wvr9fgJg1TTaO6AzTAFRrcomZZBvp8JQyjaaqVCnpBF6_IJOE-JwX"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-display text-foreground">
                    Sarah Vo
                  </h3>
                  <p className="text-primary text-sm font-medium uppercase font-sans">
                    Customer Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
