import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'
import Icon from '../../components/Icon'
import SeatMap from '../../components/SeatMap'
import { api } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { formatDateTime } from '../../utils/format'

export default function TripDetails(){
 const {id}=useParams(); const {user}=useAuth(); const {notify}=useToast();
 const [trip,setTrip]=useState(null),[res,setRes]=useState(null),[seat,setSeat]=useState(null),[err,setErr]=useState(''),[loading,setLoading]=useState(false)
 const load=()=>Promise.all([api.getTrip(id),api.getReservations(user.id)]).then(([t,r])=>{setTrip(t);setRes(r.find(x=>x.tripId===id&&!['CANCELLED'].includes(x.status))||null)}).catch(e=>setErr(e.message))
 useEffect(()=>{load()},[id])
 const reserve=async()=>{setLoading(true);try{const r=await api.reserve(user.id,id,seat);setRes(r);await load();notify(r.status==='WAITLISTED'?'Joined waiting list':'Seat reserved successfully','success')}catch(e){setErr(e.message)}finally{setLoading(false)}}
 if(!trip)return <div className="surface card"><div className="skeleton"/></div>
 const left=Math.max(0,trip.bus.capacity-trip.reserved)
 const occupied=Array.from({length:trip.reserved},(_,i)=>`S-${i+1}`)
 return <>
 <PageHeader back eyebrow="Trip details" title={trip.route.name} description={`${trip.route.origin} → ${trip.route.destination}`} actions={<StatusBadge value={trip.status}/>}/>
 <div className="grid grid-2">
  <div className="stack"><div className="surface card stack"><strong>{trip.bus.number}</strong><div className="row"><Icon name="clock"/><span>{formatDateTime(trip.startTime)}</span></div><div>{left} seats available</div><div className="muted">Stops: {trip.route.stops.join(' → ')}</div></div>
  {!res && left>0 && <SeatMap capacity={trip.bus.capacity} selected={seat} onSelect={setSeat} occupied={occupied}/>}</div>
  <div className="surface card stack"><h3>Reservation</h3>{err&&<div className="notice danger">{err}</div>}{res?<><StatusBadge value={res.status}/><p>Seat: <b>{res.seatNumber||'Waiting list'}</b></p>{res.qr&&<Link className="btn btn-primary" to={`/student/reservations/${res.id}/pass`}><Icon name="qr"/> Boarding Pass</Link>}</>:<button className="btn btn-primary" disabled={loading||(!seat&&left>0)} onClick={reserve}>{loading?'Processing...':left?'Reserve Selected Seat':'Join Waiting List'}</button>}</div>
 </div></>
}
