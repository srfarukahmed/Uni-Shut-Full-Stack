import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'
import Icon from '../../components/Icon'
import { api } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import { formatDateTime } from '../../utils/format'

export default function DriverTrip(){
  const {user}=useAuth(); const [d,setD]=useState(null)
  useEffect(()=>{api.getDashboard('DRIVER').then(setD)},[])
  const maps=useMemo(()=>d?{r:Object.fromEntries(d.routes.map(x=>[x.id,x])),b:Object.fromEntries(d.buses.map(x=>[x.id,x]))}:{},[d])
  if(!d)return <div className="surface card"><div className="skeleton"/></div>
  const bus=d.buses.find(b=>b.driver===user.name)||d.buses.find(b=>b.status==='ACTIVE'); const t=d.trips.find(x=>x.busId===bus?.id&&x.status==='SCHEDULED')||d.trips[0]; const route=t?maps.r[t.routeId]:null
  return <><PageHeader eyebrow="Driver assignment" title="Assigned trip" description="Trip information relevant to the driver GPS client and boarding workflow."/>{t?<div className="grid grid-2" style={{alignItems:'start'}}><div className="surface card stack"><div className="row-between"><h2 style={{margin:0}}>{route?.name}</h2><StatusBadge value={t.status}/></div><div className="divider"/><div className="row"><div className="icon-box"><Icon name="clock"/></div><div><span className="muted small">Departure</span><strong style={{display:'block'}}>{formatDateTime(t.startTime)}</strong></div></div><div className="row"><div className="icon-box"><Icon name="bus"/></div><div><span className="muted small">Vehicle</span><strong style={{display:'block'}}>{maps.b[t.busId]?.number} • {maps.b[t.busId]?.plate}</strong></div></div><div className="row"><div className="icon-box"><Icon name="users"/></div><div><span className="muted small">Confirmed seats</span><strong style={{display:'block'}}>{t.reserved}</strong></div></div></div><div className="surface card"><h3 style={{marginTop:0}}>Route stops</h3><div className="stack">{route?.stops.map((s,i)=><div className="row" key={s}><span className="step-no" style={{width:38,height:38,borderRadius:12}}>{i+1}</span><strong>{s}</strong></div>)}</div></div></div>:<div className="notice">No assigned trip found.</div>}</>
}
