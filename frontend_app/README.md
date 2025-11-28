# Angular Micro Front-End App

This Angular app provides:
- Reusable UI primitives (buttons, inputs, alert/toast) under Ocean Professional theme.
- Application shell with responsive sidebar, header, and content area.
- Authentication flows: Login, MFA, Forgot Password, Reset Password.
- Config service reading environment variables and exposing feature flags.

## Run locally

```bash
npm install
npm start
# or: ng serve
```

App runs by default on http://localhost:3000

## Routes

- /              → Shell + Dashboard (protected)
- /feature       → Example feature (protected)
- /auth/login    → Login
- /auth/mfa      → MFA code entry
- /auth/forgot   → Forgot password
- /auth/reset    → Reset password (expects ?token=...)

## Environment variables

These NG_APP_* variables are read at runtime via `window.__env` if present:

- NG_APP_API_BASE              → API base URL (e.g., https://api.example.com)
- NG_APP_BACKEND_URL           → Backend base URL
- NG_APP_FRONTEND_URL          → Frontend base URL
- NG_APP_WS_URL                → Websocket URL
- NG_APP_NODE_ENV              → Environment name (development|production)
- NG_APP_NEXT_TELEMETRY_DISABLED → Disable telemetry (true|false)
- NG_APP_ENABLE_SOURCE_MAPS    → Enable source maps (true|false)
- NG_APP_PORT                  → Port for local dev
- NG_APP_TRUST_PROXY           → Trust proxy setting
- NG_APP_LOG_LEVEL             → Log level
- NG_APP_HEALTHCHECK_PATH      → Healthcheck path
- NG_APP_FEATURE_FLAGS         → JSON object or CSV list of feature flags
- NG_APP_EXPERIMENTS_ENABLED   → Enable experiments (true|false)

ConfigService exposes these values; use it in services/components.

## Theme

Ocean Professional palette:
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Global CSS at `src/app/ui/ocean-theme.css` and `src/styles.css`.

## Auth

AuthService handles:
- login, mfa, forgot, reset
- token persistence (localStorage) and state
- Authorization header via HTTP interceptor

Guards:
- authGuard → protects private routes
- publicGuard → redirects authenticated users away from auth pages

### Note
Provide valid backend endpoints that match:
- POST {API_BASE}/auth/login
- POST {API_BASE}/auth/mfa
- POST {API_BASE}/auth/forgot
- POST {API_BASE}/auth/reset

No backend configuration is modified here.

