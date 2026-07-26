# Church Site - Complete Setup & Implementation Guide

## Overview
This document outlines all the features implemented and how to set up and run the complete church website system.

## Features Implemented

### Backend (Django REST Framework)

#### 1. **User Authentication & Member Portal**
- Custom user registration and login
- Member profiles with roles (member, leader, pastor, admin)
- Dashboard showing personal statistics
- Profile management

#### 2. **Blog & News Management**
- Create, read, update, delete blog posts
- Categories: News, Biblical Insight, Announcement, Testimonial
- View tracking
- Search functionality
- Content scheduling (publish dates)

#### 3. **Testimonies/Stories**
- Members can share faith journeys
- Featured testimonies display
- Approval workflow for testimonies
- Image support

#### 4. **Discussion Forums**
- Forum categories for different topics
- Create discussion threads
- Reply to threads with likes
- Pin and close threads (moderator features)
- Thread tracking

#### 5. **Staff Directory**
- Staff/leadership profiles
- Organized by department
- Contact information
- Bio and photo
- Ordering by position

#### 6. **Notifications System**
- Email-based notifications
- Notification types: event reminders, prayer answered, forum reply, announcements
- Read/unread status tracking
- Related URL for quick navigation

#### 7. **Event Management**
- Enhanced event model with publishing and scheduling
- Event registration and attendance tracking
- Attendee management

#### 8. **Payment Integration (Framework Ready)**
- Payment model supporting multiple payment methods
- Mobile Money, Bank Transfer, Stripe, PayPal support
- Transaction tracking
- Status management (pending, completed, failed, refunded)

#### 9. **Analytics & Metrics**
- Page view tracking
- User engagement metrics
- Activity logging
- Dashboard statistics

#### 10. **Prayer Support Network**
- Prayer supporters tracking
- Support count per prayer request

#### 11. **Content Scheduling**
- All publishable content can be scheduled
- Auto-publish on specific dates
- Draft/published status

#### 12. **Multi-Language Support Infrastructure**
- Locale paths configured
- Language switcher component ready
- Support for: English, Luganda, Swahili, Spanish

### Frontend (React + TypeScript + Vite)

#### New Pages/Components:
1. **LoginForm** - Member authentication
2. **RegisterForm** - New account creation
3. **MemberDashboard** - Personal dashboard with stats
4. **BlogPage** - Blog posts with search and filtering
5. **TestimoniesPage** - Testimonies display
6. **StaffDirectory** - Staff profiles by department
7. **ForumsPage** - Discussion forums
8. **PaymentForm** - Giving/donation processing
9. **LanguageSwitcher** - Multi-language support
10. **AnalyticsDashboard** - Admin analytics view

#### Enhanced Features:
- Navigation updated with new menu items
- Authentication UI in header
- User profile dropdown
- Responsive design for all new pages

## Setup Instructions

### Backend Setup

1. **Install Python Dependencies**
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Create Database Migrations**
```bash
cd backend
python manage.py makemigrations api
python manage.py migrate
```

3. **Create Superuser (Admin Account)**
```bash
python manage.py createsuperuser
# Follow prompts to create admin account
```

4. **Seed Initial Data (Optional)**
```bash
python manage.py seed_data  # If you create this command
# Or use Django admin to add initial data manually
```

5. **Run Development Server**
```bash
python manage.py runserver
# Server runs on http://127.0.0.1:8000
```

### Frontend Setup

1. **Install Node Dependencies**
```bash
cd frontend
npm install
```

2. **Start Development Server**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

## Configuration

### Backend Configuration (backend/church_backend/settings.py)

1. **Email Configuration**
```python
EMAIL_HOST = 'smtp.gmail.com'  # Change to your email provider
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'  # Use app-specific password
DEFAULT_FROM_EMAIL = 'noreply@seattleinternationalchurch.org'
```

2. **Payment Integration**
- Stripe: Add API keys to settings
- PayPal: Configure sandbox/production keys
- Mobile Money: Configure MTN/Airtel merchant codes

3. **CORS Settings**
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://yourdomain.com"
]
```

## API Endpoints

### Authentication
- `POST /api/login/` - User login
- `POST /api/register/` - New user registration

### Core Resources
- `GET /api/sermons/` - List all sermons
- `GET /api/events/` - List all events
- `GET /api/prayers/` - Prayer requests
- `GET /api/donations/` - Donations
- `GET /api/projects/` - Projects

### New Features
- `GET /api/blog/` - Blog posts
- `GET /api/blog/search/?q=query` - Search blog
- `GET /api/testimonies/` - Testimonies
- `GET /api/testimonies/featured/` - Featured testimonies
- `GET /api/staff/` - Staff directory
- `GET /api/forum-categories/` - Forum categories
- `GET /api/forum-threads/` - Forum threads
- `GET /api/forum-posts/` - Forum posts
- `GET /api/notifications/` - User notifications
- `POST /api/payments/create_payment/` - Create payment
- `GET /api/analytics/dashboard/` - Analytics (admin only)

## Management Commands

### Send Event Reminders
```bash
python manage.py send_notifications
# Schedule this with cron (Linux) or Task Scheduler (Windows) daily
```

## Database Models

### New Models Added:
1. **MemberProfile** - Extended user profile
2. **BlogPost** - Blog articles
3. **Testimony** - Member testimonies
4. **ForumCategory** - Forum categories
5. **ForumThread** - Discussion threads
6. **ForumPost** - Thread replies
7. **StaffMember** - Staff profiles
8. **PageView** - Analytics tracking
9. **EngagementMetric** - User engagement tracking
10. **Payment** - Payment transactions
11. **Notification** - User notifications
12. **EventAttendance** - Event registration
13. **PrayerSupport** - Prayer request supporters

## Email/Notification Setup

1. **Gmail Setup**
   - Enable 2-factor authentication
   - Generate app-specific password
   - Use app password in settings

2. **Email Templates**
   - Event reminders (24 hours before)
   - Prayer answered notifications
   - Forum reply notifications
   - System announcements

## Security Considerations

1. **Environment Variables** (Create .env file)
```
SECRET_KEY=your-secret-key
DEBUG=False
EMAIL_PASSWORD=your-password
STRIPE_API_KEY=your-stripe-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

2. **CORS Configuration**
   - Restrict to specific domains in production
   - Use HTTPS only

3. **Authentication**
   - Implement JWT tokens for better security
   - Add password reset functionality
   - Implement rate limiting

## Deployment

### Backend (Heroku/PythonAnywhere)
1. Create Procfile
2. Set environment variables
3. Use PostgreSQL instead of SQLite
4. Run migrations on deployment
5. Collect static files

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy dist folder
3. Set API URL to production backend

## Testing

### API Testing
```bash
# Test authentication
curl -X POST http://127.0.0.1:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"user", "password":"pass"}'

# Test blog posts
curl http://127.0.0.1:8000/api/blog/
```

## Future Enhancements

1. **Advanced Features**
   - Video streaming (live service)
   - Prayer notification push-ups
   - Mobile app (React Native)
   - Calendar integration
   - Email digest/newsletter

2. **Analytics**
   - More detailed engagement reports
   - Donation trends
   - Member growth tracking
   - Content performance

3. **Admin Tools**
   - Bulk operations
   - Advanced content scheduling
   - Member communication tools
   - Import/export capabilities

## Support & Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS_ALLOWED_ORIGINS in settings.py
   - Ensure backend is running on port 8000

2. **Email Not Sending**
   - Check email credentials in settings
   - Enable "Less secure apps" if using Gmail
   - Check spam folder

3. **Database Errors**
   - Run `python manage.py migrate`
   - Check database connection
   - Verify model syntax in models.py

## Contact & Support
For issues or questions, refer to Django and React documentation or create issues in the project repository.
