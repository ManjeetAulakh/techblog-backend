import React from 'react';

// Icons are defined here as they are specific to this component's style
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 inline text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 inline text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const StandardBlogPost = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
      <a href="#" className="block h-48 overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </a>
      <div className="p-6">
        <span className="text-xs font-semibold text-purple-600 bg-purple-100 py-1 px-3 rounded-full">{post.category}</span>
        <h3 className="text-xl font-bold my-3 text-gray-900 group-hover:text-purple-600 transition-colors">
          <a href="#">{post.title}</a>
        </h3>
        <div className="text-gray-500 text-sm flex items-center">
          <UserIcon /> {post.author}
          <span className="mx-2">•</span>
          <CalendarIcon /> {post.date}
        </div>
      </div>
    </div>
  );
};

export default StandardBlogPost;