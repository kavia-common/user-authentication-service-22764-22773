# user-authentication-service-22764-22773

## login_api_backend

A minimal Node.js + Express login API with session handling backed by Redis when available (gracefully falls back to in-memory sessions if Redis is not reachable).

### Running

```bash
cd login_api_backend
npm install
npm run dev
# or: npm start
```

The service listens on **port 3001** (as required by preview). The Swagger UI is available at:

- `GET /docs`

### Environment variables (optional)

This project is designed to run even with no `.env` configured.

If you want Redis-backed sessions, provide a Redis URL:

- `REDIS_URL` (example: `redis://localhost:6379`)

Other optional settings:

- `SESSION_SECRET` (default: `dev-secret-change-me`)
- `NODE_ENV` (`development` by default)

### Endpoints

- `GET /health` — Health check
- `POST /login` — Login with JSON `{ "username": "...", "password": "..." }`
- `POST /logout` — Logout and destroy session
- `GET /me` — Returns the currently logged in user (requires session cookie)

### Example

```bash
curl -i -X POST http://localhost:3001/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"demo","password":"password"}'

curl -i http://localhost:3001/me
curl -i -X POST http://localhost:3001/logout
```
