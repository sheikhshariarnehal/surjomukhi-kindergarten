'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Settings, User, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AdminUser {
  email: string;
  role: string;
  password?: string;
}

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  const handleSetup = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSetupComplete(true);
        setAdminUsers(data.users || []);
        toast.success('Admin users created successfully!');
      } else {
        toast.error(data.error || 'Setup failed');
      }
    } catch (error) {
      console.error('Setup error:', error);
      toast.error('An error occurred during setup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Setup
          </h1>
          <p className="text-gray-600">
            Initialize the admin users for the school CMS
          </p>
        </div>

        <Card className="p-8">
          {!setupComplete ? (
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <User className="h-6 w-6 text-blue-600" />
                  <span className="text-lg font-medium text-gray-900">
                    Create Default Admin Users
                  </span>
                </div>
                <p className="text-gray-600">
                  This will create the default admin users with the following roles:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm"><strong>SuperAdmin:</strong> Full system access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm"><strong>Admin:</strong> Content and user management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm"><strong>Editor:</strong> Content creation and editing</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSetup}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Setting up...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Initialize Admin Users
                  </div>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Setup Complete!
                </h2>
                <p className="text-gray-600">
                  Admin users have been created successfully.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Login Credentials:
                </h3>
                {adminUsers.map((user, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Email: <code className="bg-white px-2 py-1 rounded">{user.email}</code>
                        </div>
                        <div className="text-sm text-gray-600">
                          Password: <code className="bg-white px-2 py-1 rounded">{user.password}</code>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'superadmin' ? 'bg-red-100 text-red-800' :
                        user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">
                      Important Security Note
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Please change these default passwords after your first login for security.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={() => window.location.href = '/dashboard/login'}
                  className="flex-1"
                >
                  Go to Login
                </Button>
                <Button
                  onClick={() => window.location.href = '/dashboard'}
                  variant="outline"
                  className="flex-1"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Surjomukhi Kindergarten CMS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
