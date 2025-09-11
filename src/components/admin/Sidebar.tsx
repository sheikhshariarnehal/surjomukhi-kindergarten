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
        'bg-white border-r border-gray-200 transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-500">School CMS</p>
            </div>
          )}
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              {!collapsed && (
                <span className="ml-3">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!collapsed && (
          <div className="text-xs text-gray-500">
            <p>School CMS v1.0</p>
            <p>© 2024 All rights reserved</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
