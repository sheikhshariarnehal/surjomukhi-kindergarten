import { supabaseAdmin } from './db';
import { AuthUser, LoginCredentials, User } from '@/types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  static generateToken(user: AuthUser): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  // Verify JWT token
  static verifyToken(token: string): AuthUser | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  // Login user
  static async login(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string } | null> {
    try {
      // Find user by email
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', credentials.email)
        .single();

      if (error || !user) {
        console.error('User not found:', error);
        return null;
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(credentials.password, user.password_hash);
      if (!isValidPassword) {
        return null;
      }

      // Update last login
      await supabaseAdmin
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id);

      // Create auth user object
      const authUser: AuthUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      // Generate token
      const token = this.generateToken(authUser);

      return { user: authUser, token };
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  // Get user by ID
  static async getUserById(id: string): Promise<User | null> {
    try {
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // Create user
  static async createUser(userData: {
    name: string;
    email: string;
    password: string;
    role: 'superadmin' | 'admin' | 'editor';
  }): Promise<User | null> {
    try {
      // Hash password
      const hashedPassword = await this.hashPassword(userData.password);

      // Create user
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .insert({
          name: userData.name,
          email: userData.email,
          password_hash: hashedPassword,
          role: userData.role,
        })
        .select()
        .single();

      if (error) {
        console.error('Create user error:', error);
        return null;
      }

      return user;
    } catch (error) {
      console.error('Create user error:', error);
      return null;
    }
  }

  // Check if user has permission
  static hasPermission(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = {
      'superadmin': 3,
      'admin': 2,
      'editor': 1,
    };

    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

    return userLevel >= requiredLevel;
  }

  // Middleware to check authentication
  static async authenticateRequest(token: string): Promise<AuthUser | null> {
    if (!token) {
      return null;
    }

    // Remove 'Bearer ' prefix if present
    const cleanToken = token.replace('Bearer ', '');
    
    // Verify token
    const user = this.verifyToken(cleanToken);
    if (!user) {
      return null;
    }

    // Verify user still exists in database
    const dbUser = await this.getUserById(user.id);
    if (!dbUser) {
      return null;
    }

    return user;
  }
}
