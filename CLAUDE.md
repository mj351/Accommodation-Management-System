# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MERN stack Accommodation Management System for managing student housing — rooms, students, bookings, and users with role-based access (admin/staff).

## Development Commands

### Server (Express + MongoDB)
```bash
cd server
npm install
npm start          # Start on port 3001
npm run dev        # Start with nodemon (auto-reload)
```

### Client (React)
```bash
cd client
npm install
npm start          # Start on port 3000
npm run build      # Production build
npm test           # Run React testing-library tests
```

### Backend Tests (Jest + Supertest)
```bash
# From project root
npm test           # Runs Jest across tests/ directory
```

### Docker (server only)
```bash
cd server
make build && make run
```

## Architecture

### Backend (`server/`)
- **Entry point:** `server/app.js` — Express server on port 3001, connects to MongoDB Atlas via `server/database.js`
- **Models:** `server/models/` — Mongoose schemas for User, Student, Room, Booking
- **Routes:** `server/routes/` — REST endpoints mounted at `/api/users`, `/api/students`, `/api/rooms`, `/api/bookings`
- **Middleware:** `server/middleware/auth.js` (JWT verification via `x-auth-token` header), `server/middleware/authorize.js` (role-based access control)
- **Note:** Auth/authorize middleware exist but are not currently applied to route definitions

### Frontend (`client/src/`)
- **Routing:** `App.js` uses React Router v6 — routes map to pages in `pages/`
- **Pages:** HomePage (login/register), BookingManagementPage, RoomManagementPage, StudentManagementPage, UserManagementPage
- **Components:** `components/` — forms (AddRoomForm, AddStudentForm, BookingForm, LoginForm, RegisterForm) and lists (RoomList, StudentList, UserList) with edit/delete modals
- **API config:** `config.js` exports `API_BASE_URL` from env var `REACT_APP_API_BASE_URL` (defaults to `http://localhost:3001`)
- **State:** Local component state with React hooks (no Redux/Context). Token stored in cookies (`authToken`), userID in localStorage
- **UI:** React Bootstrap + react-toastify for notifications + react-select for dropdowns

### API Endpoints
| Resource | GET (list) | POST (create) | PUT (update) | DELETE |
|----------|-----------|---------------|-------------|--------|
| `/api/users` | `/api/users` | `/api/users/register`, `/api/users/login` | `/api/users/:id` | `/api/users/:id` |
| `/api/students` | `/api/students` | `/api/students` | `/api/students/:id` | `/api/students/:id` |
| `/api/rooms` | `/api/rooms` | `/api/rooms` | `/api/rooms/:id` | `/api/rooms/:id` |
| `/api/bookings` | `/api/bookings` | `/api/bookings` | `/api/bookings/:id` | `/api/bookings/:id` |

Additional: `PUT /api/bookings/cancel/:id` — cancels a booking.

### Data Model Relationships
- **Booking** references Student and Room (by ObjectId)
- **Room** has `currentbookings` array and `students` array (ObjectId refs)
- **Student** has optional `room` reference (ObjectId)
- **User** has `role` field: `'admin'` or `'staff'` (default: `'staff'`)

### Tests (`tests/`)
Jest + Supertest integration tests for each resource (bookings, rooms, students, users). Tests connect to the live MongoDB Atlas instance.

## Environment Variables

- **Server** (`server/.env`): `JWT_SECRET`
- **Client** (`client/.env`): `REACT_APP_API_BASE_URL`

## Known Issues
- MongoDB connection string is hardcoded in `server/app.js` and `server/database.js` instead of using env vars
- Auth middleware exists but is not wired into any route definitions
- `RegisterForm.js` has a bug on the role input onChange (sets username instead of role)
- Some routes use deprecated `findByIdAndRemove`/`findOneAndRemove` (should be `findByIdAndDelete`)
