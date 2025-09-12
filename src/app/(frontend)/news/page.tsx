'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { News } from '@/types/news';

// Mock data for news
const mockNews: News[] = [
  {
    id: '1',
    title: 'Students Excel in National Science Competition',
    content: 'Our school students have achieved remarkable success in the National Science Competition, with three students securing top positions in their respective categories.',
    excerpt: 'Our school students have achieved remarkable success in the National Science Competition...',
    featured_image: '/news/science-competition.jpg',
    category: 'achievement',
    is_published: true,
    published_at: '2024-01-15T10:00:00Z',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    author_id: 'admin-1',
    views: 245
  },
  {
    id: '2',
    title: 'New Computer Lab Inaugurated',
    content: 'The school has inaugurated a state-of-the-art computer lab equipped with the latest technology to enhance digital learning for our students.',
    excerpt: 'The school has inaugurated a state-of-the-art computer lab equipped with the latest technology...',
    featured_image: '/news/computer-lab.jpg',
    category: 'facility',
    is_published: true,
    published_at: '2024-01-12T14:30:00Z',
    created_at: '2024-01-12T14:30:00Z',
    updated_at: '2024-01-12T14:30:00Z',
    author_id: 'admin-1',
    views: 189
  },
  {
    id: '3',
    title: 'Annual Cultural Festival Celebrates Diversity',
    content: 'The annual cultural festival showcased the rich diversity of our school community with performances, exhibitions, and cultural displays from various traditions.',
    excerpt: 'The annual cultural festival showcased the rich diversity of our school community...',
    featured_image: '/news/cultural-festival.jpg',
    category: 'event',
    is_published: true,
    published_at: '2024-01-10T09:15:00Z',
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-10T09:15:00Z',
    author_id: 'admin-1',
    views: 312
  },
  {
    id: '4',
    title: 'Environmental Club Launches Green Initiative',
    content: 'Our Environmental Club has launched a comprehensive green initiative to promote sustainability and environmental awareness throughout the school.',
    excerpt: 'Our Environmental Club has launched a comprehensive green initiative to promote sustainability...',
    featured_image: '/news/green-initiative.jpg',
    category: 'activity',
    is_published: true,
    published_at: '2024-01-08T11:45:00Z',
    created_at: '2024-01-08T11:45:00Z',
    updated_at: '2024-01-08T11:45:00Z',
    author_id: 'admin-1',
    views: 156
  },
  {
    id: '5',
    title: 'Teacher Recognition Awards Ceremony',
    content: 'The school held its annual Teacher Recognition Awards ceremony to honor the dedication and excellence of our teaching staff.',
    excerpt: 'The school held its annual Teacher Recognition Awards ceremony to honor the dedication...',
    featured_image: '/news/teacher-awards.jpg',
    category: 'recognition',
    is_published: true,
    published_at: '2024-01-05T16:20:00Z',
    created_at: '2024-01-05T16:20:00Z',
    updated_at: '2024-01-05T16:20:00Z',
    author_id: 'admin-1',
    views: 203
  }
];

const categoryColors = {
  achievement: 'bg-green-100 text-green-800',
  facility: 'bg-blue-100 text-blue-800',
  event: 'bg-purple-100 text-purple-800',
  activity: 'bg-orange-100 text-orange-800',
  recognition: 'bg-yellow-100 text-yellow-800',
  announcement: 'bg-red-100 text-red-800'
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/news?limit=50');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        const newsData = data.news || [];

        setNews(newsData);
        setFilteredNews(newsData);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  }, [news, selectedCategory, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Unable to Load News</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                School News
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Stay informed about the latest happenings, achievements, and events at Surjomukhi Kindergarten.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="achievement">Achievements</option>
                <option value="facility">Facilities</option>
                <option value="event">Events</option>
                <option value="activity">Activities</option>
                <option value="recognition">Recognition</option>
                <option value="announcement">Announcements</option>
              </select>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full md:w-80"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {filteredNews.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured News</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-blue-400 to-indigo-600 relative overflow-hidden">
                    {filteredNews[0].image_url ? (
                      <img
                        src={filteredNews[0].image_url}
                        alt={filteredNews[0].title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <svg className="w-20 h-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      Featured News
                    </span>
                    <span className="text-sm text-gray-500 ml-4">
                      {formatDate(filteredNews[0].publish_date || filteredNews[0].created_at || '')}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{filteredNews[0].title}</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {filteredNews[0].excerpt || filteredNews[0].content?.substring(0, 200) + '...'}
                  </p>
                  <Link
                    href={`/news/${filteredNews[0].id}`}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Read Full Story
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No news found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.slice(1).map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          News
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(item.publish_date || item.created_at || '')}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {item.excerpt || item.content?.substring(0, 150) + '...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/news/${item.id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Read More →
                        </Link>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {item.views}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
