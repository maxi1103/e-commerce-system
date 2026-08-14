# e-commerce-system

Full-stack e-commerce platform with a Django REST API backend and a React + Vite frontend, orchestrated with Docker Compose.

## Architecture

```
e-commerce-system/
├ e-commerce-system-backend/   # Django 4.2 + DRF REST API
│   ├── api/                     # Product catalog (Producto, Categoria, SubCategoria, Medida, Imagen, Carrito, Orden, Pago, etc.)
│   ├── api_auth/                # User registration
│   ├── cms/                     # CMS (Banners, Configuraciones, Productos Destacados)
│   └── eCommerce/               # Django project settings
├ e-commerce-system-frontend/  # React 18 + Vite SPA
│   └── src/
│       ├── api/                 # Axios API client
│       ├── components/          # Shared UI components
│       ├── context/             # ShopContext (state management)
│       └── pages/               # Route pages
└ docker-compose.dev.yml       # Local dev orchestration
```

## Quick start (Docker)

```bash
docker compose -f docker-compose.dev.yml up --build
```

| Service  | URL                           |
|----------|-------------------------------|
| Frontend | http://localhost:5173         |
| API      | http://localhost:8000         |
| Admin    | http://localhost:8000/admin/  |
| MySQL    | localhost:3306 (root/root, devdb) |

## Manual setup

### Backend

```bash
cd e-commerce-system-backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

MySQL is expected via env vars: `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.  
For Cloudinary image upload, create a `.env` file with `API_KEY` and `SECRET_KEY`.

### Frontend

```bash
cd e-commerce-system-frontend
pnpm install
pnpm run dev      # http://localhost:5173
pnpm build    # production build
pnpm lint     # ESLint
```

API calls are hardcoded to `http://127.0.0.1:8000` — update `src/api/producto.api.js` if needed.

## API endpoints

| Endpoint                | Description      |
|-------------------------|------------------|
| `GET /`                 | Status check     |
| `GET/POST /api/productos/` | Products    |
| `GET/POST /api/categorias/` | Categories  |
| `GET/POST /api/subcategorias/` | Subcategories |
| `GET/POST /api/medidas/` | Measurements   |
| `GET/POST /api/imagenes/` | Images       |
| `GET/POST /api/carritos/` | Shopping carts |
| `GET/POST /api/carritoitems/` | Cart items |
| `GET/POST /api/ordenes/` | Orders       |
| `GET/POST /api/ordenitems/` | Order items |
| `GET/POST /api/pagos/` | Payments       |
| `GET/POST /cms/banners/` | CMS banners    |
| `GET/POST /cms/featured-products/` | Featured products |
| `GET/POST /cms/site-settings/` | Site settings |

## Stack

- **Backend:** Python 3.12, Django 4.2, Django REST Framework, MySQL 8.0, Cloudinary
- **Frontend:** React 18, Vite 5, SWC, Tailwind CSS 3, React Router 6, Axios
- **Infra:** Docker Compose

## Notes

- No tests or CI/CD configured yet.
- `src/api.js` is unused — use `src/api/producto.api.js`.
- <code>@angular/cli</code> in frontend dependencies is accidental and unused.