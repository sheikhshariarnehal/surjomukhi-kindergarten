'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download as DownloadIcon, FileText, File, Image, Video, Archive, Loader2, Calendar, Eye } from 'lucide-react';
import { Download } from '@/types/gallery';

interface DownloadsResponse {
  downloads: Download[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const fileTypeIcons = {
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  txt: FileText,
  jpg: Image,
  jpeg: Image,
  png: Image,
  gif: Image,
  mp4: Video,
  avi: Video,
  mov: Video,
  zip: Archive,
  rar: Archive,
  default: File,
};

const categories = [
  { id: 'all', name: 'All Categories', color: 'bg-gray-100 text-gray-800' },
  { id: 'forms', name: 'Forms & Applications', color: 'bg-blue-100 text-blue-800' },
  { id: 'syllabus', name: 'Syllabus & Curriculum', color: 'bg-green-100 text-green-800' },
  { id: 'notices', name: 'Important Notices', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'results', name: 'Results & Reports', color: 'bg-purple-100 text-purple-800' },
  { id: 'policies', name: 'Policies & Guidelines', color: 'bg-red-100 text-red-800' },
  { id: 'resources', name: 'Learning Resources', color: 'bg-indigo-100 text-indigo-800' },
];

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredDownloads, setFilteredDownloads] = useState<Download[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch downloads from API
  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: '20',
          ...(searchTerm && { search: searchTerm }),
          ...(selectedCategory && selectedCategory !== 'all' && { category: selectedCategory }),
        });

        const response = await fetch(`/api/downloads?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch downloads');
        }

        const data: DownloadsResponse = await response.json();
        
        if (page === 1) {
          setDownloads(data.downloads || []);
        } else {
          setDownloads(prev => [...prev, ...(data.downloads || [])]);
        }
        
        setHasMore(page < (data.pagination?.totalPages || 1));
        setFilteredDownloads(data.downloads || []);
      } catch (err) {
        console.error('Error fetching downloads:', err);
        setError('Failed to load downloads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, [page, searchTerm, selectedCategory]);

  // Reset page when search or filter changes
  useEffect(() => {
    setPage(1);
    setDownloads([]);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    const IconComponent = fileTypeIcons[extension as keyof typeof fileTypeIcons] || fileTypeIcons.default;
    return IconComponent;
  };

  const getFileSize = (url: string) => {
    // This would typically come from the API, but for now we'll show a placeholder
    return 'Unknown size';
  };

  const handleDownload = async (download: Download) => {
    try {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = download.file_url;
      link.download = download.title;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading downloads...</p>
        </div>
      </div>
    );
  }

  if (error && downloads.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DownloadIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Downloads</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Downloads - Surjomukhi Kindergarten",
    "description": "Download important school documents, forms, applications, syllabus, policies, and educational resources",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/downloads`,
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Surjomukhi Kindergarten"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "School Downloads",
      "numberOfItems": downloads.length,
      "itemListElement": downloads.slice(0, 10).map((download, index) => ({
        "@type": "DigitalDocument",
        "position": index + 1,
        "name": download.title,
        "url": download.file_url,
        "category": download.category,
        "datePublished": download.uploaded_at
      }))
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <DownloadIcon className="h-10 w-10" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Downloads Center
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Access important documents, forms, resources, and materials for students and parents
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">{downloads.length}</div>
                <div className="text-blue-200">Available Files</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{categories.length - 1}</div>
                <div className="text-blue-200">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search files and documents..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id === 'all' ? '' : category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-medium">{downloads.length}</span> file{downloads.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-6 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id === 'all' ? '' : category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (selectedCategory === '' && category.id === 'all') || selectedCategory === category.id
                    ? category.color
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {downloads.length === 0 && !loading ? (
            <div className="text-center py-16">
              <DownloadIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Files Found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory
                  ? "Try adjusting your search criteria or filters."
                  : "No files are currently available for download."}
              </p>
            </div>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {downloads.map((download, index) => {
                  const IconComponent = getFileIcon(download.title);
                  const categoryInfo = categories.find(cat => cat.id === download.category) || categories[0];

                  return (
                    <motion.div
                      key={download.id}
                      variants={itemVariants}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                              <IconComponent className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
                                {download.title}
                              </h3>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                                {categoryInfo.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(download.uploaded_at).toLocaleDateString()}
                          </span>
                          <span>{getFileSize(download.file_url)}</span>
                        </div>

                        <button
                          onClick={() => handleDownload(download)}
                          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center group-hover:bg-blue-700"
                        >
                          <DownloadIcon className="h-5 w-5 mr-2" />
                          Download File
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Loading...
                      </>
                    ) : (
                      'Load More Files'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      </div>
    </>
  );
}
