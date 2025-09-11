import React, { useState, useEffect } from 'react';

// Icon Components
const HeartIcon = ({ filled }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a3 3 0 10-5.464 0m5.464 0a3 3 0 10-5.464 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
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

const CommentIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const FeaturedBlogPost = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(342);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Enhanced post data
  const enhancedPost = {
    ...post,
    readTime: 8,
    views: '12.5k',
    comments: 89,
    trending: true,
    premium: false,
    tags: ['React', 'Performance', 'Best Practices']
  };

  // Simulate reading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const shareOptions = [
    { name: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-600' },
    { name: 'Facebook', icon: '👤', color: 'bg-blue-700' },
    { name: 'Copy Link', icon: '🔗', color: 'bg-gray-600' }
  ];

  return (
    <div className="relative mb-16">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 z-50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Card */}
      <article className="rounded-3xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 group relative">
        {/* Trending Badge */}
        {enhancedPost.trending && (
          <div className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-bold">Trending</span>
          </div>
        )}

        {/* Premium Badge */}
        {enhancedPost.premium && (
          <div className="absolute top-6 right-6 z-20 flex items-center space-x-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-full shadow-lg">
            <span className="text-lg">⭐</span>
            <span className="text-sm font-bold">Premium</span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative overflow-hidden h-[500px] bg-gradient-to-br from-purple-100 to-indigo-100">
          {/* Skeleton Loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          )}
          
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            onLoad={() => setImageLoaded(true)}
            className={`
              w-full h-full object-cover transition-all duration-700
              ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
              group-hover:scale-110 group-hover:rotate-1
            `}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Play Button for Video Posts */}
          {post.hasVideo && (
            <button className="absolute inset-0 flex items-center justify-center group/play">
              <div className="bg-white/90 rounded-full p-4 transform transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-white">
                <PlayIcon className="text-gray-900" />
              </div>
            </button>
          )}

          {/* Category & Tags */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
              {post.category}
            </span>
            {enhancedPost.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-10">
          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            <a href="#" className="hover:underline decoration-2 underline-offset-4">
              {post.title}
            </a>
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center space-x-1">
              <ClockIcon />
              <span>{enhancedPost.readTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <EyeIcon />
              <span>{enhancedPost.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <CommentIcon />
              <span>{enhancedPost.comments} comments</span>
            </div>
            <div className="flex items-center space-x-1">
              <HeartIcon filled={false} />
              <span>{likeCount} likes</span>
            </div>
          </div>

          {/* Author & Actions Row */}
          <div className="flex items-center justify-between">
            {/* Author Info */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-gray-100 dark:ring-gray-700" 
                  src={post.authorAvatar} 
                  alt={post.author} 
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white flex items-center">
                  {post.author}
                  <span className="ml-2 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                    Pro Author
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date} • Follow
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`
                  p-3 rounded-full transition-all duration-300 transform hover:scale-110
                  ${liked 
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 dark:bg-gray-700 dark:text-gray-400'
                  }
                `}
              >
                <HeartIcon filled={liked} />
              </button>
              
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`
                  p-3 rounded-full transition-all duration-300 transform hover:scale-110
                  ${bookmarked 
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 dark:bg-gray-700 dark:text-gray-400'
                  }
                `}
              >
                <BookmarkIcon filled={bookmarked} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
                >
                  <ShareIcon />
                </button>
                
                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
                    {shareOptions.map((option, index) => (
                      <button
                        key={index}
                        className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-lg">{option.icon}</span>
                        <span className="text-sm font-medium">{option.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex items-center justify-center">
            <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">Continue Reading</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </article>

      {/* Floating Action Buttons - Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        <button
          onClick={handleLike}
          className={`
            p-4 rounded-full shadow-lg transition-all duration-300
            ${liked ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}
          `}
        >
          <HeartIcon filled={liked} />
        </button>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`
            p-4 rounded-full shadow-lg transition-all duration-300
            ${bookmarked ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'}
          `}
        >
          <BookmarkIcon filled={bookmarked} />
        </button>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FeaturedBlogPost;
