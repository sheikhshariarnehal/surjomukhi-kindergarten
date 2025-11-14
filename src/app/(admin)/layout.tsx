'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { useAuth } from '@/lib/auth-middleware';
import { cn } from '@/lib/utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication on mount and route changes
    if (!isAuthenticated && pathname !== '/dashboard/login') {
      router.push('/dashboard/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, pathname, router]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    logout();
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render layout for login page
  if (pathname === '/dashboard/login') {
    return <>{children}</>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <div className={cn(
        "hidden lg:flex lg:flex-shrink-0 transition-all duration-300 fixed lg:sticky top-0 h-screen z-40",
        sidebarCollapsed ? "lg:w-20" : "lg:w-72"
      )}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          userRole={user?.role}
        />
      </div>

      {/* Sidebar - Mobile */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ease-in-out shadow-2xl",
        sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>
        <div className="w-72 h-full sidebar-mobile">
          <Sidebar
            collapsed={false}
            onToggle={handleSidebarToggle}
            userRole={user?.role}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        !sidebarCollapsed && "lg:ml-0"
      )}>
        {/* Topbar */}
        <div className="sticky top-0 z-30">
          <Topbar
            user={user}
            onMenuToggle={handleSidebarToggle}
            onLogout={handleLogout}
          />
        </div>

        {/* Page content */}
        <main className="flex-1 p-3 lg:p-4 overflow-auto bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarCollapsed(true)}
          aria-label="Close sidebar"
        />
      )}

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          },
          success: {
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
          loading: {
            style: {
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            },
          },
        }}
      />
    </div>
  );
}
