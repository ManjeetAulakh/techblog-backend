import React, { useState } from 'react';

// Mock data for blog posts - later this would come from an API
const initialPosts = [
  {
    id: 1,
    title: 'Getting Started with React Hooks',
    author: 'Jane Doe',
    date: 'September 10, 2025',
    category: 'React',
    excerpt: 'A comprehensive guide to understanding and using React Hooks for state management and side effects in your functional components.',
    comments: [
      { id: 101, user: 'Alice', text: 'Great article, very helpful!' },
      { id: 102, user: 'Bob', text: 'Thanks for sharing.' }
    ]
  },
  {
    id: 2,
    title: 'A Guide to Tailwind CSS',
    author: 'John Smith',
    date: 'September 8, 2025',
    category: 'CSS',
    excerpt: 'Learn how to rapidly build modern websites without ever leaving your HTML. A look into the utility-first CSS framework.',
    comments: [
        { id: 201, user: 'Charlie', text: 'I love Tailwind!' }
    ]
  },
  {
    id: 3,
    title: 'Understanding Asynchronous JavaScript',
    author: 'Emily White',
    date: 'September 5, 2025',
    category: 'JavaScript',
    excerpt: 'Dive deep into Promises, async/await, and the event loop to master asynchronous operations in JavaScript.',
    comments: []
  }
];


// A reusable component to display a single blog post
const BlogPost = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 p-6 transition-transform transform hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <span className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-indigo-600 bg-indigo-200">
          {post.category}
        </span>
      </div>
      <a href="#" className="block mt-1 text-3xl leading-tight font-bold text-black hover:underline">
        {post.title}
      </a>
      <div className="mt-2 text-gray-500 text-sm">
        <span>By {post.author}</span>
        <span className="mx-2">•</span>
        <span>{post.date}</span>
      </div>
      <p className="mt-4 text-gray-600">
        {post.excerpt}
      </p>
      <div className="mt-6 flex justify-between items-center">
        <a href="#" className="text-indigo-500 hover:text-indigo-700 font-semibold">
          Read more →
        </a>
        <div className="text-gray-500">
          {post.comments.length} Comments
        </div>
      </div>
    </div>
  );
};


// The main App component that renders the page
function App() {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">My Awesome Blog</h1>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10">
        <div className="max-w-3xl mx-auto">
          {posts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      </main>

       <footer className="text-center py-6 text-gray-500 text-sm">
        © 2025 My Awesome Blog. All rights reserved.
      </footer>
    </div>
  );
}

export default App;