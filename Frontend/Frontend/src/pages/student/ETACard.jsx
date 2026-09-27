import {useEffect,useState} from 'react'
export default function ETACard(){const [m,setM]=useState(7);useEffect(()=>{let t=setInterval(()=>setM(x=>x?x-1:7),5000);return()=>clearInterval(t)},[]);return <div className="surface card"><h3>Live ETA</h3><b>{m} minutes</b><p className="muted">Bus is approaching your stop</p></div>}
