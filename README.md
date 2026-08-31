# Doctor Appointment Frontend

This is the frontend application for a doctor appointment booking system. It is built with React, TypeScript, Vite, and a custom UI layer based on shadcn-inspired components and Tailwind styling.

## Overview

The frontend allows users to:

- sign up and log in
- access protected patient routes
- view available specialties
- select a date and time slot
- book an appointment
- delete an appointment 

The application communicates with the backend REST API on port 3001 and uses JWT-based authentication stored in cookies.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- shadcn/ui pattern components
- Zod form validation
- Sonner for notifications
- js-cookie and JWT decoding for auth state management

## Project Structure

```bash
src/
  api/                 # API calls for auth and appointments
  components/          # Reusable layout and UI components
  context/             # AuthProvider and auth state logic
  hooks/               # Custom hooks
  lib/                 # Shared utility helpers
  pages/               # Login, signup, home, and patient screens
  router/              # Route guards
  schemas/             # Form validation schemas
  types/               # Shared TS types
  utils/               # Cookie helpers
  App.tsx              # App routing setup
  main.tsx             # Application entry point
```

## Prerequisites

- Node.js 18+ recommended
- npm or pnpm
- The backend API must be running on port 3001

## Environment

Create a local environment file if needed:

```bash
cp .env.example .env
```

Example:

```env
VITE_API_URL=http://localhost:3001
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

The development server starts in Vite and usually runs at:

```text
http://localhost:5173
```

## Production Build

Build the frontend:

```bash
npm run build
```

This generates a production bundle in the `dist` folder.

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev      # Start the Vite dev server
npm run build    # Type-check and build for production
npm run lint     # Run ESLint checks
npm run preview  # Preview the production build
```

## Authentication Flow

The app stores the JWT in a cookie named `access_token` and exposes auth state via `AuthProvider`.

- login requests are sent to `/auth/login`
- signup requests are sent to `/auth/signup`
- protected pages are gated through route wrappers
- the token is decoded to read the current username and to determine auth status

## Route Overview

- `/` → home page
- `/auth/login` → login screen
- `/auth/signup` → registration screen
- `/users/specialties` → specialty selection for patients
- `/users/appointments` → appointment booking page

## Notes

This frontend is designed to work with the backend API exposed by the doctor appointment service. The backend handles user creation, JWT authentication, appointment validation, and MongoDB persistence.

For full app behavior, run both repositories together: the frontend for the browser experience and the backend for API and database services.

