import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load components for better performance
const Header = lazy(() => import('./components/Header'));
const FeaturedBlogPost = lazy(() => import('./components/FeaturedBlogPost'));
const StandardBlogPost = lazy(() => import('./components/StandardBlogPost'));
const Sidebar = lazy(() => import('./components/Sidebar'));
const Footer = lazy(() => import('./components/Footer'));

// Loading Skeleton Component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8"></div>
    <div className="grid md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
      ))}
    </div>
  </div>
);

// Enhanced data with more fields
const initialPosts = [
  {
    id: 1,
    title: 'Exploring the new React 19 Features',
    author: 'Jane Doe',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    date: 'September 12, 2025',
    category: 'React',
    excerpt: 'React 19 brings exciting new features like the compiler and actions. Let\'s dive deep into what they mean for developers.',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
    readTime: 8,
    likes: 234,
    comments: 45,
    hasVideo: false,
    premium: false
  },
  {
    id: 2,
    title: 'A Deep Dive into Advanced CSS Selectors',
    author: 'John Smith',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    date: 'September 10, 2025',
    category: 'CSS',
    excerpt: 'Go beyond .class and #id. Discover the power of pseudo-classes and pseudo-elements to style your components with precision.',
    imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421b436d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
    readTime: 6,
    likes: 189,
    comments: 23,
    hasVideo: true,
    premium: false
  },
  {
    id: 3,
    title: 'Modern JavaScript: ES2025 and Beyond',
    author: 'Emily White',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    date: 'September 8, 2025',
    category: 'JavaScript',
    excerpt: 'The JavaScript language is always evolving. Let\'s explore some of the newest features that will make your code cleaner and more powerful.',
    imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
    readTime: 10,
    likes: 456,
    comments: 67,
    hasVideo: false,
    premium: true
  },
  {
    id: 4,
    title: 'Building a Design System with Tailwind',
    author: 'Chris Green',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    date: 'September 5, 2025',
    category: 'CSS',
    excerpt: 'Learn how to leverage Tailwind CSS configuration to build a reusable and consistent design system for your projects.',
    imageUrl: 'https://images.unsplash.com/photo-1618022035364-bp395561932d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
    readTime: 12,
    likes: 321,
    comments: 54,
    hasVideo: false,
    premium: false
  }
];

// Loading Messages
const loadingMessages = [
  "Loading amazing content...",
  "Preparing your reading experience...",
  "Fetching the latest articles...",
  "Almost there..."
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [showScrollProgress, setShowScrollProgress] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const mainRef = useRef(null);
  const heroRef = useRef(null);

  // Simulate initial loading
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 1000);

    setTimeout(() => {
      setIsLoading(false);
      clearInterval(messageInterval);
    }, 2000);

    return () => clearInterval(messageInterval);
  }, []);

  // Dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollProgress(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);
  const categories = ['all', ...new Set(posts.map(p => p.category))];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative">
            {/* Animated Logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-8"
            >
              <div className="w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
                TD
              </div>
            </motion.div>
            
            {/* Loading Bar */}
            <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
              <motion.div
                animate={{ x: [-256, 256] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-32 bg-gradient-to-r from-purple-600 to-indigo-600"
              />
            </div>
            
            {/* Loading Message */}
            <motion.p
              key={loadingMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-gray-600 dark:text-gray-400"
            >
              {loadingMessage}
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <AnimatePresence>
        {showScrollProgress && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600"
              style={{ width: `${scrollProgress}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <Suspense fallback={<div className="h-20 bg-white dark:bg-gray-800" />}>
        <Header />
      </Suspense>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-indigo-50 to-pink-100 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-pink-900/20" />
        <div className="relative container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome to The Dev Post
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover cutting-edge web development tutorials, insights, and best practices
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 text-lg rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    filterCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  {category === 'all' ? 'All Posts' : category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </section>

      {/* Main Content */}
      <main ref={mainRef} className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={filterCategory + searchQuery}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid lg:grid-cols-3 gap-12"
          >
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {featuredPost ? (
                <>
                  <motion.div variants={itemVariants}>
                    <Suspense fallback={<SkeletonLoader />}>
                      <FeaturedBlogPost post={featuredPost} />
                    </Suspense>
                  </motion.div>
                  
                  <motion.div 
                    variants={containerVariants}
                    className="grid md:grid-cols-2 gap-8"
                  >
                    {otherPosts.map((post) => (
                      <motion.div key={post.id} variants={itemVariants}>
                        <Suspense fallback={<div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />}>
                          <StandardBlogPost post={post} />
                        </Suspense>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                    No posts found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter criteria
                  </p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div variants={itemVariants}>
              <Suspense fallback={<div className="space-y-6">{[1, 2, 3].map(n => <div key={n} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />)}</div>}>
                <Sidebar posts={posts} categories={categories.filter(c => c !== 'all')} />
              </Suspense>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Load More Section */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16"
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">Load More Articles</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        )}
      </main>

      {/* Newsletter CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-16"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with the Latest Posts
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join 50,000+ developers getting weekly insights
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
            Subscribe Now
          </button>
        </div>
      </motion.section>

      {/* Footer */}
      <Suspense fallback={<div className="h-64 bg-gray-800" />}>
        <Footer />
      </Suspense>

      {/* Dark Mode Toggle - Floating */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-8 left-8 p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg z-40 transition-colors"
      >
        {darkMode ? '☀️' : '🌙'}
      </motion.button>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default App;
