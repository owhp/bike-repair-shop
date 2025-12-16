# GitHub Copilot Instructions for Bike Repair Shop Angular App

## Architecture Overview

This is a standalone Angular 17+ application using the new application config pattern (no `app.module.ts`). The app follows a multi-step booking wizard architecture with mock data services for demonstration.

**Key Architectural Decisions:**
- **Standalone Components**: All components use `standalone: true` and explicit imports
- **Functional Guards**: Uses Angular's new functional guard syntax (`CanActivateFn`)
- **BehaviorSubject State**: Services use RxJS `BehaviorSubject` for shared state management
- **Mock Services**: All data operations simulate API calls with `of().pipe(delay())` pattern

## Project Structure & Patterns

### Service Organization
```
src/app/services/
├── auth.service.ts      # User authentication with localStorage persistence
├── booking.service.ts   # Booking wizard state management  
└── service-data.service.ts # Service catalog data
```

**State Management Pattern:** Services expose both `currentData` Observable and `currentDataValue` getter:
```typescript
private currentBookingSubject = new BehaviorSubject<Booking>({ serviceId: '' });
public currentBooking = this.currentBookingSubject.asObservable();
public get currentBookingValue(): Booking { return this.currentBookingSubject.value; }
```

### Booking Flow Architecture
The booking flow (`/book/*`) is a nested route structure with shared state:
1. `select-service` → Updates `BookingService.currentBooking`
2. `choose-datetime` → Adds date/time to booking state  
3. `contact-details` → Adds contact info
4. `review-confirm` → Creates appointment via `BookingService.createAppointment()`

**Navigation Pattern:** Each step calls `bookingService.updateBooking(partial)` then `router.navigate(['/book/next-step'])`

### Authentication System
- **Mock Credentials**: `customer@example.com` / `admin@example.com` (any password works)
- **Persistence**: Uses localStorage with key `'currentUser'`
- **Guards**: `authGuard` for user routes, `adminGuard` for admin dashboard
- **Role-based Access**: User interface shows/hides features based on `currentUserValue?.role`

## Development Workflows

### Quick Start
```bash
npm install          # Install dependencies
npm start            # Serve at localhost:4200 (alias for ng serve)
npm test            # Run unit tests with Karma
npm run lint        # ESLint with Angular rules
```

### Component Generation
Always use Angular CLI with the standalone flag (default in this setup):
```bash
ng generate component pages/new-page    # Creates standalone component
ng generate service services/new-data   # Creates injectable service
```

### Mock Data Patterns
When adding new entities, follow the established mock service pattern:
```typescript
// In service constructor
private mockEntities: Entity[] = [/* initial data */];

// For operations
getEntities(): Observable<Entity[]> {
  return of(this.mockEntities).pipe(delay(300)); // Simulate network
}
```

## Code Conventions

### Import Structure
Follow this order in component imports:
```typescript
// 1. Angular core
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// 2. App services  
import { AuthService } from '../../services/auth.service';

// 3. App models
import { User } from '../../models/user.interface';
```

### Component Selectors
- **Prefix**: All selectors use `app-` prefix (enforced by ESLint)
- **Style**: Use kebab-case for component selectors (`app-select-service`)

### Interface Definitions
- **Location**: All interfaces in `src/app/models/*.interface.ts`
- **Naming**: PascalCase with descriptive names (`Appointment`, `Service`)
- **Status Enums**: Use string literal unions (`'pending' | 'confirmed' | 'cancelled'`)

## Key Integration Points

### Route Guards
Guard functions inject services using Angular's `inject()` function:
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Guard logic
};
```

### State Persistence
- **User Sessions**: AuthService persists to localStorage automatically
- **Booking State**: BookingService state is memory-only (resets on page refresh)
- **Pattern**: Services handle their own persistence in constructor/methods

### Cross-Component Communication
- **User State**: Subscribe to `authService.currentUser` Observable
- **Booking State**: Subscribe to `bookingService.currentBooking` Observable  
- **Avoid**: Direct component-to-component communication; use services as state stores

## Common Tasks

**Adding New Service Types:** Update `ServiceDataService.mockServices` array and `Service` interface
**New Authentication Roles:** Add role to `User.role` union type and update guard logic
**Booking Flow Steps:** Add route to `/book/*` children, update `BookingService.currentBooking` interface
**Admin Features:** Protect with `adminGuard` and check `user.role === 'admin'` in templates