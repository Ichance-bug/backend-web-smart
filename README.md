# Smart Student Service Backend

A web-based student academic records and service management system backend built with **Node.js**, **Express**, and **Sequelize**.

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express
- **ORM** — Sequelize (MySQL2)
- **Auth** — JSON Web Tokens (JWT)
- **Security** — Helmet, CORS, bcryptjs, express-rate-limit

---

## Project Structure

```
server/
├── index.js                  ← App entry, middleware setup, route mounting
├── config/
│   ├── env.js                ← Loads & validates environment variables
│   └── database.js           ← Sequelize instance (MySQL)
├── middleware/
│   ├── authMiddleware.js     ← Verifies student JWT
│   ├── adminMiddleware.js    ← Verifies admin JWT
│   ├── errorHandler.js       ← Global error handler
│   └── rateLimiter.js        ← Brute-force protection on login
├── routes/
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   ├── enrollmentRoutes.js
│   ├── gradesRoutes.js
│   ├── attendanceRoutes.js
│   ├── paymentsRoutes.js
│   ├── documentsRoutes.js
│   └── notificationsRoutes.js
├── controllers/
│   ├── authController.js
│   ├── adminAuthController.js
│   ├── adminController.js
│   ├── enrollmentController.js
│   ├── gradesController.js
│   ├── attendanceController.js
│   ├── paymentsController.js
│   ├── documentsController.js
│   └── notificationsController.js
├── models/
│   ├── index.js              ← Loads models & defines associations
│   ├── Student.js
│   ├── Admin.js
│   ├── Enrollment.js
│   ├── Grade.js
│   ├── Attendance.js
│   ├── Payment.js
│   ├── Document.js
│   ├── Notification.js
│   ├── AuditLog.js
│   └── Config.js
└── utils/
    ├── jwt.js
    ├── hash.js
    ├── response.js
    └── gwaCalculator.js
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp server/.env.example server/.env
```

Fill in your values:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_ADMIN_SECRET=your_admin_jwt_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Start the server

```bash
npm run dev       # development (nodemon)
npm start         # production
```

Server runs at `http://localhost:5000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Student login |
| POST | `/api/auth/logout` | Student logout |
| GET | `/api/auth/me` | Get current student |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/logout` | Admin logout |
| GET | `/api/admin/students` | List all students |
| PATCH | `/api/admin/students/:id` | Update student |
| GET | `/api/admin/requests` | List pending requests |
| PATCH | `/api/admin/requests/:id` | Approve/reject request |
| GET | `/api/admin/audit-log` | View audit trail |

### Student Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enrollment` | Get enrollment records |
| POST | `/api/enrollment` | Submit enrollment |
| GET | `/api/grades` | Get grades |
| GET | `/api/grades/gwa` | Get computed GWA |
| GET | `/api/attendance` | Get attendance records |
| GET | `/api/payments` | Get payment records |
| POST | `/api/payments` | Submit payment |
| GET | `/api/documents` | Get document requests |
| POST | `/api/documents` | Request a document |
| GET | `/api/notifications` | Get notifications |
| PATCH | `/api/notifications/:id/read` | Mark notification as read |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

---

## Authentication

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are obtained from the login endpoints.
