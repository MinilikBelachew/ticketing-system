import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  LogIn, 
  UserPlus, 
  LogOut, 
  Menu as MenuIcon,
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (Assuming auth token is stored in localStorage)
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-blue-600/20 animate-gradient"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
            <Link to="/" className="flex items-center space-x-2 text-white text-xl font-bold">
              <Rocket className="h-6 w-6 animate-pulse" />
              <span className="opacity-90 hover:opacity-100 transition-opacity">
                Ticketing System
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="nav-link">
                  <LogIn className="h-5 w-5" /> Login
                </Link>
                <Link to="/signup" className="nav-link">
                  <UserPlus className="h-5 w-5" /> Signup
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="nav-link">
                <LogOut className="h-5 w-5" /> Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-blue-900/95 backdrop-blur-lg shadow-lg rounded-b-2xl transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="mobile-link" onClick={() => setIsOpen(false)}>
                  <LogIn className="h-5 w-5" /> Login
                </Link>
                <Link to="/signup" className="mobile-link" onClick={() => setIsOpen(false)}>
                  <UserPlus className="h-5 w-5" /> Signup
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="mobile-link">
                <LogOut className="h-5 w-5" /> Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CSS Styling for Navigation Links */}
      <style jsx>{`
        .nav-link {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px;
          border-radius: 8px;
          color: #cbd5e1;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: white;
        }
        .mobile-link {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px;
          width: 100%;
          text-align: left;
          color: #cbd5e1;
          transition: background 0.2s;
        }
        .mobile-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
