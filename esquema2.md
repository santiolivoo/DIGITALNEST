```mermaid
graph TD
  %% Usuarios
  Usuario[👤 Usuario final] -->|Navega| Home[🏠 Home]
  Usuario -->|Crea cuenta| Registro[📝 Registro]
  Usuario -->|Inicia sesión| Login[🔐 Login]
  Usuario -->|Autenticado| Dashboard[📊 Dashboard]

  %% Dashboard y funcionalidades principales
  Dashboard --> Productos[📦 Gestión de Productos]
  Dashboard --> Pedidos[📬 Gestión de Pedidos]
  Dashboard --> Configuracion[⚙️ Configuración de Tienda]
  Dashboard --> Estadisticas[📈 Estadísticas de Ventas]
  Dashboard --> Logout[🚪 Logout]

  %% Flujo con API
  Registro -->|POST /api/registro| API_Registro
  Login -->|POST /api/login| API_Login
  Logout -->|POST /api/logout| API_Logout
  Productos -->|CRUD| API_Productos[API /api/productos]
  Pedidos -->|CRUD| API_Pedidos[API /api/pedidos]
  Configuracion -->|PUT| API_Config[API /api/configuracion]
  Estadisticas -->|GET| API_Stats[API /api/estadisticas]

  %% Base de datos
  API_Registro --> DB[(📚 PostgreSQL)]
  API_Login --> DB
  API_Productos --> DB
  API_Pedidos --> DB
  API_Config --> DB
  API_Stats --> DB

  %% Autenticación
  Login --> Cookies[🍪 Cookie isAuthenticated]
  Dashboard -->|Verifica| Cookies
  API_Login -->|Valida usuario| Prisma[🔁 Prisma ORM]
  API_Registro --> Prisma
  Prisma --> DB

  %% Deploy
  codebase[💻 Código en GitHub] --> Vercel[🚀 Deploy en Vercel]

  %% Subgráficos
  subgraph Frontend
    Home
    Registro
    Login
    Dashboard
    Productos
    Pedidos
    Configuracion
    Estadisticas
    Logout
  end

  subgraph Backend/API
    API_Registro
    API_Login
    API_Logout
    API_Productos
    API_Pedidos
    API_Config
    API_Stats
  end

  subgraph Infraestructura
    Prisma
    DB
    Cookies
    Vercel
    codebase
  end
