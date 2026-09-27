export const seedUsers = [
  { id: 'u1', name: 'Ayesha Rahman', email: 'student@unishut.edu', password: 'Student123!', role: 'STUDENT', universityId: 'UNI-2026-0412' },
  { id: 'u2', name: 'Nafis Karim', email: 'admin@unishut.edu', password: 'Admin123!', role: 'ADMIN' },
  { id: 'u3', name: 'Mahin Driver', email: 'driver@unishut.edu', password: 'Driver123!', role: 'DRIVER' },
]

export const seedBuses = [
  { id: 'b1', number: 'BUS-01', plate: 'DHAKA-METRO-B-11-2044', capacity: 42, status: 'ACTIVE', driver: 'Mahin Driver' },
  { id: 'b2', number: 'BUS-02', plate: 'DHAKA-METRO-B-11-3198', capacity: 36, status: 'ACTIVE', driver: 'Sakib Hasan' },
  { id: 'b3', number: 'BUS-03', plate: 'DHAKA-METRO-B-13-1107', capacity: 40, status: 'MAINTENANCE', driver: 'Unassigned' },
]

export const seedRoutes = [
  { id: 'r1', name: 'Campus ↔ Dhanmondi', origin: 'Main Campus', destination: 'Dhanmondi 27', stops: ['Main Gate', 'Science Lab', 'Kalabagan', 'Dhanmondi 27'], distanceKm: 10.8 },
  { id: 'r2', name: 'Campus ↔ Uttara', origin: 'Main Campus', destination: 'Uttara Sector 7', stops: ['Main Gate', 'Banani', 'Airport', 'Uttara Sector 7'], distanceKm: 22.4 },
  { id: 'r3', name: 'Campus ↔ Mirpur', origin: 'Main Campus', destination: 'Mirpur 10', stops: ['Main Gate', 'Agargaon', 'Mirpur 1', 'Mirpur 10'], distanceKm: 14.1 },
]

const today = new Date()
const isoTime = (h, m = 0, plusDays = 0) => {
  const d = new Date(today)
  d.setDate(d.getDate() + plusDays)
  d.setHours(h, m, 0, 0)
  return d.toISOString()
}

export const seedTrips = [
  { id: 't1', routeId: 'r1', busId: 'b1', startTime: isoTime(8, 0, 1), status: 'SCHEDULED', reserved: 31, waitlisted: 0, etaMin: 18, lat: 23.7465, lng: 90.3760 },
  { id: 't2', routeId: 'r2', busId: 'b2', startTime: isoTime(8, 30, 1), status: 'SCHEDULED', reserved: 36, waitlisted: 4, etaMin: 24, lat: 23.7806, lng: 90.4070 },
  { id: 't3', routeId: 'r3', busId: 'b1', startTime: isoTime(14, 30, 1), status: 'SCHEDULED', reserved: 18, waitlisted: 0, etaMin: 16, lat: 23.7581, lng: 90.3732 },
  { id: 't4', routeId: 'r1', busId: 'b2', startTime: isoTime(17, 15, 1), status: 'SCHEDULED', reserved: 28, waitlisted: 0, etaMin: 21, lat: 23.7510, lng: 90.3850 },
  { id: 't5', routeId: 'r3', busId: 'b2', startTime: isoTime(7, 45, 2), status: 'SCHEDULED', reserved: 7, waitlisted: 0, etaMin: 17, lat: 23.7602, lng: 90.3811 },
]

export const seedReservations = [
  { id: 'res1', userId: 'u1', tripId: 't3', serialNumber: 18, status: 'CONFIRMED', issuedAt: new Date().toISOString(), qr: 'UNISHUT-T3-U1-RES1' },
]
