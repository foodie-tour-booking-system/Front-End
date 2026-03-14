import { useState } from "react";
import { CreditCard, Wallet, Smartphone, History, Receipt, ShieldCheck } from "lucide-react";

interface BookingStep2Props {
  onBack: () => void;
  onNext: () => void;
}

export function BookingStep2({ onBack, onNext }: BookingStep2Props) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "apple">("card");

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm font-medium text-gray-500 dark:text-gray-400">
        <ol className="flex items-center space-x-2">
          <li><button onClick={onBack} className="hover:text-[#f1c40f] transition-colors">Select Tour</button></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-[#f1c40f]">Payment Details</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Payment Form */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Secure Payment</h1>
            <p className="text-slate-600 dark:text-gray-400">Complete your booking securely. Your adventure awaits.</p>
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-[#2d3748] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex border-b border-gray-200 dark:border-gray-700 gap-6 mb-8 overflow-x-auto">
              <button 
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-2 pb-4 px-2 whitespace-nowrap transition-all border-b-2 ${paymentMethod === 'card' ? 'border-[#f1c40f] text-[#f1c40f]' : 'border-transparent text-gray-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">Credit Card</span>
              </button>
              <button 
                onClick={() => setPaymentMethod("paypal")}
                className={`flex items-center gap-2 pb-4 px-2 whitespace-nowrap transition-all border-b-2 ${paymentMethod === 'paypal' ? 'border-[#f1c40f] text-[#f1c40f]' : 'border-transparent text-gray-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <Wallet className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">PayPal</span>
              </button>
              <button 
                onClick={() => setPaymentMethod("apple")}
                className={`flex items-center gap-2 pb-4 px-2 whitespace-nowrap transition-all border-b-2 ${paymentMethod === 'apple' ? 'border-[#f1c40f] text-[#f1c40f]' : 'border-transparent text-gray-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">Apple Pay</span>
              </button>
            </div>

            {/* Card Form */}
            {paymentMethod === "card" && (
              <form className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                <div className="grid grid-cols-1 gap-6">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 dark:text-gray-200 mb-2 block">Card Number</span>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#f1c40f] focus:ring-1 focus:ring-[#f1c40f] transition-colors" 
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 text-gray-400">
                        <CreditCard className="w-5 h-5" />
                      </div>
                    </div>
                  </label>
                  
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 dark:text-gray-200 mb-2 block">Card Holder Name</span>
                    <input 
                      type="text" 
                      placeholder="Full Name as on Card"
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#f1c40f] focus:ring-1 focus:ring-[#f1c40f] transition-colors" 
                    />
                  </label>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700 dark:text-gray-200 mb-2 block">Expiry Date</span>
                      <input 
                        type="text" 
                        placeholder="MM / YY"
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#f1c40f] focus:ring-1 focus:ring-[#f1c40f] transition-colors" 
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700 dark:text-gray-200 mb-2 block">CVV / CVC</span>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="123"
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#f1c40f] focus:ring-1 focus:ring-[#f1c40f] transition-colors" 
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-6">
                  <input 
                    type="checkbox" 
                    id="save-card"
                    className="mt-1 rounded border-gray-300 bg-gray-50 text-[#f1c40f] focus:ring-[#f1c40f] cursor-pointer"
                  />
                  <label htmlFor="save-card" className="text-sm text-slate-600 dark:text-gray-400 cursor-pointer">
                    Save card details for future bookings. <span className="text-[#f1c40f] hover:underline">Read terms</span>
                  </label>
                </div>
              </form>
            )}

            {paymentMethod !== "card" && (
              <div className="h-40 flex items-center justify-center animate-in fade-in duration-300">
                <p className="text-gray-500">Redirecting to {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-white dark:bg-[#2d3748] rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24 shadow-lg shadow-black/5 dark:shadow-black/20">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              Order Summary
              <Receipt className="text-[#f1c40f] w-5 h-5" />
            </h3>

            {/* Mini Tour Card */}
            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-20 h-20 shrink-0 rounded-lg bg-gray-200 dark:bg-neutral-800 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2670&auto=format&fit=crop" 
                  alt="Tour thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white leading-tight mb-1">Saigon Night Food Tour</h4>
                <p className="text-xs text-gray-500 mb-2">4 Hours • District 1 & 4</p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <History className="w-3 h-3" />
                  <span>Today • 18:00</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-slate-600 dark:text-gray-300">
                <span>2 Adults x $94.50</span>
                <span className="font-medium">$189.00</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-gray-300">
                <span>Taxes & Fees</span>
                <span className="font-medium">$0.00</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-end mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Price (USD)</p>
                <p className="text-xs text-gray-400">Includes all taxes</p>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">$189.00</div>
            </div>

            {/* Pay Button */}
            <button 
              onClick={onNext}
              className="w-full bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 font-bold text-lg py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#f1c40f]/20 uppercase"
            >
              <span>Pay Now</span>
            </button>

            {/* Security Badge */}
            <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium bg-gray-100 dark:bg-black/20 px-3 py-1.5 rounded-full">
                <ShieldCheck className="text-green-500 w-4 h-4" />
                Secure SSL Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
