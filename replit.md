# Project Xpress - College Projects Platform

## Overview

Project Xpress is a modern, full-stack web platform designed for selling ready-made and custom college projects. The application features a futuristic neon-themed design with smooth animations and serves as a marketplace connecting students with high-quality academic projects across multiple technology domains.

The platform emphasizes a premium user experience with hypnotic visual effects, comprehensive project showcases, and seamless order management. It caters to college students seeking professional-grade projects for academic purposes with both online and offline delivery options.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 2025)

- **Vercel Deployment Ready**: Configured project for direct Vercel hosting with serverless API functions and static build output
- **Homepage Content Update**: Changed hero text to "High-Impact Projects & Websites, Delivered to Perfection" with updated subtitle mentioning 10+ technology domains
- **Founder Profile Update**: Updated Aadarsh Jaiswal description to "3× Hackathon winner, cybersecurity, AI/ML, and full-stack specialist, turning bold ideas into innovations"
- **Enhanced 3D Animations**: Added extensive 3D animations to left side of homepage including floating geometric shapes, gradient circles with complex motion patterns, and triangular/rectangular elements with rotation
- **Image Fixes**: Updated Hospital Management System and Personal Carbon Footprint Tracker project images with better themed visuals
- **Deployment Configuration**: Created vercel.json, serverless API functions, and complete deployment guide with environment variable requirements
- **Project Migration**: Successfully migrated project from Replit Agent to Replit environment with full dependency installation
- **DBMS Project Expansion**: Added 15 new DBMS projects including Property Management, EB Bill Management, Stadium Management, Insurance Management, E-Commerce Management, Waste Management, Café Management, Job Management, Event Management, Movie Management, HRMS, IPL Management, University Management, Online Exam System, and Music Streaming System
- **Category Reorganization**: Replaced Python category with Mobile Apps category and repositioned it after Ecommerce Websites
- **Enhanced Project Catalog**: Each new DBMS project includes appropriate related images, detailed feature lists, and complete inclusions
- **About Page Redesign**: Completely redesigned About page to focus only on "Visionaries" section, removed "About Project Xpress" and feature cards
- **Founder Profiles Update**: Updated founder information with authentic photos and complete social media links (LinkedIn, Instagram, GitHub, X)
- **Advanced 3D Animations**: Added sophisticated 3D hover effects with tilt, scale, glow shadows, and 360° rotation animations
- **Parallax Background**: Implemented depth-parallax background effects that respond to scroll for dynamic visual experience
- **Mobile-Optimized Modal**: Fixed project modal close button positioning for better mobile accessibility, avoiding status bar overlap
- **Enhanced Category Icons**: Made project category icons colorful with gradient backgrounds matching reference design
- **Streamlined Projects Page**: Removed "Explore Other Categories" section from category pages for cleaner focus on selected projects
- **Responsive Design**: Enhanced 3D effects work seamlessly across desktop and mobile with appropriate touch interactions
- **Performance Optimization**: Implemented smooth transitions (0.3-0.5s) for all animations with hardware acceleration

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: TailwindCSS with custom neon theme variables and glass-morphism effects
- **Animations**: Framer Motion for complex animations, transitions, and interactive elements
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **UI Components**: Radix UI components with custom styling via shadcn/ui
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture  
- **Runtime**: Node.js with Express.js for the REST API server
- **Language**: TypeScript throughout the application for consistency
- **API Pattern**: RESTful endpoints with standardized request/response handling
- **Email Service**: Nodemailer with Gmail integration for order notifications
- **Data Storage**: In-memory storage with interface-based design for easy database migration
- **Session Management**: Express session handling with PostgreSQL session store configuration

### Database Schema
The application uses Drizzle ORM with PostgreSQL dialect, featuring:
- **Users Table**: Basic user authentication with username/password
- **Orders Table**: Customer order management with project details, contact information, and timestamps
- **Schema Validation**: Zod schemas for runtime validation and type generation
- **Migration Support**: Drizzle Kit for database migrations and schema management

### Design System
- **Theme**: Custom neon color palette (cyan, purple, pink, green, electric blue)
- **Typography**: Inter for body text, Poppins for headings
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Glass Effects**: Backdrop blur and transparency for modern visual appeal
- **Particle System**: Floating animated particles for ambient background effects

### Order Management Flow
1. Customer fills order form with name, email, college, project requirements, and WhatsApp number
2. Form validation using Zod schemas with email validation
3. Order stored in database with unique ID generation
4. Dual email notifications:
   - Business notification sent to projectxpress27@gmail.com with order details
   - Confirmation email sent to student's email with order summary and next steps
5. Confirmation message displayed to customer
6. WhatsApp integration for follow-up communication

### Performance Optimizations
- **Code Splitting**: Vite-based bundling with automatic code splitting
- **Image Optimization**: Lazy loading and responsive image handling
- **Caching Strategy**: React Query for API response caching
- **Bundle Analysis**: Development tools for build optimization
- **TypeScript Compilation**: Incremental builds with tsBuildInfoFile

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL database connection via Neon
- **drizzle-orm & drizzle-kit**: Database ORM and migration toolkit
- **nodemailer**: Email sending service with Gmail SMTP integration
- **@tanstack/react-query**: Server state management and caching

### UI/UX Libraries  
- **framer-motion**: Advanced animations and transitions
- **@radix-ui/***: Accessible UI primitives (dialogs, dropdowns, forms, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Modern icon library

### Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **wouter**: Minimalist React router

### Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer for validation libraries
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Automatic Zod schema generation from Drizzle schemas

The application uses environment variables for sensitive configuration like database URLs and email credentials, with fallback values for development environments.