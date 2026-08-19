'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Download as DownloadIcon, 
  FileText, 
  File, 
  Image as ImageIcon, 
  Archive, 
  Loader2, 
  Calendar,
  Sparkles,
  FileSpreadsheet,
  AlertCircle,
  FolderArchive,
  ArrowDownToLine,
  CheckCircle2,
  Table as TableIcon,
  Grid,
  FileCheck,
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Download } from '@/types/gallery';
import { useLanguage } from '@/contexts/LanguageContext';

const DEFAULT_DOCUMENTS: Download[] = [
  {
    id: 'doc-admission-form-2025',
    title: 'ভর্তি আবেদন পত্র ও নির্দেশিকা ২০২৫-২৬ (Admission Application Form)',
    file_url: '/downloads/admission-form-2025.pdf',
    category: 'forms',
    uploaded_at: '2025-01-10T08:00:00.000Z'
  },
  {
    id: 'doc-academic-calendar-2025',
    title: 'বার্ষিক একাডেমিক ক্যালেন্ডার ও ছুটির তালিকা ২০২৫ (Academic Calendar)',
    file_url: '/downloads/academic-calendar-2025.pdf',
    category: 'notices',
    uploaded_at: '2025-01-01T08:00:00.000Z'
  },
  {
    id: 'doc-play-nursery-syllabus',
    title: 'প্লে ও নার্সারি শ্রেণির পূর্ণাঙ্গ সিলেবাস (Play & Nursery Syllabus)',
    file_url: '/downloads/play-nursery-syllabus.pdf',
    category: 'syllabus',
    uploaded_at: '2025-01-15T09:00:00.000Z'
  },
  {
    id: 'doc-primary-syllabus-grade-1-5',
    title: '১ম হতে ৫ম শ্রেণির সমন্বিত পাঠ্যক্রম ও মানবণ্টন (Class 1–5 Syllabus)',
    file_url: '/downloads/primary-syllabus-grade-1-5.pdf',
    category: 'syllabus',
    uploaded_at: '2025-01-15T09:00:00.000Z'
  },
  {
    id: 'doc-first-term-exam-routine',
    title: '১ম সাময়িক মূল্যায়ন সময়সূচি ২০২৫ (1st Term Exam Routine)',
    file_url: '/downloads/first-term-routine-2025.pdf',
    category: 'notices',
    uploaded_at: '2025-02-10T10:00:00.000Z'
  },
  {
    id: 'doc-student-handbook-rules',
    title: 'শিক্ষার্থী আচরণবিধি ও অভিভাবক নির্দেশিকা (Student Code & Handbook)',
    file_url: '/downloads/student-handbook-rules.pdf',
    category: 'policies',
    uploaded_at: '2025-01-05T08:30:00.000Z'
  },
  {
    id: 'doc-tuition-fee-structure',
    title: '২০২৫ শিক্ষাবর্ষের বেতন ও ফি কাঠামো (Tuition & Fee Structure)',
    file_url: '/downloads/fee-structure-2025.pdf',
    category: 'policies',
    uploaded_at: '2025-01-01T08:00:00.000Z'
  },
  {
    id: 'doc-scholarship-guidelines',
    title: 'মেধাবৃত্তি ও ফলাফল মূল্যায়ন নীতিমালা (Merit Scholarship Policy)',
    file_url: '/downloads/scholarship-guidelines.pdf',
    category: 'policies',
    uploaded_at: '2025-01-20T11:00:00.000Z'
  }
];

interface DownloadsResponse {
  downloads: Download[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function DownloadsPage() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const categories = [
    { id: 'all', nameEn: 'All Documents', nameBn: 'সকল ডকুমেন্টস' },
    { id: 'forms', nameEn: 'Admission & Forms', nameBn: 'ভর্তি ও আবেদন ফরম' },
    { id: 'syllabus', nameEn: 'Academic Syllabi', nameBn: 'সিলেবাস ও পাঠ পরিকল্পনা' },
    { id: 'notices', nameEn: 'Routines & Notices', nameBn: 'রুটিন ও নোটিশ' },
    { id: 'policies', nameEn: 'Policies & Handbooks', nameBn: 'নীতিমালা ও নির্দেশিকা' },
  ];

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/downloads?limit=50');
        if (!response.ok) {
          throw new Error('Failed to fetch downloads');
        }

        const data: DownloadsResponse = await response.json();
        const filesData = data.downloads && data.downloads.length > 0 ? data.downloads : DEFAULT_DOCUMENTS;
        setDownloads(filesData);
      } catch (err) {
        console.error('Error fetching downloads, fallback to default:', err);
        setDownloads(DEFAULT_DOCUMENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch = searchTerm.trim() === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || selectedCategory === '' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileExtension = (fileName: string) => {
    return fileName.split('.').pop()?.toUpperCase() || 'PDF';
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'xlsx' || ext === 'xls') return FileSpreadsheet;
    if (ext === 'zip' || ext === 'rar') return Archive;
    if (ext === 'jpg' || ext === 'png') return ImageIcon;
    return FileText;
  };

  const handleDownload = (download: Download) => {
    const link = document.createElement('a');
    link.href = download.file_url;
    link.download = download.title;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Institutional Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <FolderArchive className="w-3.5 h-3.5 text-blue-600" />
            {isBn ? 'প্রাতিষ্ঠানিক ডকুমেন্ট ও রিসোর্স সেন্টার' : 'Official Document & Resource Center'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {isBn ? 'ডাউনলোড ও প্রাতিষ্ঠানিক আর্কাইভ' : 'Downloads & Resource Archive'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {isBn
              ? 'ভর্তি ফরম, শ্রেণির সিলেবাস, পরীক্ষার সময়সূচি এবং শিক্ষার্থী নির্দেশিকা এক ক্লিকে ডাউনলোড করুন।'
              : 'Access verified institutional documents, printable admission applications, term syllabi, exam routines, and educational handbooks.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">{downloads.length}+</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'সংরক্ষিত ফাইল' : 'Verified Files'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">PDF</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'প্রিন্টযোগ্য ফরম্যাট' : 'Standard Format'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">2025–26</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'চলতি শিক্ষাবর্ষ' : 'Academic Session'}</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">Free</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{isBn ? 'সবার জন্য উন্মুক্ত' : 'Public Access'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter, Search and View Toggle Bar */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder={isBn ? 'ডকুমেন্টের নাম বা বিষয় অনুসন্ধান...' : 'Search documents by title...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Pills & View Mode */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end overflow-x-auto">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isBn ? cat.nameBn : cat.nameEn}
                  </button>
                ))}
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 flex-shrink-0">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Table View"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Card Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Document Presentation Section */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-medium">
            <span>
              {isBn ? 'মোট প্রাপ্ত ফাইল:' : 'Showing'} <strong className="text-slate-900">{filteredDownloads.length}</strong> {isBn ? 'টি' : 'available files'}
            </span>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="text-blue-600 hover:underline font-semibold"
              >
                {isBn ? 'সব ফিল্টার মুছুন' : 'Clear Filters'}
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {isBn ? 'ডকুমেন্ট লোড হচ্ছে...' : 'Loading document archive...'}
              </p>
            </div>
          ) : filteredDownloads.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
              <FolderArchive className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {isBn ? 'কোনো ডকুমেন্ট পাওয়া যায়নি' : 'No Files Found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                {isBn ? 'অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে অনুসন্ধান করুন।' : 'No published documents match your search query or selected filter.'}
              </p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-500 transition-colors"
              >
                {isBn ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* Table Layout */
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-4 px-6">{isBn ? 'ডকুমেন্টের শিরোনাম' : 'Document Title'}</th>
                      <th className="py-4 px-6 hidden sm:table-cell">{isBn ? 'বিভাগ' : 'Category'}</th>
                      <th className="py-4 px-6 hidden md:table-cell">{isBn ? 'ফরম্যাট' : 'Format'}</th>
                      <th className="py-4 px-6 text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filteredDownloads.map((doc) => {
                      const IconComp = getFileIcon(doc.file_url || doc.title);
                      const ext = getFileExtension(doc.file_url || doc.title);
                      const catObj = categories.find(c => c.id === doc.category) || categories[0];

                      return (
                        <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors block">
                                  {doc.title}
                                </span>
                                <span className="text-[11px] text-slate-400 sm:hidden">
                                  {isBn ? catObj.nameBn : catObj.nameEn} • {ext}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 hidden sm:table-cell">
                            <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                              {isBn ? catObj.nameBn : catObj.nameEn}
                            </span>
                          </td>
                          <td className="py-4 px-6 hidden md:table-cell">
                            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                              {ext}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDownload(doc)}
                              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-xs"
                            >
                              <ArrowDownToLine className="w-3.5 h-3.5" />
                              <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Card Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDownloads.map((doc) => {
                const IconComp = getFileIcon(doc.file_url || doc.title);
                const ext = getFileExtension(doc.file_url || doc.title);
                const catObj = categories.find(c => c.id === doc.category) || categories[0];

                return (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full">
                          {ext} File
                        </span>
                      </div>

                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60 inline-block mb-2.5">
                        {isBn ? catObj.nameBn : catObj.nameEn}
                      </span>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                        {doc.title}
                      </h3>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {isBn ? 'যাচাইকৃত কপি' : 'Verified Copy'}
                      </span>

                      <button
                        onClick={() => handleDownload(doc)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-colors shadow-xs"
                      >
                        <ArrowDownToLine className="w-3.5 h-3.5" />
                        {isBn ? 'ডাউনলোড' : 'Download'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom Support & Request Banner */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {isBn ? 'কাঙ্ক্ষিত ফাইলটি খুঁজে পাচ্ছেন না?' : 'Looking for a Document Not Listed Here?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {isBn
                ? 'পুরাতন ফলাফল, প্রশংসাপত্র বা বিশেষ প্রত্যয়নপত্রের জন্য সরাসরি প্রশাসনিক ডেস্কে যোগাযোগ করুন।'
                : 'For historical transcripts, transfer certificates, or specialized student attestations, reach out to our administrative registrar.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <HelpCircle className="w-4 h-4" />
                {isBn ? 'রেজিস্ট্রার অফিসে যোগাযোগ' : 'Contact Registrar Office'}
              </Link>
              <Link
                href="/student/verify-certificate"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                {isBn ? 'সার্টিফিকেট যাচাই করুন' : 'Verify Certificate'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
