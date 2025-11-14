'use client';

import React, { useState } from 'react';
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
  ClipboardList,
  School,
  Layers,
  Shield,
  Database,
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
  badge?: string;
  section?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />,
        section: 'overview',
      },
    ],
  },
  {
    title: 'Content Management',
    items: [
      {
        label: 'Notices',
        href: '/dashboard/notices',
        icon: <FileText className="h-5 w-5" />,
        section: 'content',
      },
      {
        label: 'News',
        href: '/dashboard/news',
        icon: <Newspaper className="h-5 w-5" />,
        section: 'content',
      },
      {
        label: 'Events',
        href: '/dashboard/events',
        icon: <Calendar className="h-5 w-5" />,
        section: 'content',
      },
    ],
  },
  {
    title: 'Academic',
    items: [
      {
        label: 'Teachers',
        href: '/dashboard/teachers',
        icon: <GraduationCap className="h-5 w-5" />,
        section: 'academic',
      },
      {
        label: 'Students',
        href: '/dashboard/students',
        icon: <Users className="h-5 w-5" />,
        section: 'academic',
      },
      {
        label: 'Admissions',
        href: '/dashboard/admissions',
        icon: <ClipboardList className="h-5 w-5" />,
        badge: 'New',
        section: 'academic',
      },
    ],
  },
  {
    title: 'Media & Resources',
    items: [
      {
        label: 'Gallery',
        href: '/dashboard/gallery',
        icon: <Images className="h-5 w-5" />,
        section: 'media',
      },
      {
        label: 'Downloads',
        href: '/dashboard/downloads',
        icon: <Download className="h-5 w-5" />,
        section: 'media',
      },
    ],
  },
  {
    title: 'Administration',
    items: [
      {
        label: 'Users',
        href: '/dashboard/users',
        icon: <UserCog className="h-5 w-5" />,
        requiredRole: 'superadmin',
        section: 'admin',
      },
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: <Settings className="h-5 w-5" />,
        requiredRole: 'admin',
        section: 'admin',
      },
    ],
  },
];


export function Sidebar({ collapsed = false, onToggle, userRole = 'admin' }: SidebarProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'admin':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'editor':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superadmin':
        return <Shield className="h-3 w-3" />;
      case 'admin':
        return <Database className="h-3 w-3" />;
      case 'editor':
        return <Layers className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const filteredSections = menuSections.map(section => ({
    ...section,
    items: section.items.filter(item => hasPermission(item.requiredRole))
  })).filter(section => section.items.length > 0);

  return (
    <div
      className={cn(
        'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 transition-all duration-300 flex flex-col h-full shadow-2xl relative',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Header with Logo */}
      <div className="relative p-5 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <School className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-wide">Surjomukhi</h2>
                <p className="text-xs text-slate-400 font-medium">Admin Portal</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center w-full">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <School className="h-5 w-5 text-white" />
              </div>
            </div>
          )}
        </div>
        
        {/* Toggle Button */}
        {onToggle && (
          <button
            onClick={onToggle}
            className={cn(
              'absolute -right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-800 border-2 border-slate-700 hover:border-blue-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/20',
              'text-slate-400 hover:text-blue-400 hover:scale-110'
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>

      {/* Navigation with Sections */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {filteredSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="relative">
            {!collapsed && (
              <h3 className="px-3 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            {collapsed && sectionIndex > 0 && (
              <div className="my-3 mx-auto w-8 h-px bg-slate-700" />
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/dashboard');
                const isHovered = hoveredItem === item.href;

                return (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        'relative flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                        'hover:translate-x-1',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -ml-3" />
                      )}
                      
                      {/* Icon */}
                      <div className={cn(
                        'flex-shrink-0 transition-all duration-200',
                        isActive ? 'text-white scale-110' : 'text-slate-400 group-hover:text-white group-hover:scale-110'
                      )}>
                        {item.icon}
                      </div>
                      
                      {/* Label and Badge */}
                      {!collapsed && (
                        <>
                          <span className="ml-3 font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {collapsed && isHovered && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg shadow-xl border border-slate-700 whitespace-nowrap z-50 pointer-events-none">
                        {item.label}
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer with Status */}
      <div className="relative p-4 border-t border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        {!collapsed ? (
          <div className="text-center space-y-1">
            <p className="text-xs font-semibold text-slate-400">School CMS v2.0</p>
            <p className="text-xs text-slate-500">© 2024 Surjomukhi Kindergarten</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-slate-600 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
