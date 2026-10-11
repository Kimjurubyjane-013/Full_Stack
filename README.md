# Full-Stack Application Monorepo

A modern, production-ready full-stack web application scaffold configured with an isolated dual-folder architecture for the client and server services.

---

## 🏗️ Architecture Overview

The repository is structured as a dual-folder monorepo managed via npm workspaces with concurrently orchestrated execution:

```
Full_Stack/
├── client/                      # Frontend Application (React + Vite + Tailwind CSS)
│   ├── public/                  # Static assets
│   ├── src/                     # React source code
│   │   ├── assets/              # Component-level static assets
│   │   ├── components/          # Reusable UI components
│   │   ├── App.jsx              # Root component & system status dashboard
│   │   ├── main.jsx             # React DOM root entrypoint
│   │   └── index.css            # Tailwind directives and global styles
│   ├── index.html               # Vite HTML template
│   ├── package.json             # Frontend dependencies & scripts
│   ├── vite.config.js           # Vite configuration & API reverse proxy
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   └── .env.example             # Client environment template
│
├── server/                      # Backend API Service (Node.js + Express)
│   ├── src/
│   │   ├── controllers/         # Request handling logic
│   │   ├── middlewares/         # Middleware (auth, validation, errors)
│   │   │   └── errorHandler.js  # Global error & 404 handlers
│   │   ├── models/              # Data models / database schemas
│   │   ├── routes/              # Express API route declarations
│   │   │   └── api.routes.js    # Base API endpoints
│   │   ├── app.js               # Express application configuration
│   │   └── index.js             # HTTP server entrypoint
│   ├── package.json             # Backend dependencies & scripts
│   └── .env.example             # Server environment variables template
│
├── .gitignore                   # Universal git ignore configuration
├── package.json                 # Monorepo root workspace orchestration
└── README.md                    # Project documentation
```

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **React 18**: Component-based UI library.
- **Vite 6**: Next-generation frontend build tool with fast Hot Module Replacement (HMR).
- **Tailwind CSS v3**: Utility-first CSS framework for rapid styling.
- **Lucide React**: Clean and consistent icons.

### Backend (`/server`)
- **Node.js**: Asynchronous event-driven JavaScript runtime (ES Modules).
- **Express.js**: Fast, unopinionated web framework for Node.js.
- **Helmet**: Essential HTTP headers security middleware.
- **CORS**: Cross-Origin Resource Sharing handling.
- **Morgan**: HTTP request logger middleware.
- **Nodemon**: Development automatic reload tool.

---

## 🚀 Quickstart & Developer Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher

### Step 1: Clone and Navigate
```bash
cd "Full_Stack"
```

### Step 2: Install Dependencies
Install dependencies for both workspaces from the root:
```bash
npm install
```
*(Alternatively, you can run `npm install --workspace=client` and `npm install --workspace=server`).*

### Step 3: Configure Environment Variables
Copy the `.env.example` templates to `.env` in both folders:

**For the Backend:**
```bash
# In /server
copy server\.env.example server\.env      # Windows PowerShell / CMD
# or: cp server/.env.example server/.env   # Bash
```
Default configuration:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**For the Frontend:**
```bash
# In /client
copy client\.env.example client\.env      # Windows PowerShell / CMD
# or: cp client/.env.example client/.env   # Bash
```
Default configuration:
```env
VITE_API_URL=http://localhost:5000
```

---

## 💻 Running the Application

### 1. Run Both Simultaneously (Recommended)
From the project root:
```bash
npm run dev
```
This triggers `concurrently`, spinning up:
- **Server**: [http://localhost:5000](http://localhost:5000) (with live nodemon reloads)
- **Client**: [http://localhost:5173](http://localhost:5173) (with Vite HMR)

### 2. Run Independently
- **Run Backend only**:
  ```bash
  npm run dev:server
  ```
- **Run Frontend only**:
  ```bash
  npm run dev:client
  ```

---

## 📡 API Endpoints

| Method | Endpoint      | Description                      |
|--------|---------------|----------------------------------|
| `GET`  | `/health`     | Server health check & uptime     |
| `GET`  | `/api/status` | API service status & info report |

---

## 🤝 Team Collaboration & Git Workflow

Please review [CONTRIBUTING.md](file:///c:/My%20Working/Full_Stack/CONTRIBUTING.md) for full collaboration standards:
- **Branching Policy**: `feature/frontend-*` for Person 2, `feature/backend-*` for Person 3, protected `main` branch.
- **Commit Standards**: Conventional Commits specification (`feat:`, `fix:`, `chore:`, etc.).
- **Pull Request Protocol & Conflict Resolution**: Rebase workflow, CI checks, and review process.

---

## 📦 Building for Production

To build the client application and prepare artifacts:
```bash
npm run build
```
To run the production server:
```bash
npm run start
```
