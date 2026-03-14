import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthService } from "@/services/AuthService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await AuthService.login({
        input: email,
        password: password
      });

      if (response.token) {
        Cookies.set("token", response.token, { expires: 1 }); // Expires in 1 day
        const decoded: any = jwtDecode(response.token);
        const scopeArray = decoded.scope ? decoded.scope.split(" ") : [];
        const isAdmin = scopeArray.includes("ROLE_ADMIN");

        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err: any) {
      setError(err?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-[480px] bg-white dark:bg-surface-dark shadow-2xl rounded-2xl overflow-hidden border border-primary/20 relative animate-in zoom-in-95 duration-200">
        <div className="pt-8 px-8 pb-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/30">
            <svg
              className="text-primary w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 18V9.5a2.5 2.5 0 0 0-2.5-2.5H4.5A2.5 2.5 0 0 0 2 9.5V18" />
              <path d="M12 2v5" />
              <path d="m14 12-2 3-2-3" />
              <path d="M2 18h20" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Les Rives</h1>
          <p className="text-muted-foreground text-sm">Luxury River Experience</p>
        </div>

        <div className="px-8 pb-8 pt-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center">Welcome Back</h2>
          
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium border border-red-200 dark:border-red-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-black/20 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300" htmlFor="password">
                  Password
                </label>
                <Link className="text-xs font-medium text-primary hover:text-primary/80 transition-colors" to="/reset-password">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-black/20 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white transition-colors disabled:opacity-50"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#f1c40f] hover:bg-[#d4ac0d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f1c40f] transition-all uppercase tracking-wide mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-surface-dark text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnlQIq-CxlIMcv_2mNgpJSD47KA7AJzjUGM6m8J28w_qLjqtMOGN-Df6Ld57t9__7iCMbOjPstj7Pqu-3gjT1Rduh-ueva8FpuDlw8TV7p2knsGl2QERfavkGkG7a5QQNjx7ivilwDcJLY4d-jTqjIS-_b-7V0XnBu3hCrpakxtWl3D3MHRZvYG60HXt0zxBWVosMqerIjA0igp2P9Y8baUBFRciv5taeyRL5cyGzcIg2AOD9fggXi497hkKnf2PegBDFZXV10DIAp"
                alt="Google logo"
                className="h-5 w-5 mr-2"
              />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-surface-dark text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRE6obi6wk5TcqfR5WiIFUrVgWGpV87oJIoXo6anu19V5DHJaPAXKNoESTOrktvrb1hBuEPdhO89w6yKjj2Qp2hpV8YMTtlZRB_hNyx4jO0Wf_1Q0zmc3Q9dBcoz0mM0-BfYVJfx8h7PfwhlbJkCvom7oe2KSnOK36m6-q2fJy5IqCKTBXOjbMFRxKxy_-9amy-Rcqoy9fe-gsx7etzfWPF9RmkBglvaBVgITzEL8qtnU0axurKwgKdGdXs_CzPbEoevhuVqIEmCJp"
                alt="Facebook logo"
                className="h-5 w-5 mr-2"
              />
              Facebook
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#f1c40f] hover:text-[#d4ac0d] transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="h-1.5 w-full bg-gradient-to-r from-[#f1c40f]/40 via-[#f1c40f] to-[#f1c40f]/40"></div>
      </div>
    </div>
  );
}
