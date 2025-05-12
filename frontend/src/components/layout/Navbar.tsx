import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Fingerprint, Menu, X, History, Home, Info } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive 
        ? 'text-white bg-teal-600' 
        : 'text-slate-700 hover:bg-slate-200'
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <Fingerprint className="h-8 w-8 text-teal-600" />
            <span className="font-bold text-xl text-slate-800">BioID<span className="text-teal-600">Scan</span></span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className={navLinkClass}>
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/analysis" className={navLinkClass}>
              <Fingerprint size={18} />
              <span>Analysis</span>
            </NavLink>
            <NavLink to="/history" className={navLinkClass}>
              <History size={18} />
              <span>History</span>
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              <Info size={18} />
              <span>About</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-800 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 pb-6 bg-white">
            <NavLink to="/" className={navLinkClass} onClick={toggleMenu}>
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/analysis" className={navLinkClass} onClick={toggleMenu}>
              <Fingerprint size={18} />
              <span>Analysis</span>
            </NavLink>
            <NavLink to="/history" className={navLinkClass} onClick={toggleMenu}>
              <History size={18} />
              <span>History</span>
            </NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={toggleMenu}>
              <Info size={18} />
              <span>About</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;