import React, { useState, useEffect } from 'react';

// Icon Components
const TrendingIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TagIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const FireIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Sidebar = ({ posts, categories }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced categories with icons and post counts
  const enhancedCategories = categories.map((cat, index) => ({
    name: cat,
    count: Math.floor(Math.random() * 50) + 10,
    icon: ['⚛️', '🎨', '⚡', '🔧', '📱', '🚀'][index] || '📁',
    color: ['blue', 'purple', 'yellow', 'green', 'pink', 'red'][index] || 'gray'
  }));

  // Popular tags
  const popularTags = [
    { name: 'react-hooks', count: 156 },
    { name: 'tailwind', count: 142 },
    { name: 'next-js', count: 98 },
    { name: 'typescript', count: 87 },
    { name: 'animation', count: 76 },
    { name: 'performance', count: 65 }
  ];

  // Trending topics
  const trendingTopics = [
    { title: 'AI in Web Development', growth: '+125%' },
    { title: 'React Server Components', growth: '+89%' },
    { title: 'Web3 Integration', growth: '+76%' },
    { title: 'Micro-Frontends', growth: '+54%' }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  // Add reading time to posts
  const enhancedPosts = posts.slice(1, 4).map(post => ({
    ...post,
    readTime: Math.floor(Math.random() * 5) + 3,
    views: Math.floor(Math.random() * 1000) + 500
  }));

  return (
    <aside className="lg:col-span-1 space-y-6">
      {/* Search Box */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center">
              <TrendingIcon className="mr-2" />
              Trending Now
            </h3>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Live</span>
          </div>
          <ul className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{topic.title}</span>
                <span className="text-xs bg-green-400/20 text-green-100 px-2 py-1 rounded-full">
                  {topic.growth}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Enhanced Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <TagIcon className="mr-2 text-indigo-500" />
            Categories
          </h3>
          <ul className="space-y-2">
            {enhancedCategories.map((cat) => (
              <li 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`
                  group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300
                  ${activeCategory === cat.name 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-transparent'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className={`font-medium ${activeCategory === cat.name ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'}`}>
                    {cat.name}
                  </span>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-400">
                  {cat.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Posts with Enhanced Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <ClockIcon className="mr-2 text-indigo-500" />
            Recent Posts
          </h3>
          <ul className="space-y-4">
            {enhancedPosts.map((post) => (
              <li key={post.id} className="group">
                <a href="#" className="block">
                  <h4 className="font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {post.readTime} min
                    </span>
                    <span className="flex items-center">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      {post.views}
                    </span>
                  </div>
                </a>
                <div className="h-px bg-gray-100 dark:bg-gray-700 mt-3"></div>
              </li>
            ))}
          </ul>
          <button className="w-full mt-4 text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All Posts →
          </button>
        </div>
      </div>

      {/* Popular Tags Cloud */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <FireIcon className="mr-2 text-orange-500" />
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <span
                key={tag.name}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400 transition-all cursor-pointer"
              >
                #{tag.name}
                <span className="ml-1 text-xs text-gray-500">({tag.count})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Weekly Newsletter</h3>
          <p className="text-sm opacity-90 mb-4">
            Get the best articles delivered to your inbox
          </p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 mb-3"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Subscribe Now
            </button>
          </form>
          {subscribed && (
            <p className="text-xs mt-3 text-center bg-green-500/20 py-2 rounded-lg">
              ✅ Successfully subscribed!
            </p>
          )}
        </div>
      </div>

      {/* Ad Space / Promotion */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 relative">
        <div className="absolute top-2 right-2 text-xs bg-yellow-500 text-gray-900 px-2 py-1 rounded-full font-semibold">
          SPONSORED
        </div>
        <h4 className="text-white font-bold mb-2">Premium Course</h4>
        <p className="text-gray-300 text-sm mb-3">Master React & Next.js in 2025</p>
        <button className="w-full py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all">
          Get 50% OFF
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
