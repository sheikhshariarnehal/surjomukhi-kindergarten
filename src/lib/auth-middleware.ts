import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './auth';

export interface AuthMiddlewareOptions {
  requiredRole?: 'superadmin' | 'admin' | 'editor';
  redirectTo?: string;
}

export async function authMiddleware(
  request: NextRequest,
  options: AuthMiddlewareOptions = {}
) {
  const { requiredRole, redirectTo = '/dashboard/login' } = options;
  
  // Get token from cookie or Authorization header
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  try {
    // Verify token and get user
    const user = await AuthService.authenticateRequest(token);
    
    if (!user) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    // Check role permissions if required
    if (requiredRole && !AuthService.hasPermission(user.role, requiredRole)) {
      return NextResponse.redirect(new URL('/dashboard/unauthorized', request.url));
    }

    // Add user info to request headers for use in components
    const response = NextResponse.next();
    response.headers.set('x-user-id', user.id);
    response.headers.set('x-user-role', user.role);
    response.headers.set('x-user-name', user.name);
    response.headers.set('x-user-email', user.email);

    return response;
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
}

// Helper function to get user from request headers (for server components)
export function getUserFromHeaders(headers: Headers) {
  const userId = headers.get('x-user-id');
  const userRole = headers.get('x-user-role');
  const userName = headers.get('x-user-name');
  const userEmail = headers.get('x-user-email');

  if (!userId || !userRole || !userName || !userEmail) {
    return null;
  }

  return {
    id: userId,
    role: userRole as 'superadmin' | 'admin' | 'editor',
    name: userName,
    email: userEmail,
  };
}

// Client-side auth hook
export function useAuth() {
  // This would typically use React context or a state management library
  // For now, we'll use localStorage (in a real app, consider using a more secure approach)
  
  const getUser = () => {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem('auth-token');
    if (!token) return null;

    try {
      // In a real app, you'd decode the JWT or make an API call
      const userData = localStorage.getItem('auth-user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { user, token } = await response.json();

    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-user', JSON.stringify(user));

    return user;
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }

    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    window.location.href = '/dashboard/login';
  };

  return {
    user: getUser(),
    login,
    logout,
    isAuthenticated: !!getUser(),
  };
}
