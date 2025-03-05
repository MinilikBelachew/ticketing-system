import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  LogIn, 
  UserPlus, 
  Menu as MenuIcon,
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Login', href: '/login', icon: LogIn },
    { name: 'Signup', href: '/signup', icon: UserPlus },
  ];

  return (
    <nav className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-blue-600/20 animate-gradient"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white text-xl font-bold"
            >
              <Rocket className="h-6 w-6 animate-pulse" />
              <span className="opacity-90 hover:opacity-100 transition-opacity">
                Ticketing System
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative group px-4 py-2 rounded-lg text-blue-100 hover:text-white transition-colors duration-200"
              >
                <span className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <div className="relative flex items-center space-x-2">
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-blue-900/95 backdrop-blur-lg shadow-lg rounded-b-2xl transition-all duration-300 ease-in-out ${
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                