# TravlrAdmin - Angular Admin Dashboard

Admin dashboard Single Page Application (SPA) for managing Travlr Getaways content. Built with Angular 17 and TypeScript for a responsive, modern user experience that's easy to debug.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Code Scaffolding](#code-scaffolding)
- [Testing](#testing)
- [Architecture & Patterns](#architecture--patterns)
- [Troubleshooting](#troubleshooting)

## Project Overview

TravlrAdmin is a comprehensive admin interface for managing travel destinations, accommodations, and dining experiences. It provides authenticated users with tools to perform full CRUD (Create, Read, Update, Delete) operations on trip data through an intuitive, responsive interface.

### Key Features

- **Trip Management** - View, add, edit, and delete travel destinations
- **Real-time Validation** - Form validation with user feedback
- **Responsive Design** - Works on desktop, tablet, and mobile
- **JWT Authentication** - Secure token-based authentication
- **HTTP Interceptors** - Automatic token injection for protected requests
- **State Management** - Service-based data flow
- **Component-based Architecture** - Modular, reusable components

## Technology Stack

- **Angular** - v17 (Latest)
- **TypeScript** - v5.x
- **RxJS** - v7.x (Reactive programming)
- **Bootstrap** - v5.x (CSS framework)
- **Angular CLI** - v19.2.24
- **Karma & Jasmine** - Testing framework
- **Webpack** - Module bundler (via CLI)

## Project Structure

```
app_admin/
├── src/
│   ├── app/
│   │   ├── app.component.*       # Root component
│   │   ├── app.config.ts         # Angular config
│   │   ├── app.routes.ts         # Route definitions
│   │   ├── components/
│   │   │   ├── add-trip/         # Add trip form
│   │   │   ├── edit-trip/        # Edit trip form
│   │   │   ├── delete-trip/      # Delete confirmation
│   │   │   ├── trip-card/        # Trip card display
│   │   │   ├── trip-listing/     # Trip list view
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── trip-data.service.ts  # API communication
│   │   ├── models/
│   │   │   └── trip.ts           # Trip interface
│   │   ├── data/
│   │   |    └── trips.ts         # Mock trip data
|   |   └── utils/
|   |        └── jwt.interceptor.ts  # Interceptor for auth
│   ├── main.ts                   # Application entry point
│   ├── index.html                # HTML template
│   └── styles.css                # Global styles
├── angular.json                  # Angular CLI config
├── tsconfig.json                 # TypeScript config
├── tsconfig.app.json             # App-specific TypeScript config
├── tsconfig.spec.json            # Test TypeScript config
├── karma.conf.js                 # Karma test runner config
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Prerequisites

Ensure you have the following installed:

- **Node.js** - v16+ (Check: `node --version`)
- **npm** - v8+ (Check: `npm --version`)
- **Angular CLI** - Optional but recommended
  ```bash
  npm install -g @angular/cli@19
  ```

## Installation

### 1. Install Dependencies

From the `app_admin` directory:

```bash
npm install
```

### 2. Verify Installation

```bash
ng version
```

You should see Angular CLI and Angular versions.

## Development

### Start Development Server

```bash
ng serve
```

Or with npm:

```bash
npm start
```

The application will be available at `http://localhost:4200/`

### Development Features

- **Hot Module Replacement (HMR)** - Changes auto-reload
- **Source Maps** - Debug TypeScript directly
- **Development Server** - Built-in with Angular CLI
- **Proxy Configuration** - API requests proxied to backend

### Project Workflow

1. Make code changes in `src/`
2. Browser auto-reloads (HMR)
3. Check browser console for errors
4. Run tests to verify changes

## Building

### Production Build

```bash
ng build --configuration production
```

Or:

```bash
npm run build
```

### Build Output

- Location: `dist/travlr-admin/`
- Optimized and minified
- Tree-shaken (unused code removed)
- Ahead-of-time (AOT) compiled

### Build for Specific Environment

```bash
ng build --configuration development
ng build --configuration production
```

## Code Scaffolding

Angular CLI provides powerful code generation tools:

### Generate Component

```bash
ng generate component component-name
# or
ng g c component-name
```

Example:
```bash
ng generate component components/my-new-component
```

### Generate Service

```bash
ng generate service services/my-service
# Creates: my-service.service.ts and my-service.service.spec.ts
```

### Generate Other Schematics

```bash
# Directive
ng generate directive directive-name

# Pipe
ng generate pipe pipe-name

# Guard
ng generate guard guards/auth-guard

# Interface/Model
ng generate interface models/my-model
```

### List All Available Schematics

```bash
ng generate --help
```

## Testing

### Run Unit Tests

```bash
ng test
```

Or with npm:

```bash
npm test
```

Tests will run in watch mode and re-run when code changes.

### Run Tests Once (CI Mode)

```bash
ng test --watch=false
ng test --no-watch --code-coverage
```

### Run End-to-End (E2E) Tests

```bash
ng e2e
```

### Test Coverage

```bash
ng test --code-coverage
```

Coverage report: `coverage/`

## Architecture & Patterns

### Component Structure

```
component-name/
├── component-name.component.ts       # Logic
├── component-name.component.html     # Template
├── component-name.component.css      # Styles
└── component-name.component.spec.ts  # Tests
```

### Service Pattern

Services handle:
- HTTP communication with backend API
- State management
- Shared business logic
- Authentication

### Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored in `BROWSER_STORAGE`
4. HTTP Interceptor adds token to requests
5. Backend validates token

### HTTP Communication

```typescript
// Services use HttpClient
private http = inject(HttpClient);

// Add auth headers
getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('Authorization');
  return new HttpHeaders({
    'Authorization': token || ''
  });
}
```

## Troubleshooting

### Port 4200 Already in Use

```bash
# Use different port
ng serve --port 4300
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Angular cache
ng cache clean
# or
rm -rf .angular/cache

# Rebuild
ng build
```

### Compilation Errors

- Check TypeScript version: `ng version`
- Review errors in terminal
- Ensure `tsconfig.json` is correct
- Check for missing imports

### CORS Errors

- Ensure backend has CORS enabled
- Check proxy configuration in `angular.json`
- Verify API endpoint in service

### API Requests Failing

1. Check backend is running: `npm start` from `travlr/`
2. Verify API endpoint in `trip-data.service.ts`
3. Check network tab in browser DevTools
4. Verify JWT token is valid

## Performance Optimization (planned)

- **Change Detection** - OnPush strategy for components
- **Lazy Loading** - Routes load modules on demand
- **Tree Shaking** - Remove unused code during build
- **Code Splitting** - Bundle optimization
- **Minification** - Production builds are minified

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Documentation](https://angular.io/cli)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

## Development Tips

1. Use Chrome DevTools Angular extension for debugging
2. Use `@Component` decorators for metadata
3. Implement `OnInit` for initialization logic
4. Use `OnDestroy` to clean up subscriptions
5. Prefer reactive forms over template-driven forms
6. Use services for data sharing between components
7. Keep components focused on single responsibility

## Related Documentation

For fullstack application information, see:
- [Main README.md](../README.md) - Fullstack architecture
- [Backend API](../app_api/) - Express API documentation
- [Server Routes](../app_server/) - Server-side pages

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## README Credits
# Scaffold by Agent Claude Haiku 5.1

Edited by: Aiden Villanueva, 4/19/2026