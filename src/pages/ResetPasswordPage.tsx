import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[a-zA-Z]/.test(pass)) score += 1;
    if (/[^0-9a-zA-Z]/.test(pass)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);
  
  const getStrengthLabel = () => {
    if (password.length === 0) return "None";
    if (strength <= 1) return "Weak";
    if (strength === 2 || strength === 3) return "Fair";
    return "Strong";
  };

  const getStrengthBars = () => {
    return [1, 2, 3, 4].map((index) => (
      <div 
        key={index}
        className={`flex-1 h-full rounded-full transition-colors ${
          index <= strength 
            ? 'bg-[#f1c40f]' 
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased bg-[#f8f8f5] dark:bg-[#1a202c]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a202c] px-10 py-4 relative z-20">
        <Link to="/" className="flex items-center gap-4 text-slate-900 dark:text-white">
          <div className="w-8 h-8 text-[#f1c40f]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold font-serif tracking-tight">Les Rives</h2>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center p-4">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 dark:opacity-20 blur-sm" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjK4TktbZJm8x16N5hLywWrXzMz9jmqlQ6hK-R9WCNVwKKqlJd0O1JoJUXvI4hhoT7y1JaFMY_iUGPo7INo91jwXbBkRhRDZcziYhCGuLlqCPgstL6Jy_HADTiG61isHzqRrETcWsmeIBLWLYakrU6FXZq-rByEYpkQSseu3MjPpqYO2Gy75ra7NPJ_cPKVaFKpfLn5NEnG2xp_ul_2DvqteL3DJZ85oE9ENo6p9eXeyZT-53P2YstK9tY8D6h7PbwYRYVNKm0dqAO')" }}
        />
        <div className="absolute inset-0 z-0 bg-black/30 backdrop-blur-[2px]" />

        {/* Card Container */}
        <div className="relative z-10 w-full max-w-md bg-white/95 dark:bg-[#2d3748] backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          {/* Card Header */}
          <div className="px-8 pt-10 pb-6 text-center border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight mb-3">
              Reset Password
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">
              Create a strong password for your next journey.
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8 space-y-6">
            
            {/* New Password Field */}
            <div className="space-y-2">
              <label className="text-slate-900 dark:text-gray-200 text-sm font-semibold ml-1" htmlFor="new-password">
                New Password
              </label>
              <div className="relative flex items-center group focus-within:ring-2 focus-within:ring-[#f1c40f]/50 rounded-lg transition-all">
                <div className="absolute left-3 text-gray-400 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  id="new-password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password" 
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-900 dark:text-white placeholder:text-gray-400 focus:border-[#f1c40f] focus:ring-0 text-sm transition-colors"
                />
              </div>
            </div>

            {/* Password Strength */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-900 dark:text-gray-300 font-medium">Password Strength</span>
                <span className={`font-medium ${strength >= 3 ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {getStrengthLabel()}
                </span>
              </div>
              <div className="flex h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden gap-1">
                {getStrengthBars()}
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 ml-1">Must be at least 8 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-slate-900 dark:text-gray-200 text-sm font-semibold ml-1" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <div className="relative flex items-center group focus-within:ring-2 focus-within:ring-[#f1c40f]/50 rounded-lg transition-all">
                <div className="absolute left-3 text-gray-400 flex items-center pointer-events-none">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <input 
                  id="confirm-password" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password" 
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-900 dark:text-white placeholder:text-gray-400 focus:border-[#f1c40f] focus:ring-0 text-sm transition-colors"
                />
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full flex items-center justify-center gap-2 bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 text-base font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] uppercase tracking-wide">
              <span>Save New Password</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Footer Links */}
            <div className="pt-2 text-center">
              <Link to="/" className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
