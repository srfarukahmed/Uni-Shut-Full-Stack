import { seedBuses, seedReservations, seedRoutes, seedTrips, seedUsers } from '../data/mockData'

const K = { users:'unishut-users', buses:'unishut-buses', routes:'unishut-routes', trips:'unishut-trips', reservations:'unishut-reservations' }
const clone = v => JSON.parse(JSON.stringify(v))
const wait = (ms=180) => new Promise(r => setTimeout(r, ms))

function init(key, seed) {
  if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(seed))
}
export function ensureSeed() {
  init(K.users, seedUsers); init(K.buses, seedBuses); init(K.routes, seedRoutes); init(K.trips, seedTrips); init(K.reservations, seedReservations)
}
const get = key => JSON.parse(localStorage.getItem(key) || '[]')
const set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const api = {
  async login(email, password, role) {
    ensureSeed(); await wait()
    const user = get(K.users).find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password && (!role || u.role === role))
    if (!user) throw new Error('Invalid email, password, or role.')
    const safe = { ...user }; delete safe.password; return safe
  },
  async register(payload) {
    ensureSeed(); await wait()
    const users = get(K.users)
    if (users.some(u => u.email.toLowerCase() === payload.email.toLowerCase())) throw new Error('An account already exists with this email.')
    if (payload.role === 'STUDENT' && users.some(u => u.universityId === payload.universityId)) throw new Error('This university ID is already registered.')
    const user = { id: `u${Date.now()}`, ...payload }
    users.push(user); set(K.users, users)
    const safe = { ...user }; delete safe.password; return safe
  },
  async getDashboard(role, userId) {
    ensureSeed(); await wait(120)
    const trips = get(K.trips), buses = get(K.buses), routes = get(K.routes), reservations = get(K.reservations)
    if (role === 'STUDENT') return { trips, buses, routes, reservations: reservations.filter(r => r.userId === userId) }
    return { trips, buses, routes, reservations }
  },
  async getTrips() { ensureSeed(); await wait(120); return clone(get(K.trips)) },
  async getTrip(id) {
    ensureSeed(); await wait(120)
    const trip = get(K.trips).find(t => t.id === id)
    if (!trip) throw new Error('Trip not found.')
    const route = get(K.routes).find(r => r.id === trip.routeId), bus = get(K.buses).find(b => b.id === trip.busId)
    return { ...clone(trip), route, bus }
  },
  async getBuses() { ensureSeed(); await wait(120); return clone(get(K.buses)) },
  async getRoutes() { ensureSeed(); await wait(120); return clone(get(K.routes)) },
  async getReservations(userId) { ensureSeed(); await wait(120); const all=get(K.reservations); return clone(userId ? all.filter(r=>r.userId===userId) : all) },
  async reserve(userId, tripId, seatNumber=null) {
    ensureSeed(); await wait(240)
    const trips = get(K.trips), reservations = get(K.reservations), buses = get(K.buses)
    const trip = trips.find(t=>t.id===tripId)
    if (!trip || trip.status !== 'SCHEDULED') throw new Error('This trip is not available for reservation.')
    const duplicate = reservations.find(r=>r.userId===userId && r.tripId===tripId && !['CANCELLED'].includes(r.status))
    if (duplicate) throw new Error('You already have an active reservation or queue entry for this trip.')
    const bus = buses.find(b=>b.id===trip.busId)
    if (!bus || bus.status !== 'ACTIVE') throw new Error('The assigned bus is not currently active.')
    const confirmed = reservations.filter(r=>r.tripId===tripId && ['CONFIRMED','BOARDED'].includes(r.status)).length
    const full = Math.max(trip.reserved, confirmed) >= bus.capacity
    const waiting = reservations.filter(r=>r.tripId===tripId && r.status==='WAITLISTED').length
    const queueBase = Math.max(trip.waitlisted || 0, waiting)
    const id = `res${Date.now()}`
    const usedSeats = reservations.filter(r=>r.tripId===tripId && r.seatNumber).map(r=>r.seatNumber)
    if (!full && seatNumber && usedSeats.includes(seatNumber)) throw new Error('This seat is already reserved. Please select another seat.')
    const res = full
      ? { id, userId, tripId, serialNumber: null, seatNumber:null, queuePosition: queueBase + 1, status:'WAITLISTED', issuedAt:new Date().toISOString(), qr:null }
      : { id, userId, tripId, serialNumber: Math.max(trip.reserved, confirmed) + 1, seatNumber: seatNumber || `S-${Math.max(trip.reserved, confirmed)+1}`, status:'CONFIRMED', issuedAt:new Date().toISOString(), qr:`UNISHUT-${tripId.toUpperCase()}-${userId.toUpperCase()}-${id.toUpperCase()}` }
    reservations.push(res)
    if (full) trip.waitlisted += 1; else trip.reserved += 1
    set(K.reservations,reservations); set(K.trips,trips)
    return clone(res)
  },
  async cancelReservation(id, userId) {
    ensureSeed(); await wait(220)
    const reservations = get(K.reservations), trips=get(K.trips)
    const r = reservations.find(x=>x.id===id && (!userId || x.userId===userId))
    if (!r) throw new Error('Reservation not found.')
    if (['CANCELLED','BOARDED'].includes(r.status)) throw new Error(r.status === 'BOARDED' ? 'A boarded reservation cannot be cancelled.' : 'This reservation is already cancelled.')
    const trip = trips.find(t=>t.id===r.tripId)
    const wasConfirmed = r.status === 'CONFIRMED'
    r.status = 'CANCELLED'
    if (trip) {
      if (wasConfirmed) trip.reserved = Math.max(0, trip.reserved - 1)
      else trip.waitlisted = Math.max(0, trip.waitlisted - 1)
      if (wasConfirmed) {
        const next = reservations.filter(x=>x.tripId===r.tripId && x.status==='WAITLISTED').sort((a,b)=>(a.queuePosition||999)-(b.queuePosition||999))[0]
        if (next) {
          next.status='CONFIRMED'; next.serialNumber = trip.reserved + 1; next.queuePosition=null; next.qr=`UNISHUT-${trip.id.toUpperCase()}-${next.userId.toUpperCase()}-${next.id.toUpperCase()}`
          trip.reserved += 1; trip.waitlisted = Math.max(0,trip.waitlisted-1)
        }
      }
    }
    set(K.reservations,reservations); set(K.trips,trips); return true
  },
  async saveEntity(type, entity) {
    ensureSeed(); await wait(180)
    const key = K[type]
    if (!key) throw new Error('Unsupported entity type.')
    const list=get(key); const copy={...entity}
    if (type==='buses') {
      if (list.some(x=>x.id!==copy.id && (x.number?.toLowerCase()===copy.number?.toLowerCase() || x.plate?.toLowerCase()===copy.plate?.toLowerCase()))) throw new Error('Bus number and plate must be unique.')
    }
    if (type==='routes') {
      if (list.some(x=>x.id!==copy.id && x.name?.toLowerCase()===copy.name?.toLowerCase())) throw new Error('Route name must be unique.')
    }
    if (type==='trips') {
      const bus=get(K.buses).find(b=>b.id===copy.busId)
      if (!bus) throw new Error('Selected bus no longer exists.')
      if (copy.status==='SCHEDULED' && bus.status!=='ACTIVE') throw new Error('A scheduled trip requires an active bus.')
      if (Number(copy.reserved||0)>Number(bus.capacity||0)) throw new Error('Reserved seats cannot exceed bus capacity.')
    }
    if (!copy.id) copy.id = `${type[0]}${Date.now()}`
    const i=list.findIndex(x=>x.id===copy.id); i>=0 ? list.splice(i,1,copy) : list.push(copy); set(key,list); return clone(copy)
  },
  async deleteEntity(type, id) {
    ensureSeed(); await wait(170)
    const key=K[type]; if(!key) throw new Error('Unsupported entity type.')
    if (type==='buses' && get(K.trips).some(t=>t.busId===id && t.status==='SCHEDULED')) throw new Error('Cannot delete a bus assigned to a scheduled trip.')
    if (type==='routes' && get(K.trips).some(t=>t.routeId===id && t.status==='SCHEDULED')) throw new Error('Cannot delete a route used by a scheduled trip.')
    set(key,get(key).filter(x=>x.id!==id)); return true
  },

  async getUsers() { ensureSeed(); await wait(120); return clone(get(K.users).map(({password,...u})=>u)) },
  async saveUser(entity) {
    ensureSeed(); await wait(160)
    const users=get(K.users); const copy={...entity}
    if(!copy.name || !copy.email || !copy.role) throw new Error('Name, email and role are required.')
    if(users.some(u=>u.id!==copy.id && u.email.toLowerCase()===copy.email.toLowerCase())) throw new Error('Email already exists.')
    if(!copy.id) { copy.id=`u${Date.now()}`; copy.password=copy.password || 'Welcome123!'; }
    const idx=users.findIndex(u=>u.id===copy.id); idx>=0 ? users.splice(idx,1,{...users[idx],...copy}) : users.push(copy)
    set(K.users,users); const safe={...copy}; delete safe.password; return safe
  },
  async deleteUser(id) {
    ensureSeed(); await wait(150)
    if(id==='u2') throw new Error('Demo admin account cannot be deleted.')
    const users=get(K.users); set(K.users,users.filter(u=>u.id!==id)); return true
  },
  resetDemo() { Object.values(K).forEach(k=>localStorage.removeItem(k)); ensureSeed() }
}
