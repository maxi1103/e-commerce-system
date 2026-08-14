# e-commerce-system

Monorepo with two sub-projects: a Django REST API backend and a React + Vite frontend. Docker Compose orchestrates all three services (frontend, backend, MySQL).

## Quick start

```bash
docker compose -f docker-compose.dev.yml up --build
```

To run this in future, use `docker compose -f docker-compose.dev.yml up -d --build backend db`. Note: the entrypoint's 5s MySQL wait can occasionally be too short on a cold start — if you see "Can't connect to server on 'db'", just run `docker compose -f docker-compose.dev.yml restart backend`.

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Admin: http://localhost:8000/admin/
- MySQL: localhost:3306 (root/root, database: devdb)

## Project boundaries

| Directory | Role | Entry point | Framework |
|---|---|---|---|
| `e-commerce-system-backend/` | REST API (`eCommerce.settings`) | `manage.py` | Django 4.2 + DRF |
| `e-commerce-system-frontend/` | SPA | `src/main.jsx` | React 18 + Vite + SWC |

## Backend

**Django apps:**
- `api/` — product catalog (Producto, Categoria, SubCategoria, Medida, Imagen, Carrito, Orden, Pago) with ModelViewSets exposed at `/api/*`
- `api_auth/` — user registration (`/register` endpoint, but **commented out** from root `urls.py`)
- `cms/` — CMS (Banners, Productos Destacados, Configuraciones del sitio) with ModelViewSets exposed at `/cms/*`

**Database:** MySQL via env vars (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`). No test DB config.

**Image upload:** Products can upload images. The `ProductoView.create` method saves uploaded files to `../e-commerce-system-frontend/src/assets/` (relative from backend root), so the frontend dev server can serve them. CMS also supports banner and featured product image uploads.

**Cloudinary:** Configured in `settings.py` using `API_KEY` and `SECRET_KEY` from `.env` (via `python-decouple`).

**Commands (run from `e-commerce-system-backend/`):**
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

## Frontend

- JSX only (no TypeScript)
- Tailwind CSS with custom color `primary: #ff8901`
- React Router v6 with pages in `src/pages/`
- State via Context API in `src/context/ShopContext.jsx`
- API calls via Axios, hardcoded to `http://127.0.0.1:8000`
- `@angular/cli` in `package.json` is likely accidental — do not rely on it

**Commands (run from `e-commerce-system-frontend/`):**
```bash
pnpm dev      # vite dev server (port 5173)
pnpm build    # vite build
pnpm lint     # ESLint
pnpm host     # vite --host
```

## Testing

- No tests exist. Both `tests.py` files are empty stubs across all apps (`api`, `api_auth`, `cms`).
- No test framework is configured.
- No CI/CD pipelines.

## Known quirks

- `docker-compose.dev.yml` volume mounts (`./frontend:/app`, `./backend:/app`) use paths that don't match the actual directory names (`e-commerce-system-frontend`, `e-commerce-system-backend`). The mounts are effectively no-ops; the Docker build copies code via `COPY . .`.
- `api_auth` URLs are defined but not included in the root URL conf. If auth is needed, uncomment the line in `eCommerce/urls.py`.
- `src/api.js` is empty and unused. Use `src/api/producto.api.js` instead.
- No `.env` file committed — create one at the backend root with `API_KEY` and `SECRET_KEY` for Cloudinary if needed.

## Conventions

- Python: Django REST Framework with ModelViewSets + DefaultRouter
- Frontend: React functional components, Context API, Tailwind utility classes, JSX only
- Docker: separate `Dockerfile.dev` per service, entrypoint handles migrations automatically
