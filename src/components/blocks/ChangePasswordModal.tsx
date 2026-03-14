import { useState } from "react";
import { X, Eye, EyeOff, CheckCircle, Circle } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const hasLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^0-9a-zA-Z]/.test(password);
  
  const strength = [hasLength, hasNumber, hasSpecial].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (strength === 0) return "Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    return "Strong";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal Overlay */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1a202c] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
          <div>
            <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight font-serif">Change Password</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Update your credentials to secure your account.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-[#f1c40f] transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          
          {/* Current Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900 dark:text-gray-200" htmlFor="current-password">
              Current Password
            </label>
            <div className="relative group">
              <input 
                id="current-password" 
                type={showCurrent ? "text" : "password"}
                placeholder="Enter your current password" 
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all placeholder:text-gray-400"
              />
              <button 
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f1c40f] transition-colors focus:outline-none"
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900 dark:text-gray-200" htmlFor="new-password">
                New Password
              </label>
              <div className="relative group">
                <input 
                  id="new-password" 
                  type={showNew ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a new password" 
                  className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all placeholder:text-gray-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f1c40f] transition-colors focus:outline-none"
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Strength Meter */}
            <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Password Strength</span>
                <span className={`text-xs font-medium ${strength >= 2 ? 'text-green-500' : 'text-[#f1c40f]'}`}>
                  {getStrengthLabel()}
                </span>
              </div>
              
              <div className="flex gap-1 h-1.5 mb-4">
                {[1, 2, 3, 4].map((level) => (
                  <div 
                    key={level}
                    className={`flex-1 rounded-full h-full transition-colors ${
                      level <= strength + 1 && password.length > 0 
                        ? (strength >= 3 ? 'bg-green-500' : 'bg-[#f1c40f]') 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              
              <ul className="space-y-2">
                <li className={`flex items-center text-xs ${hasLength ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {hasLength ? <CheckCircle className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2 opacity-50" />}
                  At least 8 characters
                </li>
                <li className={`flex items-center text-xs ${hasNumber ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {hasNumber ? <CheckCircle className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2 opacity-50" />}
                  Contains a number
                </li>
                <li className={`flex items-center text-xs ${hasSpecial ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {hasSpecial ? <CheckCircle className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2 opacity-50" />}
                  Contains a special character
                </li>
              </ul>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2 pt-2">
              <label className="block text-sm font-medium text-slate-900 dark:text-gray-200" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <div className="relative group">
                <input 
                  id="confirm-password" 
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter new password" 
                  className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all placeholder:text-gray-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f1c40f] transition-colors focus:outline-none"
                >
                   {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50/50 dark:bg-black/20 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-3 justify-end">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/20"
          >
            Cancel
          </button>
          <button className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-bold text-slate-900 bg-[#f1c40f] hover:bg-[#d4ac0d] shadow-lg shadow-[#f1c40f]/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f1c40f] dark:focus:ring-offset-[#1a202c] uppercase tracking-wide">
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
}
