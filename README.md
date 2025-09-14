# GamePortal - Fullstack Assessment

## 🌐 Live Demo

- **Admin Portal:** https://game.nflabs.org
- **API Documentation:** https://api-game.nflabs.org

## 📋 Prerequisites

### For Docker Development (Recommended)

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### For Node.js Development

- [Node.js](https://nodejs.org/) v22.18.0
- [Yarn](https://yarnpkg.com/) or npm
- [PostgreSQL](https://postgresql.org/) v17

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone --depth 1 https://github.com/itsdeekha/game-admin-portal.git
cd game-admin-portal/
```

### 2. Setup Environment Variables

```bash
make cp-env
```

This copies `.env.example` to `.env` in both frontend and backend directories.

### 3. Configure Environment

#### Backend Configuration (`backend/.env`)

**Database Settings:**

```bash
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=admin
DATABASE_PASSWORD=password
DATABASE_NAME=game_db
```

**Authentication:**

```bash
AUTH_JWT_SECRET=your-super-secret-key-change-in-production
AUTH_JWT_TOKEN_EXPIRES_IN=24h
```

**S3 Storage:**

```bash
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_S3_REGION=us-east-1
AWS_DEFAULT_S3_BUCKET=your-bucket-name
```

#### Frontend Configuration (`frontend/.env`)

```bash
VITE_HOST_API=http://127.0.0.1:8000
```

## 🐳 Running with Docker (Recommended)

Docker automatically handles all dependencies and services.

### Start Backend API

```bash
make run-api
```

This will:

- Build the backend Docker image
- Start PostgreSQL database
- Start the API server on port 8000
- Enable hot reload for development

### Start Frontend

```bash
make run-ui
```

This will:

- Build the frontend Docker image
- Start the React development server on port 3000
- Enable hot reload for development

### Access Application

- **Frontend:** http://127.0.0.1:3000
- **Backend API:** http://127.0.0.1:8000

## ⚙️ Running with Node.js

### Backend Setup

```bash
cd backend/

# Install dependencies
yarn install
# or
npm install

# Run database migrations
yarn build
yarn migration:run

# Start development server
yarn dev
# or
npm run dev
```

### Frontend Setup

```bash
cd frontend/

# Install dependencies
yarn install
# or
npm install

# Start development server
yarn dev
# or
npm run dev
```

## 🐛 Troubleshooting

**Database Connection Issues:**

- Ensure PostgreSQL is running (with Docker, it starts automatically)
- Check DATABASE_HOST in `.env` (use `localhost` for Node.js, `postgres` for Docker)
- Verify database credentials

## 📦 Technology Stack

### Backend

- **Framework:** Fastify 5.6.0
- **Runtime:** Node.js 22.18.0
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Storage:** AWS S3
- **Package Manager:** Yarn

### Frontend

- **Framework:** React + Vite
- **Package Manager:** Yarn

### DevOps

- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Backend Deployment:** AWS EC2 + ECR
- **Frontend Deployment:** Cloudflare Pages
- **Process Management:** Make
