import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'
import StatusBadge from '../../components/StatusBadge'
import Icon from '../../components/Icon'
import { api } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import { formatDateTime } from '../../utils/format'

export default function DriverDashboard(){
  const {user}=useAuth(); const [d,setD]=useState(null)
  useEffect(()=>{api.getDashboard('DRIVER').then(setD)},[])
  const maps=useMemo(()=>d?{r:Object.fromEntries(d.routes.map(x=>[x.id,x])),b:Object.fromEntries(d.buses.map(x=>[x.id,x]))}:{},[d])
  if(!d) return <div className="grid grid-3">{[1,2,3].map(i=><div className="surface card" key={i}><div className="skeleton"/></div>)}</div>
  const assignedBus=d.buses.find(b=>b.driver===user.name) || d.buses.find(b=>b.status==='ACTIVE')
  const trip=d.trips.find(t=>t.busId===assignedBus?.id && t.status==='SCHEDULED') || d.trips.find(t=>t.status==='SCHEDULED')
  return <><PageHeader eyebrow="Driver workspace" title={`Hello, ${user.name.split(' ')[0]}`} description="Review your assigned trip and operate the frontend GPS simulator." actions={<Link className="btn btn-primary" to="/driver/tracking"><Icon name="location" size={17}/> Open GPS simulator</Link>}/>
    <div className="grid grid-3"><StatCard icon="bus" label="Assigned bus" value={assignedBus?.number||'—'}/><StatCard icon="clock" label="Next ETA" value={trip?`${trip.etaMin} min`:'—'}/><StatCard icon="wifi" label="GPS channel" value="Ready"/></div>
    <div className="surface card" style={{marginTop:22}}><div className="row-between"><div><span className="eyebrow">Next assignment</span><h2 style={{margin:'6px 0'}}>{trip?maps.r[trip.routeId]?.name:'No scheduled trip'}</h2></div>{trip&&<StatusBadge value={trip.status}/>}</div>{trip&&<><div className="divider" style={{margin:'18px 0'}}/><div className="grid grid-3"><div><span className="muted small">Departure</span><strong style={{display:'block'}}>{formatDateTime(trip.startTime)}</strong></div><div><span className="muted small">Bus</span><strong style={{display:'block'}}>{maps.b[trip.busId]?.number}</strong></div><div><span className="muted small">Reservations</span><strong style={{display:'block'}}>{trip.reserved}</strong></div></div><div className="row" style={{marginTop:20,flexWrap:'wrap'}}><Link className="btn btn-soft" to="/driver/trip">View assignment</Link><Link className="btn btn-primary" to="/driver/tracking">Start simulator</Link></div></>}</div>
  </>
}
