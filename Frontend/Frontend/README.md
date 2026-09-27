# uniShut React Frontend

A complete frontend prototype for **uniShut — Smart University Shuttle Reservation, Queue Management and Real-Time Location Tracking System**.

## Technology
- React 18
- React Router 6
- Vite 5
- Plain modern CSS (no heavy UI framework)
- localStorage mock API so all workflows are demonstrable before Spring Boot is connected

## Run in VS Code / Terminal
```bash
npm install
npm run dev
```
Open the URL printed by Vite, normally `http://localhost:5173`.

Production build:
```bash
npm run build
npm run preview
```

## Demo accounts
| Role | Email | Password |
|---|---|---|
| Student | student@unishut.edu | Student123! |
| Admin | admin@unishut.edu | Admin123! |
| Driver | driver@unishut.edu | Driver123! |

The login page has a **Use demo** button that fills the matching credentials automatically.

## Major screens
### Public
- Modern bubble-style landing page
- Sticky navigation
- Responsive mobile menu
- Light / dark theme
- Student registration
- Role-specific sign in

### Student
- Dashboard
- Browse/search trips
- Trip details + capacity
- Reserve seat
- Automatic waiting-list fallback for full buses
- Duplicate-reservation protection
- Reservation cancellation
- Waiting-list promotion logic in the mock layer
- QR boarding-pass screen
- Live tracking workspace
- Profile

### Admin
- Operations dashboard
- Bus CRUD
- Route CRUD
- Trip CRUD
- Referential-delete protection for scheduled trips
- Reservation / queue monitoring
- Live fleet monitoring
- Profile

### Driver
- Driver dashboard
- Assigned trip
- GPS simulator
- Profile

## Backend integration map
The project is deliberately split so the mock service can later be replaced by Spring Boot endpoints.

- `src/services/mockApi.js` → replace or wrap with REST calls using `fetch` / Axios.
- Login/registration → Spring Boot auth controller.
- Buses/routes/trips/reservations → REST controllers.
- Student/Admin live map → subscribe to Spring WebSocket/STOMP location + ETA messages.
- Driver GPS simulator → the proposal specifies a Java TCP socket client/server; browser JavaScript cannot directly open raw TCP sockets. Keep the actual driver GPS client in Java (or a native/mobile client) and use the React driver screen as an operational UI.

## Notes on mock behavior
- Data persists in browser `localStorage`.
- The provided demo seed is inserted automatically on first run.
- A full trip places a student into an ordered waiting list.
- Cancelling a confirmed seat promotes the first waiting student in the local mock data.
- The QR image is a deterministic **visual demo pattern**, not a cryptographically valid QR code. The backend should generate and validate the real token.
- GPS/live-map coordinates are simulated frontend state until the TCP + WebSocket backend is connected.

## Project structure
```text
src/
  components/       reusable UI building blocks
  context/          auth, theme and toast state
  data/             mock seed data
  layouts/          public and authenticated shells
  pages/
    auth/
    student/
    admin/
    driver/
    shared/
  services/         mock API / future API boundary
  styles/           global, layout, landing and auth styling
  utils/            date formatting helpers
```
