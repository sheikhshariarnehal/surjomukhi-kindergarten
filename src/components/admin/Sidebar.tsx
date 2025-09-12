'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Calendar,
  Users,
  GraduationCap,
  Images,
  Download,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  userRole?: 'superadmin' | 'admin' | 'editor';
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  requiredRole?: 'superadmin' | 'admin' | 'editor';
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Notices',
    href: '/dashboard/notices',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: 'News',
    href: '/dashboard/news',
    icon: <Newspaper className="h-5 w-5" />,
  },
  {
    label: 'Events',
    href: '/dashboard/events',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    label: 'Teachers',
    href: '/dashboard/teachers',
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    label: 'Students',
    href: '/dashboard/students',
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: 'Gallery',
    href: '/dashboard/gallery',
    icon: <Images className="h-5 w-5" />,
  },
  {
    label: 'Downloads',
    href: '/dashboard/downloads',
    icon: <Download className="h-5 w-5" />,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: <UserCog className="h-5 w-5" />,
    requiredRole: 'superadmin',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5" />,
    requiredRole: 'admin',
  },
];

export function Sidebar({ collapsed = false, onToggle, userRole = 'admin' }: SidebarProps) {
  const pathname = usePathname();

  const hasPermission = (requiredRole?: string) => {
    if (!requiredRole) return true;
    
    const roleHierarchy = {
      'superadmin': 3,
      'admin': 2,
      'editor': 1,
    };

    const userLevel = roleHierarchy[userRole] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

    return userLevel >= requiredLevel;
  };

  const filteredMenuItems = menuItems.filter(item => hasPermission(item.requiredRole));

  return (
    <div
      className={cn(
        'bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col h-full shadow-xl',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-white">School CMS</h2>
              <p className="text-sm text-slate-300">Admin Dashboard</p>
            </div>
          )}
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-105'
              )}
            >
              <div className={cn(
                'flex-shrink-0 transition-colors',
                isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
              )}>
                {item.icon}
              </div>
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
              {isActive && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {!collapsed && (
          <div className="text-xs text-slate-400">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <p className="text-slate-500">School CMS v1.0</p>
            <p className="text-slate-500">© 2024 All rights reserved</p>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
