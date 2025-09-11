'use client';

import React, { useEffect, useState } from 'react';
import DashboardCard from '@/components/admin/DashboardCard';
import { Card } from '@/components/ui/Card';
import {
  FileText,
  Newspaper,
  Calendar,
  GraduationCap,
  Users,
  Images,
  Download,
  TrendingUp,
  Activity,
} from 'lucide-react';

interface DashboardStats {
  notices: number;
  news: number;
  events: number;
  teachers: number;
  students: number;
  gallery: number;
  downloads: number;
}

interface RecentActivity {
  id: string;
  type: 'notice' | 'news' | 'event' | 'teacher' | 'student';
  title: string;
  action: string;
  timestamp: string;
  user: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    notices: 0,
    news: 0,
    events: 0,
    teachers: 0,
    students: 0,
    gallery: 0,
    downloads: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In a real app, these would be separate API calls
      const [
        noticesRes,
        newsRes,
        eventsRes,
        teachersRes,
        studentsRes,
        galleryRes,
        downloadsRes,
        activityRes,
      ] = await Promise.all([
        fetch('/api/notices/count'),
        fetch('/api/news/count'),
        fetch('/api/events/count'),
        fetch('/api/teachers/count'),
        fetch('/api/students/count'),
        fetch('/api/gallery/count'),
        fetch('/api/downloads/count'),
        fetch('/api/activity/recent'),
      ]);

      // For now, we'll use mock data since the APIs aren't implemented yet
      setStats({
        notices: 25,
        news: 18,
        events: 12,
        teachers: 45,
        students: 850,
        gallery: 120,
        downloads: 35,
      });

      setRecentActivity([
        {
          id: '1',
          type: 'notice',
          title: 'Annual Sports Day Notice',
          action: 'published',
          timestamp: '2 minutes ago',
          user: 'John Admin',
        },
        {
          id: '2',
          type: 'teacher',
          title: 'Sarah Johnson',
          action: 'profile updated',
          timestamp: '1 hour ago',
          user: 'Sarah Johnson',
        },
        {
          id: '3',
          type: 'student',
          title: 'New student registration',
          action: 'registered',
          timestamp: '3 hours ago',
          user: 'Admin User',
        },
        {
          id: '4',
          type: 'news',
          title: 'Science Fair Results',
          action: 'published',
          timestamp: '5 hours ago',
          user: 'Jane Editor',
        },
        {
          id: '5',
          type: 'event',
          title: 'Parent-Teacher Meeting',
          action: 'scheduled',
          timestamp: '1 day ago',
          user: 'Admin User',
        },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'notice':
        return <FileText className="h-4 w-4" />;
      case 'news':
        return <Newspaper className="h-4 w-4" />;
      case 'event':
        return <Calendar className="h-4 w-4" />;
      case 'teacher':
        return <GraduationCap className="h-4 w-4" />;
      case 'student':
        return <Users className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening at your school.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Notices"
          value={stats.notices}
          icon={<FileText className="h-6 w-6" />}
          color="blue"
          trend={{ value: 12, isPositive: true, label: 'this month' }}
        />
        <DashboardCard
          title="News Articles"
          value={stats.news}
          icon={<Newspaper className="h-6 w-6" />}
          color="green"
          trend={{ value: 8, isPositive: true, label: 'this month' }}
        />
        <DashboardCard
          title="Upcoming Events"
          value={stats.events}
          icon={<Calendar className="h-6 w-6" />}
          color="purple"
          trend={{ value: 3, isPositive: true, label: 'this month' }}
        />
        <DashboardCard
          title="Teachers"
          value={stats.teachers}
          icon={<GraduationCap className="h-6 w-6" />}
          color="indigo"
          trend={{ value: 2, isPositive: true, label: 'new this year' }}
        />
        <DashboardCard
          title="Students"
          value={stats.students}
          icon={<Users className="h-6 w-6" />}
          color="yellow"
          trend={{ value: 15, isPositive: true, label: 'this year' }}
        />
        <DashboardCard
          title="Gallery Images"
          value={stats.gallery}
          icon={<Images className="h-6 w-6" />}
          color="red"
          trend={{ value: 25, isPositive: true, label: 'this month' }}
        />
        <DashboardCard
          title="Downloads"
          value={stats.downloads}
          icon={<Download className="h-6 w-6" />}
          color="green"
          trend={{ value: 5, isPositive: true, label: 'this month' }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.title}</span>{' '}
                    was {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">
                    by {activity.user} • {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <FileText className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">New Notice</p>
              <p className="text-sm text-gray-500">Create a new notice</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Newspaper className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium text-gray-900">Add News</p>
              <p className="text-sm text-gray-500">Publish news article</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Calendar className="h-6 w-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Schedule Event</p>
              <p className="text-sm text-gray-500">Create new event</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <GraduationCap className="h-6 w-6 text-indigo-600 mb-2" />
              <p className="font-medium text-gray-900">Add Teacher</p>
              <p className="text-sm text-gray-500">Register new teacher</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
