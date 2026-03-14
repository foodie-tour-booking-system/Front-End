import { Link } from "react-router-dom";
import { CheckCircle2, Calendar, Users, MapPin, CreditCard, Download, ExternalLink, CloudSun, Navigation } from "lucide-react";

export function BookingStep3() {
  return (
    <div className="w-full max-w-[1024px] mx-auto flex flex-col gap-10 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Success Message Section */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-2 animate-in zoom-in slide-in-from-bottom-4 duration-500 delay-150">
            <CheckCircle2 className="text-green-500 w-10 h-10" />
          </div>
          <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight uppercase">
            Thank You For Your Booking!
          </h1>
          <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg font-normal leading-relaxed max-w-[600px]">
            Your booking for the <strong className="text-slate-900 dark:text-white">Saigon Night Food Tour</strong> has been confirmed. A confirmation email has been sent to <span className="text-[#f1c40f]">you</span>.
          </p>
        </div>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white dark:bg-[#2d3748] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        
        {/* Card Header */}
        <div className="bg-gray-50 dark:bg-black/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Booking Reference</p>
            <p className="text-slate-900 dark:text-white text-lg font-bold font-mono tracking-wide">#VN-928371</p>
          </div>
          <div className="bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-green-500/20 flex items-center gap-1">
            Confirmed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Image */}
          <div className="md:col-span-4 h-48 md:h-auto relative group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2670&auto=format&fit=crop')" }}
            />
          </div>

          {/* Details Grid */}
          <div className="md:col-span-8 p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-black/20 flex items-center justify-center shrink-0">
                <Calendar className="text-[#f1c40f] w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm font-medium">Date & Time</span>
                <span className="text-slate-900 dark:text-white text-base font-semibold">Oct 24, 2024 • 18:00</span>
                <span className="text-gray-400 text-xs">Please arrive 15 mins early</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-black/20 flex items-center justify-center shrink-0">
                <Users className="text-[#f1c40f] w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm font-medium">Guests</span>
                <span className="text-slate-900 dark:text-white text-base font-semibold">2 Adults</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-black/20 flex items-center justify-center shrink-0">
                <MapPin className="text-[#f1c40f] w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm font-medium">Pickup Location</span>
                <span className="text-slate-900 dark:text-white text-base font-semibold">Bach Dang Speedboat Terminal</span>
                <button className="text-[#f1c40f] text-xs font-medium hover:underline mt-0.5 flex items-center gap-1 text-left">
                  Get Directions <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-black/20 flex items-center justify-center shrink-0">
                <CreditCard className="text-[#f1c40f] w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm font-medium">Total Paid</span>
                <span className="text-slate-900 dark:text-white text-base font-semibold">$189.00 USD</span>
                <span className="text-gray-400 text-xs">Visa ending in 4242</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/10">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 font-bold text-sm transition-all shadow-lg shadow-[#f1c40f]/20 uppercase">
              <Download className="w-4 h-4" />
              Download E-Ticket
            </button>
            <Link 
              to="/dashboard"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 text-slate-700 dark:text-gray-300 font-bold text-sm transition-all uppercase"
            >
              View My Bookings
            </Link>
          </div>
        </div>
      </div>

      {/* Prepare for Your Trip Section */}
      <div className="flex flex-col gap-6 mt-4">
        <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">Prepare for Your Trip</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Weather Widget */}
          <div className="bg-white dark:bg-[#2d3748] p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium text-sm">Ho Chi Minh City</span>
              <span className="text-[#f1c40f] text-xs font-bold uppercase tracking-wider">Forecast</span>
            </div>
            <div className="flex items-center gap-4">
              <CloudSun className="text-[#f1c40f] w-12 h-12" />
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">28°C</p>
                <p className="text-gray-500 text-sm">Partly Cloudy</p>
              </div>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 w-full" />
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">Light, breathable clothing recommended. Bring a light jacket for the river breeze.</p>
            </div>
          </div>

          {/* Map Widget */}
          <div className="bg-white dark:bg-[#2d3748] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col lg:col-span-2">
            <div className="h-48 w-full bg-slate-700 relative group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-80" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555658636-6e4a36210b95?q=80&w=2574&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white">
                <Navigation className="w-10 h-10 drop-shadow-lg" />
              </div>
            </div>
            <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 dark:bg-[#2d3748]">
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-base">Bach Dang Speedboat Terminal</h3>
                <p className="text-gray-500 text-sm mt-1">10B Ton Duc Thang, District 1</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
