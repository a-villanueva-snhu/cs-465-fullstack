# Travlr Getaways - Fullstack Web Application

A comprehensive MEAN stack web application for managing travel experiences, accommodations, and dining options. Built for SNHU CS-465 as a fullstack web development project.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Development](#development)
- [Production Build](#production-build)

## Project Overview

Travlr Getaways is a fullstack web application that provides:

- **Public-facing website** - Server-rendered pages for travel information, rooms, meals, and news
- **Admin dashboard** - Angular SPA for managing trips, accommodations (planned), and dining experiences (planned)
- **RESTful API** - Backend API for CRUD operations with JWT authentication
- **Database** - MongoDB for persistent data storage

### Key Features

- User authentication with JWT tokens
- Trip management (Create, Read, Update, Delete)
- Trip editing interface with real-time updates
- Responsive design for mobile and desktop
- Server-side rendering for public pages
- Client-side rendering for admin dashboard

## Technology Stack

### Frontend
- **Angular 17** - Modern SPA framework (TypeScript)
- **Bootstrap/CSS** - Responsive styling
- **Handlebars** - Server-side template rendering for public pages

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication and authorization
- **Passport.js** - Authentication middleware

### Development Tools
- **npm** - Package management
- **Angular CLI** - Angular development tooling
- **Git** - Version control

## Project Structure

```
cs-465-fullstack/
├── travlr/
│   ├── app.js                 # Express app entry point
│   ├── package.json           # Dependencies
│   ├── bin/
│   │   └── www               # Server startup script
│   ├── app_admin/            # Angular SPA for admin
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/     # Angular components
│   │   │   │   ├── services/       # HTTP services
│   │   │   │   └── models/         # Data models
│   │   │   └── main.ts
│   │   └── angular.json      # Angular configuration
│   ├── app_api/              # Express API routes
│   │   ├── routes/
│   │   ├── controllers/      # API controllers
│   │   ├── models/           # Mongoose schemas
│   │   └── config/           # Authentication config
│   ├── app_server/           # Express server-side routes
│   │   ├── routes/           # Server routes
│   │   ├── controllers/      # Page controllers
│   │   └── views/            # Handlebars templates
│   ├── public/               # Static files & fallback pages
│   │   ├── css/
│   │   ├── images/
│   │   └── *.html            # Fallback static pages
│   └── data/                 # Database seed data
└── postman/                  # API testing collection
```

## Architecture

### High-Level Flow

```
Client Browser
      ↓
   Express.js
   /        \  
API Routes   Server Routes
     ↓            ↓
MongoDB      Handlebars
             Templates
```

### Request Flow

1. **Public Pages** - Server-rendered with Handlebars
   - `/` → index.hbs
   - `/travel` → travel.hbs
   - `/rooms` → rooms.hbs
   - `/meals` → meals.hbs

2. **Admin Dashboard** - Angular SPA at `/admin` 
                            (currently at localhost:4200, single server access optional planned)
   - Communicates with API endpoints
   - JWT authentication for protected routes

3. **API** - RESTful endpoints at `/api`
   - `/api/trips` - Trip management
   - Authentication required for write operations

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local or Atlas connection) - [Download](https://www.mongodb.com/)
- **Angular CLI** (optional, for development) - `npm install -g @angular/cli`

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cs-465-fullstack/travlr
```

### 2. Install Dependencies

```bash
# Install main application dependencies
npm install

# Install Angular admin dependencies
cd app_admin
npm install
cd ..
```

### 3. Configure Environment Variables

Create a `.env` file in the `travlr` directory:

```env
MONGODB_URI=mongodb://localhost:27017/travlr
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=3000
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travlr
```

### 4. Database Setup

```bash
# Seed the database with initial data
node app_api/models/seed.js
```

## Running the Application

### Development Mode (Recommended)

```bash
# Start Express server (port 3000)
npm start

# In a separate terminal, start Angular dev server
cd app_admin
ng serve
# Navigate to http://localhost:4200 for admin dashboard
```

### Access the Application

- **Public Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:4200
- **API**: http://localhost:3000/api

## API Documentation

### Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

### Trip Endpoints

- `GET /api/trips` - Get all trips
- `GET /api/trips/:code` - Get trip by code
- `POST /api/trips` - Create new trip (protected)
- `PUT /api/trips/:code` - Update trip (protected)
- `DELETE /api/trips/:code` - Delete trip (protected)

### User Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

See `postman/` folder for complete API collection.

## Features

### Public Features

- ✅ Browse travel destinations
- ✅ View room accommodations
- ✅ Explore meal options
- ✅ Read travel news and articles
- ✅ Contact information
- ✅ Responsive design

### Admin Features

- ✅ View all trips
- ✅ Add new trips with details
- ✅ Edit existing trips
- ✅ Delete trips
- ✅ Real-time form validation
- ✅ Secure authentication
- ✅ Protected API endpoints

## Development

### Adding New Features

1. **Backend API Endpoint**
   - Add route in `app_api/routes/index.js`
   - Create controller in `app_api/controllers/`
   - Test with Postman

2. **Angular Component**
   - Generate component: `ng generate component component-name`
   - Add to routing in `app/app.routes.ts`
   - Create service in `app/services/`

3. **Database Schema**
   - Update model in `app_api/models/`
   - Run migrations if needed

### Code Style

- **Backend**: ES6+ with async/await
- **Frontend**: TypeScript with strict mode
- **CSS**: BEM methodology

## Production Build

### Build Angular Application

```bash
cd app_admin
ng build --configuration production
```

Built files will be in `dist/travlr-admin/`

### Deploy to Production

1. Set environment variables in production
2. Run database migrations
3. Start Express server: `npm start` or `NODE_ENV=production node bin/www`

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# or on Windows
netstat -ano | findstr :3000
```

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check connection string in `.env`
- Verify database exists in MongoDB Compass / Atlas / DBeaver

### Angular Build Errors
- Clear node_modules: `rm -rf app_admin/node_modules && npm install`
- Clear cache: `ng cache clean`
- Check Node.js version: `node --version`

## Contributing

This is a completed student project for SNHU CS-465. Modifications should follow the established patterns and maintain code quality.

## License

Educational use only - SNHU CS-465 

## README Credits
# Scaffold by Agent Claude Haiku 5.1

Edited by: Aiden Villanueva, 4/19/2026
