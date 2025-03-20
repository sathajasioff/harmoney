import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [userProfile, setUserProfile] = useState(null); // Store user profile info (like avatar)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate checking if the user is logged in (you can replace this with real authentication logic)
  const checkLoginStatus = () => {
    // If a user is logged in, set the profile info
    const user = JSON.parse(localStorage.getItem('user')); // Example of storing user info in localStorage
    if (user) {
      setIsLoggedIn(true);
      setUserProfile(user); // Store user profile info (e.g., avatar)
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status when the component mounts
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8",
        scrolled ? "bg-white bg-opacity-80 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" aria-label="Harmony Investment Home">
          <div className="w-10 h-10 rounded-full bg-harmony-600 flex items-center justify-center text-white font-display text-xl font-bold">H</div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Harmony <span className="text-harmony-600">Investment</span>
          </span>
        </Link>
        
        {/* Centered Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 mx-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <div className="relative group">
            <button className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-700 hover:text-harmony-600 hover:bg-gray-100 transition-colors duration-200">
              <span>Branch Details</span>
              <ChevronDown size={16} className="mt-0.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
              <Link to="/branches/jaffna" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Jaffna</Link>
              <Link to="/branches/vavuniya" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vavuniya</Link>
              <Link to="/branches/trinco" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Trinco</Link>
            </div>
          </div>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Conditional Rendering for Login or Profile */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            {/* Display Profile Image if logged in */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={userProfile?.avatar || '/default-avatar.jpg'} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        ) : (
          <Link to="/login" className="hidden md:block px-4 py-2 text-white bg-harmony-600 rounded-md hover:bg-harmony-700 transition-colors duration-200">
            Create Account
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={cn("fixed inset-0 bg-white z-40 transform transition-transform ease-in-out duration-300 md:hidden pt-20", isOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="flex flex-col space-y-2 p-4">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About Us</MobileNavLink>
          <div className="border-b border-gray-200 py-2">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                <span>Branch Details</span>
                <ChevronDown size={16} className="transition group-open:rotate-180" />
              </summary>
              <div className="mt-2 space-y-1 px-4">
                <MobileNavLink to="/branches/jaffna" onClick={() => setIsOpen(false)}>Jaffna</MobileNavLink>
                <MobileNavLink to="/branches/vavuniya" onClick={() => setIsOpen(false)}>Vavniya</MobileNavLink>
                <MobileNavLink to="/branches/trinco" onClick={() => setIsOpen(false)}>Trinco</MobileNavLink>
              </div>
            </details>
          </div>
          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
          <Link to="/login" className="block py-2 px-3 text-center text-white bg-harmony-600 rounded-md hover:bg-harmony-700 transition-colors duration-200" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link to={to} className="px-4 py-2 text-gray-700 hover:text-harmony-600 hover:bg-gray-100 transition-colors duration-200">
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link to={to} className="block py-2 px-3 text-gray-700 hover:text-harmony-600 hover:bg-gray-100 rounded-md transition-colors duration-200" onClick={onClick}>
    {children}
  </Link>
);

export default Navbar;
