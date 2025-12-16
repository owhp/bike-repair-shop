# Bike Repair Shop Web Application

An Angular web application for managing bike repair shop bookings and appointments. This project uses [Angular CLI](https://github.com/angular/angular-cli) version 20.3.13.

## Features

- **Landing/Home Page**: Entry point highlighting main actions
- **About Us**: Information about the shop, philosophy, and team
- **Services**: List and description of all repair services offered
- **Book a Repair**: Multi-step booking process (Select Service → Date & Time → Contact Details → Review & Confirm)
- **My Appointments**: View, modify, or cancel existing bookings (authenticated users)
- **Contact/Location**: Map, address, opening hours, and contact form
- **Login/Register**: User authentication
- **Admin Dashboard**: Manage appointments and services (admin users only)

## Mock Data

The application uses mock data for demonstration purposes. You can use the following credentials to test different user roles:

- **Customer Account**: `customer@example.com` (any password)
- **Admin Account**: `admin@example.com` (any password)

## Project Structure

```
src/
├── app/
│   ├── booking/              # Booking flow components
│   │   ├── select-service/
│   │   ├── choose-datetime/
│   │   ├── contact-details/
│   │   └── review-confirm/
│   ├── guards/               # Route guards
│   │   ├── auth.guard.ts
│   │   └── admin.guard.ts
│   ├── models/               # TypeScript interfaces
│   │   ├── user.interface.ts
│   │   ├── service.interface.ts
│   │   ├── booking.interface.ts
│   │   └── appointment.interface.ts
│   ├── pages/                # Main page components
│   │   ├── home/
│   │   ├── about/
│   │   ├── services/
│   │   ├── contact/
│   │   ├── login/
│   │   ├── my-appointments/
│   │   ├── admin-dashboard/
│   │   └── booking-confirmation/
│   ├── services/             # Angular services
│   │   ├── auth.service.ts
│   │   ├── booking.service.ts
│   │   └── service-data.service.ts
│   └── shared/               # Shared components
│       ├── header/
│       ├── footer/
│       └── navigation/
└── assets/                   # Static assets
```

## State Transitions

The application follows this state diagram:

```
[Home]
  ├── [About]
  ├── [Services]
  ├── [Contact]
  ├── [Login/Register]
  │   └── [Home] (after authentication)
  └── [Book Repair]
      ├── [Select Service]
      ├── [Choose Date & Time]
      ├── [Enter Contact Details]
      ├── [Review & Confirm]
      └── [Booking Confirmation]
          └── [My Appointments] (authenticated users)

[Admin Dashboard] (admin only)
  └── Manage all appointments
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running linter

Run `ng lint` to lint the project using ESLint. This has been configured to enforce Angular best practices.

## Screenshots

### Home Page
![Home Page](https://github.com/user-attachments/assets/5e89100d-3b2a-4b82-b4ae-ca197657661d)

### Services Page
![Services Page](https://github.com/user-attachments/assets/0e927197-2a44-4f7b-9429-5941438e3d5c)

### Booking Flow - Select Service
![Booking Flow](https://github.com/user-attachments/assets/0249bae6-70ae-4a9d-876b-8e666eb3f44c)

### Login Page
![Login Page](https://github.com/user-attachments/assets/ef853b74-769b-487b-a609-53c01e360ab7)

### Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/3b27f395-0559-476a-8b6c-9fa9ca064013)

## Technologies Used

- Angular 20.3.15
- TypeScript 5.8.3
- RxJS 7.8
- Angular Router
- Standalone Components
- ESLint for code quality

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
