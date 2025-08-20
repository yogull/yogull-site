# Yogull - Social Media Community Platform

## Overview
Yogull is a comprehensive business and social platform designed to connect users through community discussions, personal blogging, daily news, a business directory, and personal affiliate shops. It aims to generate revenue through local business advertising and personal shops, providing a platform for both social interaction and business growth. The project has a vision for global reach, with features supporting international users and diverse content.

## User Preferences
Preferred communication style: Simple, everyday language.
Domain: gohealme.org (connected and live)
Monetization: Affiliate links for supplement sales
Pending integrations: SendGrid (email), Stripe (payments)
Chat system priorities: History dropdown, first-name search capability

## System Architecture

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Charts**: Chart.js
- **UI/UX Decisions**: Responsive design for desktop and mobile; clean, professional interface with purple branding and gradient elements; consistent layout for dashboards, profiles, and community sections. Emphasis on clear navigation and user-friendly interaction. Specific design elements include purple "OO" eyes Yogull logo.

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Firebase Auth
- **Email Service**: SendGrid

### Core Features
- **Authentication**: Firebase handles user registration and login, synchronized with PostgreSQL.
- **Data Models**: Users, Supplements, Supplement Logs, Biometrics, Shop Products, Orders.
- **Social Features**: Community discussions, personal blogging, profile walls with post creation (text, photo, video), social sharing to 26+ platforms, and direct messaging.
- **Business Features**: Business directory with advertising systems, personal affiliate shops, and payment integration (Stripe).
- **Health Features**: Dashboard for health metrics, supplement management, biometric logging, and illness guides.
- **AI Integration**: AI chat assistant for health-focused and general inquiries.
- **Admin Control Panel**: Comprehensive management tools for users, content, and revenue systems.
- **Internationalization**: Multi-language support and global business database.
- **Content Moderation**: Platform-wide content filtering for user-generated content.
- **Data Persistence**: All user-generated content and data are permanently stored in PostgreSQL.

## External Dependencies

- **Firebase**: User authentication and management.
- **SendGrid**: Email delivery for notifications, welcome emails, and campaign management.
- **PostgreSQL**: Primary database for all application data.
- **Neon Database**: PostgreSQL serverless driver for database connectivity.
- **Stripe**: Payment processing for donations, shop purchases, and business advertising.
- **Chart.js**: Data visualization in dashboards.
- **Radix UI**: Headless UI component primitives.
- **Lucide React**: Icon library.
- **Twitter/X API**: For Twitter authentication and social sharing.
- **Facebook API**: For Facebook authentication and social sharing.
- **OpenAI API**: For AI chat assistant functionality.