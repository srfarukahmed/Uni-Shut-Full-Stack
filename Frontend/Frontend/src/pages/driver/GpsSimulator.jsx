import { useEffect, useRef, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Icon from '../../components/Icon'
import StatusBadge from '../../components/StatusBadge'
import { api } from '../../services/mockApi'

export default function GpsSimulator(){
  const [trips,setTrips]=useState([]); const [routes,setRoutes]=useState([]); const [selected,setSelected]=useState(''); const [running,setRunning]=useState(false); const [position,setPosition]=useState({lat:23.7500,lng:90.3800}); const [sent,setSent]=useState(0); const timer=useRef(null)
  useEffect(()=>{Promise.all([api.getTrips(),api.getRoutes()]).then(([t,r])=>{setTrips(t);setRoutes(r);setSelected(t[0]?.id||'');if(t[0])setPosition({lat:t[0].lat,lng:t[0].lng})})},[])
  useEffect(()=>()=>timer.current&&clearInterval(timer.current),[])
  const start=()=>{if(running)return;setRunning(true);timer.current=setInterval(()=>{setPosition(p=>({lat:+(p.lat+0.0007).toFixed(5),lng:+(p.lng+0.0005).toFixed(5)}));setSent(n=>n+1)},1400)}
  const stop=()=>{setRunning(false);if(timer.current)clearInterval(timer.current);timer.current=null}
  const choose=id=>{stop();setSelected(id);const t=trips.find(x=>x.id===id);if(t)setPosition({lat:t.lat,lng:t.lng});setSent(0)}
  const t=trips.find(x=>x.id===selected); const route=routes.find(x=>x.id===t?.routeId)
  return <><PageHeader eyebrow="Driver GPS" title="GPS simulator" description="A frontend-only simulation of the coordinates a driver client would send to the Java TCP socket server." actions={<StatusBadge value={running?'ACTIVE':'INACTIVE'}/>}/>
    <div className="grid grid-2" style={{alignItems:'start'}}><div className="surface card stack"><label className="label">Trip<select className="select" value={selected} onChange={e=>choose(e.target.value)}>{trips.map(x=><option key={x.id} value={x.id}>{routes.find(r=>r.id===x.routeId)?.name||x.id}</option>)}</select></label><div className="divider"/><div className="grid grid-2"><div><span className="muted small">Latitude</span><strong style={{display:'block',fontSize:'1.4rem'}}>{position.lat.toFixed(5)}</strong></div><div><span className="muted small">Longitude</span><strong style={{display:'block',fontSize:'1.4rem'}}>{position.lng.toFixed(5)}</strong></div></div><div><span className="muted small">Payloads generated</span><strong style={{display:'block'}}>{sent}</strong></div><div className="row"><button className="btn btn-success" onClick={start} disabled={running||!t}><Icon name="wifi" size={17}/> Start sending</button><button className="btn btn-danger" onClick={stop} disabled={!running}>Stop</button></div><div className="notice"><strong>Backend integration</strong><div className="muted small">In the real project, the driver client sends bus/trip ID, latitude, longitude, timestamp and source over a TCP socket. This browser demo visualizes the state only.</div></div></div><div className="surface live-map" style={{minHeight:430}}><div className="map-road road-a"/><div className="map-road road-b"/><div className="map-road road-c"/><div className="map-bus" style={{left:`${48+Math.min(sent,10)}%`,top:`${50-Math.min(sent,8)}%`}}><Icon name="bus" size={22}/></div><div className="map-origin">{route?.origin||'Origin'}</div><div className="map-dest">{route?.destination||'Destination'}</div></div></div>
  </>
}
