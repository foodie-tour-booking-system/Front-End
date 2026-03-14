import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-display font-bold text-foreground tracking-widest uppercase">
            Les Rives
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/tours/1"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Tours
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/booking"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Book
          </Link>
          <Link
            to="/portal/customer"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            User
          </Link>
          <Link
            to="/portal/admin"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Admin
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-bold bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 px-4 py-2 rounded-lg transition-colors inline-block"
          >
            Sign Up
          </Link>
        </nav>
        <button className="md:hidden text-2xl text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
</nav>
  );
}
