import React, { useState } from 'react';

// --- ICONS (as simple components) ---
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


// --- MOCK DATA (with images and avatars) ---
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
  }
];


// --- UI COMPONENTS ---

// Header/Navbar
const Header = () => (
  <header className="bg-white shadow-md sticky top-0 z-10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
        The Dev Post
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-600 hover:text-indigo-500">React</a>
        <a href="#" className="text-gray-600 hover:text-indigo-500">CSS</a>
        <a href="#" className="text-gray-600 hover:text-indigo-500">JavaScript</a>
        <a href="#" className="text-gray-600 hover:text-indigo-500">About</a>
      </nav>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors">
        Subscribe
      </button>
    </div>
  </header>
);

// Featured Post Card
const FeaturedBlogPost = ({ post }) => (
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

// Standard Post Card
const StandardBlogPost = ({ post }) => (
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

// Sidebar
const Sidebar = ({ posts, categories }) => (
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


// --- MAIN APP COMPONENT ---
function App() {
  const [posts, setPosts] = useState(initialPosts);
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);
  const categories = [...new Set(posts.map(p => p.category))]; // Get unique categories

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <FeaturedBlogPost post={featuredPost} />
            <div className="grid md:grid-cols-2 gap-8">
              {otherPosts.map(post => (
                <StandardBlogPost key={post.id} post={post} />
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <Sidebar posts={posts} categories={categories} />

        </div>
      </main>
    </div>
  );
}

export default App;