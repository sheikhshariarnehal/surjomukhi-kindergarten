# Surjomukhi Kindergarten Website

A comprehensive school website built with Next.js 15, featuring a content management system (CMS) for managing school information, news, events, teachers, and more. The website includes both a public frontend and an admin dashboard.

## Features

- 🏫 **School Information Management**: About, academic programs, admission details
- 📰 **News & Events**: Dynamic content management with image uploads
- 👨‍🏫 **Teacher Profiles**: Staff directory with photos and bio information
- 📋 **Notices & Downloads**: Important announcements and file sharing
- 🖼️ **Gallery**: Photo galleries for school events and activities
- 📊 **Admin Dashboard**: Complete CMS for content management
- 🔐 **Authentication**: Secure admin login system
- 📱 **Responsive Design**: Mobile-friendly interface
- 🚀 **Performance Optimized**: Built with Next.js 15 and modern web standards

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT with bcrypt
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide React icons
- **File Upload**: Supabase Storage
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd surjomukhi-kindergarten-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your actual values (see Environment Variables section below).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Surjomukhi Kindergarten
NEXT_PUBLIC_SITE_DESCRIPTION=A comprehensive school website with CMS functionality

# Admin Configuration
ADMIN_EMAIL=admin@school.edu
ADMIN_PASSWORD=your-secure-password-here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
```

### Getting Supabase Credentials

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API
3. Copy the Project URL and anon public key
4. Copy the service_role secret key (keep this secure!)

## Database Setup

The application will automatically create the necessary database tables and storage buckets when you first run it. You can also manually set up the database by:

1. **Initialize the database**
   Visit `/api/setup` in your browser after starting the development server to create the initial admin user and sample data.

2. **Set up storage buckets**
   Visit `/api/setup-storage` to create the necessary storage buckets for file uploads.

## Deployment on Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/surjomukhi-kindergarten-website)

### Manual Deployment

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables**
   In your Vercel project dashboard:
   - Go to Settings > Environment Variables
   - Add all the environment variables from your `.env.local` file
   - **Important**: Update `NEXT_PUBLIC_APP_URL` to your Vercel deployment URL
   - Generate a secure `JWT_SECRET` for production

4. **Deploy**
   - Click "Deploy"
   - Your site will be available at `https://your-project-name.vercel.app`

### Post-Deployment Setup

After your first deployment:

1. **Initialize the database**
   Visit `https://your-app.vercel.app/api/setup` to create the admin user and sample data

2. **Set up storage**
   Visit `https://your-app.vercel.app/api/setup-storage` to create storage buckets

3. **Access admin panel**
   Go to `https://your-app.vercel.app/dashboard` and login with your admin credentials

## Project Structure

```
src/
├── app/
│   ├── (admin)/          # Admin dashboard pages
│   ├── (frontend)/       # Public website pages
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── locales/             # Internationalization files
├── types/               # TypeScript type definitions
└── utils/               # Helper utilities
```

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/admin/*` - Admin-specific endpoints
- `/api/teachers` - Teacher management
- `/api/news` - News management
- `/api/events` - Event management
- `/api/notices` - Notice management
- `/api/gallery` - Gallery management
- `/api/upload` - File upload handling
- `/api/settings` - Site settings

## Admin Features

- **Dashboard**: Overview of site statistics
- **Content Management**: Create, edit, delete news, events, notices
- **Teacher Management**: Add/edit teacher profiles
- **Gallery Management**: Upload and organize photos
- **Settings**: Configure site information
- **File Upload**: Image and document management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email admin@school.edu or create an issue in the GitHub repository.
