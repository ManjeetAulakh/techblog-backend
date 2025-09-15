import React, { useState, useRef, useEffect } from 'react';

// Enhanced Icon Components
const CalendarIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg className="h-4 w-4" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg className="h-4 w-4" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const CommentIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const StandardBlogPost = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Enhanced post data
  const enhancedPost = {
    ...post,
    readTime: Math.floor(Math.random() * 10) + 3,
    likes: Math.floor(Math.random() * 100) + 20,
    comments: Math.floor(Math.random() * 30) + 5,
    trending: Math.random() > 0.7,
    isNew: Math.random() > 0.8
  };

  // Mouse move effect for gradient
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  // Category color mapping
  const categoryColors = {
    'React': 'from-blue-500 to-cyan-500',
    'CSS': 'from-purple-500 to-pink-500',
    'JavaScript': 'from-yellow-500 to-orange-500',
    'Node.js': 'from-green-500 to-emerald-500',
    'TypeScript': 'from-blue-600 to-indigo-600',
    'default': 'from-gray-500 to-slate-500'
  };

  const getCategoryGradient = (category) => {
    return categoryColors[category] || categoryColors.default;
  };

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group transition-all duration-500 transform hover:-translate-y-2"
    >
      {/* Gradient Border Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {enhancedPost.isNew && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            NEW
          </span>
        )}
        {enhancedPost.trending && (
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            🔥 HOT
          </span>
        )}
      </div>

      {/* Quick Actions - Top Right */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-red-100'
          }`}
        >
          <HeartIcon filled={liked} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setBookmarked(!bookmarked);
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            bookmarked ? 'bg-indigo-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-indigo-100'
          }`}
        >
          <BookmarkIcon filled={bookmarked} />
        </button>
      </div>

      {/* Image Container */}
      <a href="#" className="block relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse">
            <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
          </div>
        )}
        
        {/* Main Image */}
        <img 
          src={post.imageUrl} 
          alt={post.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-110 group-hover:rotate-1`}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge - Bottom of Image */}
        <div className="absolute bottom-4 left-4">
          <span className={`inline-flex items-center px-3 py-1.5 text-xs font-bold text-white rounded-full bg-gradient-to-r ${getCategoryGradient(post.category)} shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
            {post.category}
          </span>
        </div>

        {/* Read Time - Bottom Right of Image */}
        <div className="absolute bottom-4 right-4">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full">
            <ClockIcon />
            {enhancedPost.readTime} min
          </span>
        </div>
      </a>

      {/* Content Section */}
      <div className="p-6 relative">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          <a href="#" className="hover:underline decoration-2 underline-offset-2">
            {post.title}
          </a>
        </h3>

        {/* Excerpt - Only on hover */}
        <p className={`text-gray-600 dark:text-gray-300 text-sm line-clamp-2 transition-all duration-500 ${
          isHovered ? 'opacity-100 max-h-20 mb-4' : 'opacity-0 max-h-0'
        }`}>
          {post.excerpt || "Discover insights and best practices in this comprehensive guide..."}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <UserIcon />
              <span className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">
                {post.author}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon />
              <span>{post.date}</span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <HeartIcon filled={false} />
              <span>{enhancedPost.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-indigo-500 transition-colors">
              <CommentIcon />
              <span>{enhancedPost.comments}</span>
            </button>
          </div>
          
          {/* Read More Link */}
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-300 group/link"
          >
            <span>Read More</span>
            <ArrowRightIcon className="transform transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </div>

        {/* Author Avatar - Floating */}
        <div className="absolute -top-6 right-6">
          <img 
            className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover" 
            src={post.authorAvatar} 
            alt={post.author}
          />
        </div>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
      </div>
    </article>
  );
};

export default StandardBlogPost;
