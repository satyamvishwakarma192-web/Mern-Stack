# Copilot instructions for this repository

Purpose
- Short guide for Copilot sessions: how to build, run, lint, and where to find core patterns and conventions in this MERN example.

Build / Run / Lint / Test (where present)
- Frontend (React + Vite) — from repo-root/frontend:
  - Install: npm install
  - Dev server: npm run dev (vite)
  - Build: npm run build
  - Preview production bundle: npm run preview
  - Lint: npm run lint (uses eslint with eslint.config.js)

- Backend (Node/Express) — from repo-root/backend:
  - Install: npm install
  - Start: npm start (package.json: "start": "nodemon app.js"). If that fails, the runtime entrypoint is server.js so try: node server.js or nodemon server.js
  - Test: no tests currently configured (package.json test is a placeholder)

Notes on running a single test
- No test runner configured. If tests are added (Jest/Mocha), run a single test with the test runner's native flag (e.g., jest <path/to/test> or mocha <file>). Add npm scripts for convenience.

Environment variables
- The backend loads .env (server.js uses require('dotenv').config()). Observed env keys used in code:
  - JWT_SECRET (used by auth jwt.sign / jwt.verify)
  - IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT (used by ImageKit storage service)
- server.js currently listens on port 3000.

High-level architecture (big picture)
- Monorepo-style layout with two top-level apps:
  - frontend/: React app scaffolded with Vite. Routing defined in src/routes/AppRoutes.jsx and UI components under src/components. ESLint uses the new flat config (eslint.config.js).
  - backend/: Node + Express app. Entrypoint: server.js -> loads src/app.js which mounts routes. Database connection is in src/db/db.js (mongoose). Code organized into src/controllers, src/models, src/routes, src/middlewares, src/services.
- API surface (examples):
  - /api/auth/* — user & foodPartner registration, login, logout
  - /api/food/* — protected food endpoints (create, list)
- Auth & sessions:
  - JWTs are issued and stored in an HTTP cookie named token. Middleware in src/middlewares checks req.cookies.token and verifies JWT, then attaches user/foodPartner to req.
- File uploads/storage:
  - Multer is used with memoryStorage for uploads (backend/src/routes/food.routes.js). Files are uploaded via storage.services which uses ImageKit; uploads are sent as base64 and ImageKit returns a URL stored on the model.

Key conventions and patterns (repo-specific)
- Route naming: controllers are mounted under /api/<domain> (e.g., /api/auth, /api/food) and individual actions use path segments like /user/register and /foodPartner/register.
- Middleware naming: authUserMiddleware and authFoodPartnerMiddlewares (note pluralization pattern on food partner middleware).
- Models: Mongoose models live under src/models and use lowercase collection names (e.g., 'user', 'food', 'foodpartner') and standard Mongoose schema export patterns.
- Storage pattern: uploaded file buffer -> base64 -> storage.services.uploadFile(fileBase64, uuid()) -> store returned URL on model.
- Cookies: backend sets token via res.cookie("token", token) and clears with res.clearCookie("token"). Copilot should look for cookie-based auth when generating auth-related changes.
- ESLint: frontend uses the flat config file (eslint.config.js) instead of .eslintrc; use the configured rules when suggesting frontend edits.

Docs & AI assistant configs found
- README.md at repo root and frontend/README.md exist. No CONTRIBUTING.md, no .github/copilot-instructions.md (created now), and no CLAUDE.md/.cursorrules/AGENTS.md/CONVENTIONS.md/AIDER_CONVENTIONS.md/.windsurfrules found.

If editing or adding tests, maintain the monorepo separation: keep frontend scripts under frontend/ and backend scripts under backend/ and run package manager commands from those directories.

Questions for the project owner
- Would you like an MCP server configured for web UI/E2E (example: Playwright) so automated UI tests or browser snapshots can be run by the assistant? (yes/no)

MCP Servers / Copilot cloud agent setup
- A GitHub Actions setup (copilot-setup-steps) was added at: .github/workflows/copilot-setup-steps.yml
- Purpose: preinstall Node.js, install both frontend and backend dependencies, install Playwright test runner and browsers in the Copilot environment so Copilot cloud agent can run browser-based E2E or smoke tests without needing to install these packages each session.
- What it does:
  - runs on ubuntu-latest with contents: read permission
  - sets up Node.js 20 and caches npm packages
  - runs npm ci in backend/ and frontend/
  - installs @playwright/test into frontend and runs `npx playwright install --with-deps` to fetch browsers
- How Copilot will use it: when Copilot cloud agent starts in this repo, these steps run first. After they succeed, Copilot can run Playwright tests (if present) or run quick checks like `npx playwright test` from frontend/.

Local Playwright notes (run manually):
- From repo-root/frontend:
  - Install Playwright locally: npm i -D @playwright/test
  - Install browsers: npx playwright install --with-deps
  - Run tests: npx playwright test <test-file-or-suite>

--
Generated by Copilot CLI helper: created .github/copilot-instructions.md and added MCP server configuration (Playwright).