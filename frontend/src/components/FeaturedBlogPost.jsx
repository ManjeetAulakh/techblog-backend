import React from 'react';

const FeaturedBlogPost = ({ post }) => {
  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden bg-white group mb-16">
      <a href="#" className="block overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300" />
      </a>
      <div className="p-8">
        <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 py-1 px-3 rounded-full">{post.category}</span>
        <h2 className="text-4xl font-extrabold my-4 text-gray-900 group-hover:text-indigo-600 transition-colors">
          <a href="#">{post.title}</a>
        </h2>
        <p className="text-gray-600 text-lg mb-6">{post.excerpt}</p>
        <div className="flex items-center">
          <img className="w-12 h-12 rounded-full mr-4 object-cover" src={post.authorAvatar} alt={post.author} />
          <div>
            <p className="text-gray-900 font-semibold">{post.author}</p>
            <p className="text-gray-500 text-sm">{post.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPost;