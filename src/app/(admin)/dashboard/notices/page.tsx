'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notice } from '@/types/notice';
import { formatDate } from '@/lib/utils';

// Mock data for admin notices
const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'School Reopening After Winter Break',
    slug: 'school-reopening-winter-break',
    content: 'Dear students and parents, we are pleased to announce that school will reopen on January 8th, 2024 after the winter break. Please ensure all students are ready with their books and uniforms.',
    publish_date: '2024-01-02T10:00:00Z',
    created_at: '2024-01-02T10:00:00Z',
    updated_at: '2024-01-02T10:00:00Z',
    file_url: '/notices/school-reopening.pdf'
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting Schedule',
    slug: 'parent-teacher-meeting-schedule',
    content: 'Parent-teacher meetings for all grades will be held from January 15-17, 2024. Please check the detailed schedule on the school notice board.',
    publish_date: '2024-01-05T09:00:00Z',
    created_at: '2024-01-05T09:00:00Z',
    updated_at: '2024-01-05T09:00:00Z'
  },
  {
    id: '3',
    title: 'Annual Sports Day Registration',
    slug: 'annual-sports-day-registration',
    content: 'Registration for Annual Sports Day is now open. Students interested in participating should submit their names to their respective class teachers by January 20th, 2024.',
    publish_date: '2024-01-08T11:00:00Z',
    created_at: '2024-01-08T11:00:00Z',
    updated_at: '2024-01-08T11:00:00Z'
  }
];

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete'>('create');

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotices(mockNotices);
      setLoading(false);
    };

    fetchNotices();
  }, []);

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedNotice(null);
    setModalType('create');
    setShowModal(true);
  };

  const handleEdit = (notice: Notice) => {
    setSelectedNotice(notice);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (notice: Notice) => {
    setSelectedNotice(notice);
    setModalType('delete');
    setShowModal(true);
  };

  const handleSave = (noticeData: Partial<Notice>) => {
    if (modalType === 'create') {
      const newNotice: Notice = {
        id: Date.now().toString(),
        title: noticeData.title || '',
        slug: noticeData.slug || '',
        content: noticeData.content || '',
        publish_date: noticeData.publish_date || new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        file_url: noticeData.file_url
      };
      setNotices([newNotice, ...notices]);
    } else if (modalType === 'edit' && selectedNotice) {
      setNotices(notices.map(notice => 
        notice.id === selectedNotice.id 
          ? { ...notice, ...noticeData, updated_at: new Date().toISOString() }
          : notice
      ));
    }
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    if (selectedNotice) {
      setNotices(notices.filter(notice => notice.id !== selectedNotice.id));
    }
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notice Management</h1>
          <p className="text-gray-600">Manage school notices and announcements</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Notice
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Notices List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{notice.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{notice.content}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(new Date(notice.publish_date), { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(notice)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notice)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4"
            >
              {modalType === 'delete' ? (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Notice</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete "{selectedNotice?.title}"? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {modalType === 'create' ? 'Create Notice' : 'Edit Notice'}
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleSave({
                      title: formData.get('title') as string,
                      slug: formData.get('slug') as string,
                      content: formData.get('content') as string,
                      publish_date: formData.get('publish_date') as string,
                      file_url: formData.get('file_url') as string
                    });
                  }}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          defaultValue={selectedNotice?.title || ''}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Slug
                        </label>
                        <input
                          type="text"
                          name="slug"
                          defaultValue={selectedNotice?.slug || ''}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content
                        </label>
                        <textarea
                          name="content"
                          rows={4}
                          defaultValue={selectedNotice?.content || ''}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Publish Date
                        </label>
                        <input
                          type="datetime-local"
                          name="publish_date"
                          defaultValue={selectedNotice?.publish_date ? new Date(selectedNotice.publish_date).toISOString().slice(0, 16) : ''}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          File URL (Optional)
                        </label>
                        <input
                          type="url"
                          name="file_url"
                          defaultValue={selectedNotice?.file_url || ''}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        {modalType === 'create' ? 'Create' : 'Update'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}