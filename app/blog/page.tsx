"use client";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

const BlogPage = () => {
  // Mock blog posts data
  const featuredPost = {
    id: 1,
    title: "The Rise of Open Source: Why 2025 is the Year of Free Software",
    excerpt:
      "Explore how open source software is revolutionizing industries and why more companies are embracing FOSS solutions for their critical infrastructure.",
    author: "Sarah Chen",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Industry Trends",
    image:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Essential Open Source Tools Every Developer Should Know",
      excerpt:
        "From code editors to deployment tools, discover the free software that can supercharge your development workflow.",
      author: "Mike Rodriguez",
      date: "2025-01-12",
      readTime: "6 min read",
      category: "Development",
      image:
        "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      title: "GIMP vs Photoshop: A Comprehensive Comparison for 2025",
      excerpt:
        "Is GIMP really a viable alternative to Adobe Photoshop? We break down the features, performance, and use cases.",
      author: "Emma Thompson",
      date: "2025-01-10",
      readTime: "12 min read",
      category: "Design",
      image:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      title: "Building a Complete Office Suite with Free Software",
      excerpt:
        "Learn how to replace Microsoft Office with powerful open source alternatives that won't cost you a penny.",
      author: "David Park",
      date: "2025-01-08",
      readTime: "10 min read",
      category: "Productivity",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 5,
      title: "The Security Advantage of Open Source Software",
      excerpt:
        "Why transparency in code leads to more secure software and how the community-driven approach enhances cybersecurity.",
      author: "Lisa Wang",
      date: "2025-01-05",
      readTime: "7 min read",
      category: "Security",
      image:
        "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 6,
      title: "From Beginner to Pro: Learning Blender in 2025",
      excerpt:
        "A complete roadmap for mastering Blender, the world's most powerful free 3D creation suite.",
      author: "Alex Kumar",
      date: "2025-01-03",
      readTime: "15 min read",
      category: "Media",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 7,
      title:
        "The Economics of Free Software: How FOSS Projects Sustain Themselves",
      excerpt:
        "Understanding the business models and funding mechanisms that keep your favorite open source projects alive.",
      author: "Rachel Green",
      date: "2025-01-01",
      readTime: "9 min read",
      category: "Business",
      image:
        "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const categories = [
    "All Posts",
    "Industry Trends",
    "Development",
    "Design",
    "Productivity",
    "Security",
    "Media",
    "Business",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-6">
              The FOSS Blog
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and stories from the world of free and open
              source software. Stay updated with the latest trends and discover
              new tools to enhance your workflow.
            </p>
          </div>

          {/* Featured Post */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-6 mb-6 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-colors inline-flex items-center"
                >
                  Read Article
                </Link>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg border border-slate-200 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest articles about free and open source software
            delivered to your inbox. No spam, just quality content about the
            tools you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
