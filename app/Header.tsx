"use client";
import { BookmarkCheck, GitCompare, LogIn, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const navigate = router.push;

  // Hide mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAuth = async () => {
    if (isLoggedIn) {
      // TODO: Since the button says "account"
      // we should create a proper account page
      const client = await createClient();
      client.auth.signOut().then(() => {
        router.push("/");
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">
              IsThereSoftware
            </span>
            <span className="text-xl font-bold text-slate-800">That.com</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/search"
              icon={<GitCompare className="w-4 h-4" />}
              label="Browse"
            />
            <NavLink
              to="/compare"
              icon={<GitCompare className="w-4 h-4" />}
              label="Compare"
            />
            {isLoggedIn && (
              <NavLink
                to="/bookmarks"
                icon={<BookmarkCheck className="w-4 h-4" />}
                label="Bookmarks"
              />
            )}

            <button
              type="button"
              className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                isLoggedIn
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={handleAuth}
            >
              {isLoggedIn ? (
                <>
                  <User className="w-4 h-4 mr-1" />
                  <span>Account</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-1" />
                  <span>Log In</span>
                </>
              )}
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <nav className="flex flex-col p-4 space-y-3">
            <MobileNavLink
              to="/search"
              icon={<GitCompare className="w-5 h-5" />}
              label="Browse Software"
            />
            {/* <MobileNavLink
              to="/compare"
              icon={<GitCompare className="w-5 h-5" />}
              label="Compare Software"
            /> */}
            {/* {isLoggedIn && (
              <MobileNavLink
                to="/bookmarks"
                icon={<BookmarkCheck className="w-5 h-5" />}
                label="Your Bookmarks"
              />
            )} */}
            {/* <button
              type="button"
              className={`flex items-center p-3 rounded-md text-left ${
                isLoggedIn
                  ? "bg-slate-100 text-slate-800"
                  : "bg-blue-600 text-white"
              }`}
              onClick={handleAuth}
            >
              {isLoggedIn ? (
                <>
                  <User className="w-5 h-5 mr-3" />
                  <span>Your Account</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-3" />
                  <span>Log In / Sign Up</span>
                </>
              )}
            </button> */}
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink = ({ to, icon, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      className={`flex items-center py-2 px-3 rounded-md transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {icon}
      <span className="ml-1">{label}</span>
    </Link>
  );
};

const MobileNavLink = ({ to, icon, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      className={`flex items-center p-3 rounded-md ${
        isActive ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-800"
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </Link>
  );
};

export default Header;
