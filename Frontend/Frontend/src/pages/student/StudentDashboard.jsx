import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'
import TripCard from '../../components/TripCard'
import EmptyState from '../../components/EmptyState'
import Icon from '../../components/Icon'
import StatusBadge from '../../components/StatusBadge'
import { api } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import { formatDateTime } from '../../utils/format'

export default function StudentDashboard(){const {user}=useAuth();const [data,setData]=useState(null);const [err,setErr]=useState('');useEffect(()=>{api.getDashboard('STUDENT',user.id).then(setData).catch(e=>setErr(e.message))},[user.id]);
 const maps=useMemo(()=>{if(!data)return{};return{routes:Object.fromEntries(data.routes.map(x=>[x.id,x])),buses:Object.fromEntries(data.buses.map(x=>[x.id,x]))}},[data]);
 if(err)return <div className="notice danger">{err}</div>;if(!data)return <div className="grid grid-3">{[1,2,3].map(x=><div className="surface card" key={x}><div className="skeleton"/><div className="skeleton" style={{marginTop:12,width:'65%'}}/></div>)}</div>;
 const active=data.reservations.filter(r=>!['CANCELLED'].includes(r.status));const confirmed=active.filter(r=>r.status==='CONFIRMED').length;const queued=active.filter(r=>r.status==='WAITLISTED').length;const upcoming=data.trips.filter(t=>t.status==='SCHEDULED').slice(0,3)
 return <><PageHeader eyebrow="Student workspace" title={`Welcome, ${user.name.split(' ')[0]}`} description="Reserve your next shuttle, review your queue status, or open live tracking." actions={<Link className="btn btn-primary" to="/student/trips"><Icon name="search" size={17}/> Find a trip</Link>}/><div className="grid grid-3"><StatCard icon="ticket" label="Active bookings" value={active.length}/><StatCard icon="qr" label="Confirmed" value={confirmed}/><StatCard icon="users" label="Waiting list" value={queued}/></div><div className="grid grid-2" style={{marginTop:22,alignItems:'start'}}><section className="stack"><div className="row-between"><h2 style={{margin:0}}>Upcoming trips</h2><Link className="btn btn-ghost" to="/student/trips">View all</Link></div>{upcoming.map(t=><TripCard key={t.id} trip={t} route={maps.routes[t.routeId]} bus={maps.buses[t.busId]} actionTo={`/student/trips/${t.id}`}/>)}</section><section className="stack"><div className="row-between"><h2 style={{margin:0}}>My reservations</h2><Link className="btn btn-ghost" to="/student/reservations">Manage</Link></div>{active.length?active.slice(0,4).map(r=>{const t=data.trips.find(x=>x.id===r.tripId);const route=t?maps.routes[t.routeId]:null;return <div className="surface card" key={r.id}><div className="row-between"><div><strong>{route?.name||'Trip unavailable'}</strong><div className="muted small">{t?formatDateTime(t.startTime):'Trip data missing'}</div></div><StatusBadge value={r.status}/></div>{r.status==='WAITLISTED'&&<p className="muted small" style={{marginBottom:0}}>Queue position: <strong>#{r.queuePosition||'—'}</strong></p>}</div>}):<EmptyState icon="🎫" title="No active reservation" text="Browse upcoming trips and reserve a seat when you are ready." action={<Link className="btn btn-primary" to="/student/trips">Browse trips</Link>}/>}</section></div></>}
