import React, { useState } from 'react';

// Import all your new components
import Header from './components/Header';
import FeaturedBlogPost from './components/FeaturedBlogPost';
import StandardBlogPost from './components/StandardBlogPost';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Your data can stay here for now, or be moved to its own file e.g., src/data/posts.js
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

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);
  const categories = [...new Set(posts.map(p => p.category))];

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

      <Footer />
    </div>
  );
}

export default App;