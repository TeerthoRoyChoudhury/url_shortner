# 🔗 URL Shortener API

A fast, production-ready URL shortener built with **Node.js**, **Drizzle ORM**, and **Docker**.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| ORM | Drizzle ORM |
| Validation | Zod |
| Short Code | nanoid |
| Auth | JWT |
| Package Manager | pnpm |
| Containerization | Docker Compose |

---

## 📁 Project Structure

```
├── controller/
│   ├── url.controller.js       # URL shorten / redirect logic
│   └── user.controller.js      # Register / login
├── middleware/
│   └── auth.middleware.js      # JWT auth guard
├── models/
│   ├── index.js                # Model exports
│   ├── url.model.js            # URL schema
│   └── user.model.js           # User schema
├── routes/
│   ├── url.routes.js           # /api/url routes
│   └── user.routes.js          # /api/user routes
├── services/                   # Business logic layer
├── src/db/
│   └── index.js                # DB connection
├── utils/
│   ├── hash.js                 # Manual password hashing with salth from crypto module
│   └── token.js                # JWT helpers
├── validation/
│   ├── req.validation.js       # Zod request schemas
│   └── token.validation.js     # Zod token validation
├── drizzle.config.js
├── docker-compose.yml
└── server.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `>=18`
- pnpm
- Docker & Docker Compose

### 1. Clone & Install

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/urlshortener
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:3000
```

### 3. Start with Docker

```bash
docker-compose up -d
```

### 4. Run Migrations

```bash
pnpm drizzle-kit push
```

### 5. Start the Server

```bash
# Development
pnpm dev

# Production
pnpm start
```

---

## 📡 API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/user/register` | Register a new user |
| `POST` | `/api/user/login` | Login & get JWT token |

### URLs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/url/shorten` | ✅ | Create a short URL |
| `GET` | `/api/url/my-urls` | ✅ | Get all URLs for user |
| `GET` | `/:shortCode` | ❌ | Redirect to original URL |
| `DELETE` | `/api/url/:id` | ✅ | Delete a short URL |

### Example Request

```bash
# Shorten a URL
curl -X POST http://localhost:3000/api/url/shorten \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ "originalUrl": "https://example.com/very/long/url" }'
```

```json
{
  "shortUrl": "http://localhost:3000/abc123",
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/url"
}
```

---

## 🛡️ Authentication

Protected routes require a `Bearer` token in the `Authorization` header.

```
Authorization: Bearer <your_jwt_token>
```

---

## ✅ Validation

All incoming requests are validated using **Zod** schemas defined in the `validation/` directory.

```js
// Example — req.validation.js
import { z } from 'zod'

export const shortenSchema = z.object({
  originalUrl: z.string().url({ message: 'Invalid URL' }),
})
```

Invalid requests return a structured error response:

```json
{
  "success": false,
  "errors": [{ "field": "originalUrl", "message": "Invalid URL" }]
}
```

---

## 🔑 Short Code Generation

Short codes are generated using **nanoid** for collision-resistant, URL-safe IDs.

```js
// utils/hash.js
import { nanoid } from 'nanoid'

export const generateShortCode = () => nanoid(8) // e.g. "V1StGXR8"
```

---

## 🐳 Docker

```bash
# Start all services
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

---

## 📜 Scripts

```bash
pnpm dev          # Start dev server with hot reload
pnpm start        # Start production server
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Drizzle Studio (DB GUI)
```

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a Pull Request

---

## 📄 License

[MIT](LICENSE)
