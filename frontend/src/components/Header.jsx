import React, { useState, useEffect } from 'react';

// Animated Hamburger Icon Component
const AnimatedHamburger = ({ isOpen }) => (
  <div className="relative w-6 h-6 cursor-pointer">
    <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
    <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
    <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
  </div>
);

// Search Icon Component
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Notification Icon Component
const NotificationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

// Dark Mode Icon Component
const DarkModeIcon = ({ isDark }) => (
  isDark ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const navLinks = [
    { title: 'React', href: '#react', icon: '⚛️' },
    { title: 'CSS', href: '#css', icon: '🎨' },
    { title: 'JavaScript', href: '#javascript', icon: '⚡' },
    { title: 'About', href: '#about', icon: '👋' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-2 text-sm animate-pulse">
        <span className="inline-flex items-center">
          <span className="mr-2">🚀</span>
          New Course: Advanced React Patterns - 50% OFF!
          <span className="ml-2">🎉</span>
        </span>
      </div>

      <header 
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-white dark:bg-gray-900 shadow-md'
          }
        `}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo with hover effect */}
            <div className="flex items-center group">
              <a href="#" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xl px-3 py-1 rounded-lg">
                    TD
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  The Dev Post
                </span>
              </a>
            </div>

            {/* Center Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`
                    group relative px-4 py-2 rounded-lg transition-all duration-300
                    ${activeLink === link.href 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }
                  `}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.title}</span>
                  </span>
                  {activeLink === link.href && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></span>
                  )}
                </a>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Search Bar - Desktop */}
              <div className="hidden lg:flex items-center">
                <div className={`
                  flex items-center transition-all duration-300 overflow-hidden
                  ${searchOpen ? 'w-64' : 'w-0'}
                `}>
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <SearchIcon />
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                <DarkModeIcon isDark={isDarkMode} />
              </button>

              {/* Notification Bell */}
              <button className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                <NotificationIcon />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Subscribe Button with gradient */}
              <button className="hidden md:flex relative group overflow-hidden px-6 py-2.5 rounded-full font-medium text-white">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-transform duration-300 group-hover:scale-110"></span>
                <span className="relative flex items-center space-x-2">
                  <span>Subscribe</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Pro</span>
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatedHamburger isOpen={isMenuOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide from right */}
        <div 
          className={`
            fixed inset-y-0 right-0 w-full sm:w-80 bg-white dark:bg-gray-900 shadow-2xl
            transform transition-transform duration-300 ease-in-out lg:hidden
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          style={{ top: '64px' }}
        >
          {/* Mobile Search */}
          <div className="p-4 border-b dark:border-gray-800">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full px-4 py-3 pl-10 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <SearchIcon className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{link.title}</span>
              </a>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="p-4 space-y-4">
            <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              <span>Subscribe to Pro</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
            
            <div className="flex justify-around">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex flex-col items-center space-y-1 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <DarkModeIcon isDark={isDarkMode} />
                <span className="text-xs">Theme</span>
              </button>
              <button className="flex flex-col items-center space-y-1 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                <NotificationIcon />
                <span className="text-xs">Alerts</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop for mobile menu */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 lg:hidden"
            style={{ top: '64px' }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
};

export default Header;
