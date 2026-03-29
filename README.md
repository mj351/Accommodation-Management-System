# Accommodation Management System

A full-stack MERN application for managing student housing — rooms, students, bookings, and users with role-based access control.

## Features

- **Authentication** — JWT-based login and registration with secure password hashing (bcrypt)
- **Role-Based Access Control** — Admin and Staff roles with protected routes and middleware
- **Room Management** — Create, update, and delete rooms with capacity tracking
- **Student Management** — Maintain student records linked to room assignments
- **Booking System** — Book rooms for students with date-range validation, overlap detection, and cancellation support
- **User Management** — Admin-only user CRUD operations
- **Responsive UI** — React Bootstrap interface with toast notifications and protected client-side routing

## Tech Stack

| Layer | Technologies |
|------------|-----------------------------------------------|
| Frontend | React 18, React Router v6, React Bootstrap, Axios, React Toastify |
| Backend | Node.js, Express, Mongoose, JWT, bcryptjs |
| Database | MongoDB Atlas |
| Testing | Jest, Supertest (backend), React Testing Library (frontend) |

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm
- MongoDB Atlas account (or local MongoDB instance)

### Installation

```bash
# Clone the repository
git clone https://github.com/marwanjemal/Accommodation-Management-System.git
cd Accommodation-Management-System

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Install root test dependencies
cd ..
npm install
```

### Environment Variables

**Server** (`server/.env`):
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Client** (`client/.env`):
```
REACT_APP_API_BASE_URL=http://localhost:3001
```

### Seed the Database

```bash
cd server
npm run seed
```

This creates a default admin user and sample data for development.

### Run the Application

```bash
# Start the server (port 3001)
cd server
npm run dev

# In a separate terminal — start the client (port 3000)
cd client
npm start
```

## Usage

### Demo Credentials

| Role | Username | Password |
|-------|----------|------------|
| Admin | admin | admin123 |

### Admin vs Staff

- **Admin** — Full access: manage rooms, students, bookings, and users
- **Staff** — Can view and manage rooms, students, and bookings; cannot access user management or delete protected resources

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|-------------------------------|-------------------------------|------|
| POST | `/api/users/register` | Register a new user | No |
| POST | `/api/users/login` | Login and receive JWT | No |
| GET | `/api/users/me` | Get current user profile | Yes |
| GET | `/api/users` | List all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Yes |
| PUT | `/api/users/:id` | Update a user | Yes |
| DELETE | `/api/users/:id` | Delete a user | Admin |
| GET | `/api/students` | List all students | Yes |
| POST | `/api/students` | Create a student | Yes |
| PUT | `/api/students/:id` | Update a student | Yes |
| DELETE | `/api/students/:id` | Delete a student | Admin |
| GET | `/api/rooms` | List all rooms | Yes |
| POST | `/api/rooms` | Create a room | Yes |
| PUT | `/api/rooms/:id` | Update a room | Yes |
| DELETE | `/api/rooms/:id` | Delete a room | Admin |
| GET | `/api/bookings` | List all bookings | Yes |
| POST | `/api/bookings` | Create a booking | Yes |
| PUT | `/api/bookings/:id` | Update a booking | Yes |
| DELETE | `/api/bookings/:id` | Delete a booking | Yes |
| PUT | `/api/bookings/cancel/:id` | Cancel a booking | Yes |

## Project Structure

```
Accommodation-Management-System/
├── client/                     # React frontend
│   └── src/
│       ├── api/                # Axios instance with auth interceptor
│       ├── components/         # Forms, lists, Navbar, ProtectedRoute
│       ├── context/            # AuthContext (JWT + role state)
│       ├── pages/              # Route-level page components
│       └── config.js           # API base URL config
├── server/                     # Express backend
│   ├── middleware/             # auth.js (JWT), authorize.js (RBAC)
│   ├── models/                # Mongoose schemas (User, Student, Room, Booking)
│   ├── routes/                # REST endpoint handlers
│   ├── seed.js                # Database seeder
│   └── app.js                 # Express entry point
├── test_server/               # Backend integration tests
│   ├── helpers.js             # Auth token test utilities
│   ├── users.test.js
│   ├── students.test.js
│   ├── rooms.test.js
│   └── bookings.test.js
└── package.json               # Root — Jest config and test script
```

## Testing

### Backend Tests (Jest + Supertest)

```bash
# From project root
npm test
```

Runs integration tests against all API endpoints with authentication.

### Frontend Tests (React Testing Library)

```bash
cd client
npx react-scripts test --watchAll=false
```

Tests cover component rendering, form behavior, and protected route logic.

## Author

**Marwan Jemal**
