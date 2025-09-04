'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronRight, Sparkles, Clock, Users, Star } from 'lucide-react';
import Link from 'next/link';
import { Project, Category } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch('/api/projects?limit=12'),
        fetch('/api/categories')
      ]);

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
        setFeaturedProjects(projectsData.filter((p: Project) => p.is_featured).slice(0, 3));
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery)}`;
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                🧱 ProjectBlox
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/submit" className="text-gray-600 hover:text-gray-900">Submit Project</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Amazing
              <span className="text-yellow-400 block">Micro-Projects</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Complete creative projects in hours, not months. Build, learn, and create with our curated collection of DIY projects.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for projects, categories, or skills..."
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Browse Button */}
            <Link
              href="/browse"
              className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse Projects
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-gray-600">Find projects that match your interests and skill level</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/browse?category=${category.slug}`}
                className="group p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Popular Projects */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Projects</h2>
              <p className="text-gray-600">Most loved by our community</p>
            </div>
            <Link
              href="/browse"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.slice(0, 8).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-300">Thousands of creators are already building amazing things</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,234</div>
              <div className="text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">12.5K</div>
              <div className="text-gray-400">Completions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">890</div>
              <div className="text-gray-400">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-gray-400">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/browse">Browse Projects</Link></li>
                <li><Link href="/submit">Submit Project</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/guidelines">Guidelines</Link></li>
                <li><Link href="/creators">Top Creators</Link></li>
                <li><Link href="/feedback">Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/about">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/cookies">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 ProjectBlox. Built with ❤️ for creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
