import { useEffect,useState } from 'react'
import { api } from '../../services/mockApi'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'

export default function AdminAnalytics(){
 const [data,setData]=useState({})
 useEffect(()=>{api.getDashboard('ADMIN').then(setData)},[])
 const reservations=data.reservations||[]
 return <><PageHeader title="System Analytics" subtitle="Operational insights from shuttle activity"/>
 <div className="card-grid"><StatCard title="Total trips" value={(data.trips||[]).length}/><StatCard title="Buses" value={(data.buses||[]).length}/><StatCard title="Reservations" value={reservations.length}/><StatCard title="Waiting queue" value={reservations.filter(r=>r.status==='WAITLISTED').length}/></div>
 <div className="panel"><h3>Operational overview</h3><p className="muted">Monitor capacity usage, queue pressure, and reservation performance before connecting real WebSocket analytics.</p></div></>
}
