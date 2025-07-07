```mermaid
graph TD
  Usuario -->|Navega| Home[Home - Página Principal]
  Home -->|Ir a| Login[Login]
  Home -->|Ir a| Registro[Registro]

  Login -->|POST| API_Login[API /api/login]
  Registro -->|POST| API_Registro[API /api/registro]

  API_Login -->|Valida con| DB[(Base de Datos - PostgreSQL)]
  API_Registro -->|Guarda en| DB

  Login -->|Si éxito| Dashboard[Dashboard]
  Dashboard -->|Gestiona| Productos[Productos]
  Dashboard -->|Gestiona| Pedidos[Pedidos]
  Dashboard -->|Gestiona| Config[Configuración]

  Dashboard -->|POST| API_Logout[API /api/logout]
  API_Logout -->|Limpia sesión| Cookies[Cookie isAuthenticated]

  subgraph Frontend
    Home
    Login
    Registro
    Dashboard
    Productos
    Pedidos
    Config
  end

  subgraph API
    API_Login
    API_Registro
    API_Logout
  end

  subgraph Backend
    DB
  end

  Usuario -->|Autenticado vía| Cookies
  Dashboard -->|Verifica| Cookies
