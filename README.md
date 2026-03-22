# TDRFATAX - Tax Application

A full-stack tax filing application built with React, Express, and MongoDB.

## Project Structure

```
TDRFATAX/
├── server.ts              # Express backend server
├── src/                   # React frontend source
│   ├── App.tsx            # Main React component
│   ├── main.tsx           # React entry point
│   └── pages/             # Page components
│       ├── Login.tsx
│       ├── Register.tsx
│       ├── Dashboard.tsx
│       ├── VATManagement.tsx
│       ├── CorporateTax.tsx
│       ├── Payments.tsx
│       └── Profile.tsx
├── dist/                  # Built frontend (production)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── index.html             # HTML entry point
└── .env                   # Environment variables
```

## Prerequisites

- **Node.js** 16+ installed
- **MongoDB** (optional - app runs without it for demo purposes)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` (already created)
   - Update values if needed (defaults provided)

## Running the Application

### Development Mode (Frontend + Backend together)
```bash
npm run dev
```
This starts:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Vite dev server with hot reload

### Production Build
```bash
npm run build
```
This compiles TypeScript and bundles the React frontend into `dist/`.

### Preview Production Build
```bash
npm run preview
```
Previews the production build locally.

### Backend Only
```bash
npm run server
```
Runs just the Express server on port 5000.

## Database Setup

### Optional: MongoDB Setup

If you want to use the database:

1. **Install MongoDB Community Edition:**
   - Download from: https://www.mongodb.com/try/download/community
   - Or use: `brew install mongodb-community` (macOS)

2. **Start MongoDB:**
   - **Windows:** Use MongoDB Compass or run `mongod` in CMD
   - **macOS:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`

3. **Verify connection:**
   - MongoDB should run on `localhost:27017` (default)
   - The server will log `✓ Database connection successful` when connected

### Running Without Database
The application can run in offline mode if MongoDB is unavailable:
- Authentication endpoints will log warnings but won't crash
- Frontend works normally
- Great for demos and development

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login and receive JWT token

### Protected Routes (Require JWT token)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user

## Features

- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ React Router navigation
- ✅ Protected routes
- ✅ VAT management
- ✅ Corporate tax filing
- ✅ Payment tracking
- ✅ User profiles

## Troubleshooting

### MongoDB Connection Error
```
Database connection error: MongooseServerSelectionError
```
**Solution:** MongoDB is not running. Either:
- Start MongoDB service, or
- Continue with the app in offline mode

### Port Already in Use
If port 3000 or 5000 is already in use:
```bash
# Change port in .env
PORT=5001
```

### TypeScript Errors
Clear node_modules and reinstall:
```bash
rm -r node_modules
npm install
npm run build
```

## Environment Variables

```
PORT=5000                                    # Backend port
MONGODB_URI=mongodb://localhost:27017/tdrfatax  # MongoDB connection
JWT_SECRET=your_jwt_secret_key_here         # JWT signing key
NODE_ENV=development                        # development or production
```

## Build Output

- **Frontend:** `dist/` folder (optimized production build)
  - Bundled React app with Vite
  - Minified and gzipped assets
- **Backend:** TypeScript compiled to JavaScript via `tsc`

## Scripts Summary

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (frontend + backend) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run server` | Run backend server only |

## Technologies Used

- **Frontend:** React 18, React Router, Vite
- **Backend:** Express.js, Node.js
- **Database:** MongoDB, Mongoose
- **Security:** JWT, bcrypt
- **Build Tool:** Vite
- **Language:** TypeScript

## License

Proprietary - TDRFATAX Project
