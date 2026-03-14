import { useState } from "react";
import { Mail, Phone, User, Eye, EyeOff, X } from "lucide-react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLogin: () => void;
}

export function SignUpModal({ isOpen, onClose, onNavigateToLogin }: SignUpModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-[520px] bg-white dark:bg-surface-dark rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 dark:border-gray-800 overflow-hidden relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#f1c40f] transition-colors focus:outline-none z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Join us for exclusive river experiences.</p>
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-slate-900 dark:text-gray-200 text-sm font-medium" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative group">
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 text-slate-900 dark:text-white h-12 px-4 placeholder:text-gray-400 focus:border-[#f1c40f] focus:ring-1 focus:ring-[#f1c40f] transition-all outline-none"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-gray-200 text-sm font-medium" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 text-slate-900 dark:text-white h-12 px-4 placeholder:text-gray-400 focus:border-[#f1c40f] focus:ring-1 focus:ring-[#f1c40f] transition-all outline-none"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-gray-200 text-sm font-medium" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative group">
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 text-slate-900 dark:text-white h-12 px-4 placeholder:text-gray-400 focus:border-[#f1c40f] focus:ring-1 focus:ring-[#f1c40f] transition-all outline-none"
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-900 dark:text-gray-200 text-sm font-medium" htmlFor="password">
                Create Password
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a secure password"
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 text-slate-900 dark:text-white h-12 px-4 pr-12 placeholder:text-gray-400 focus:border-[#f1c40f] focus:ring-1 focus:ring-[#f1c40f] transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f1c40f] transition-colors flex items-center justify-center focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 mt-1">
              <div className="relative flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-[#f1c40f] focus:ring-[#f1c40f] cursor-pointer transition-colors"
                />
              </div>
              <label className="text-sm text-slate-700 dark:text-gray-300 leading-tight select-none cursor-pointer" htmlFor="terms">
                I agree to the <a className="text-[#f1c40f] hover:underline" href="#">Terms & Conditions</a> and{" "}
                <a className="text-[#f1c40f] hover:underline" href="#">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="w-full bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 font-bold py-3.5 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 mt-2 uppercase tracking-wide text-sm"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <button
                onClick={onNavigateToLogin}
                className="text-slate-900 dark:text-white font-semibold hover:text-[#f1c40f] transition-colors"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
