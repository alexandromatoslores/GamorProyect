# Gamor - Stream Game Platform

Plataforma para crear, buscar y unirse a salas de juego en streaming, con soporte para temas claro/oscuro, autenticación y experiencia responsive.

---

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## Características

- Registro e inicio de sesión de usuarios.
- Menú principal y menú móvil responsive.
- Temas claro y oscuro con persistencia.
- Búsqueda y filtrado de salas de juego.
- Cronómetro/cuenta regresiva para unirse a partidas.
- Código modular y documentado.

---

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/alexandromatoslores/gamor.git
   cd gamor
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Inicia la aplicación:**
   ```bash
   npm start
   # o
   yarn start
   ```

---

## Uso

- Accede a `http://localhost:3000` en tu navegador.
- Regístrate o inicia sesión para acceder a todas las funcionalidades.
- Cambia entre tema claro y oscuro con el botón correspondiente.
- Únete a salas de juego y explora las categorías.

---

## Estructura del Proyecto

```
src/
  components/
    auth/           # Login y registro
    navbar/         # Barra de navegación y menú móvil
    mainboard/      # Tablero principal y lógica de salas
    categories/     # Listado de categorías de juegos
    room/           # Lógica de búsqueda y filtrado de salas
    ui/             # Componentes reutilizables (alertas, etc.)
  context/          # Contextos globales (usuario, tema)
  data/             # Datos simulados (usuarios, juegos, categorías)
  styles/           # Estilos globales y variables CSS
  App.jsx           # Componente principal de rutas
  main.jsx          # Punto de entrada de la app
```

---

## Variables de Entorno

No se requieren variables de entorno especiales para el funcionamiento básico.

---

## Scripts Disponibles

- `npm start` / `yarn start`: Inicia la app en modo desarrollo.
- `npm run build` / `yarn build`: Compila la app para producción.
- `npm test` / `yarn test`: Ejecuta los tests (si tienes tests configurados).

---

