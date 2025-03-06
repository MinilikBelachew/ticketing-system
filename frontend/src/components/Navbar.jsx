import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { 
  Rocket, 
  LogIn, 
  UserPlus, 
  LogOut, 
  Menu as MenuIcon,
  X 
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login"); // Redirect to login page
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
            {!token ? (
              <>
                <Link to="/login" className="nav-link">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="nav-link">
                  <UserPlus className="h-5 w-5" />
                  <span>Signup</span>
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="nav-link">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
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
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-900/95 backdrop-blur-lg shadow-lg rounded-b-2xl transition-all duration-300 ease-in-out">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {!token ? (
                <>
                  <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                  <Link to="/signup" className="nav-link" onClick={() => setIsOpen(false)}>
                    <UserPlus className="h-5 w-5" />
                    <span>Signup</span>
                  </Link>
                </>
              ) : (
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="nav-link">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Styling for active buttons */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          animation: gradient 15s linear infinite;
          background-size: 200% 200%;
        }

        .nav-link {
          display: flex;
          align-items: center;
          space-x-2;
          padding: 8px 16px;
          border-radius: 8px;
          color: #cbd5e1;
          transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
        }

        .nav-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
