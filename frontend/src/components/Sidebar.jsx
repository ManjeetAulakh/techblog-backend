import React from 'react';

const Sidebar = ({ posts, categories }) => {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat} className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors border-l-4 border-transparent hover:border-indigo-500 pl-3">
              {cat}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h3>
        <ul className="space-y-4">
          {posts.slice(1, 4).map(post => (
            <li key={post.id}>
              <a href="#" className="text-gray-700 font-semibold hover:text-indigo-600 transition-colors">{post.title}</a>
              <p className="text-gray-400 text-xs mt-1">{post.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;