import {useEffect,useState} from 'react'
import PageHeader from '../../components/PageHeader'
import {useAuth} from '../../context/AuthContext'
import Icon from '../../components/Icon'

const key='unishut-student-tools'
const read=()=>JSON.parse(localStorage.getItem(key)||JSON.stringify({favourites:[],feedback:[],lost:[]}))
export default function StudentExtras(){
 const {user}=useAuth(); const [data,setData]=useState(read); const [fav,setFav]=useState(''); const [msg,setMsg]=useState('')
 const save=(d)=>{setData(d);localStorage.setItem(key,JSON.stringify(d))}
 const addFav=()=>{if(!fav.trim())return;save({...data,favourites:[...data.favourites,{id:Date.now(),route:fav}]});setFav('')}
 const addLost=()=>{const title=prompt('Describe lost item');if(title)save({...data,lost:[...data.lost,{id:Date.now(),title,status:'OPEN'}]})}
 const feedback=()=>{const text=prompt('Trip feedback');if(text)save({...data,feedback:[...data.feedback,{id:Date.now(),text,student:user.name}]})}
 return <><PageHeader eyebrow="Student services" title="Smart shuttle tools" description="Extra student operations for a complete campus transport experience."/>
 <div className="grid grid-3">
 {[
 ['Favourite routes',data.favourites.length,'route'],['Feedback submitted',data.feedback.length,'star'],['Lost & Found reports',data.lost.length,'alert']
 ].map(x=><div className="surface card" key={x[0]}><Icon name={x[2]} size={24}/><h2>{x[1]}</h2><p className="muted">{x[0]}</p></div>)}
 </div>
 <div className="grid grid-2" style={{marginTop:20}}>
 <section className="surface card stack"><h2>Favourite Route</h2><div className="row"><input className="input" value={fav} onChange={e=>setFav(e.target.value)} placeholder="Example: Main Gate → Library"/><button className="btn btn-primary" onClick={addFav}>Save</button></div>{data.favourites.map(f=><p key={f.id}>{f.route} <button className="btn btn-ghost" onClick={()=>save({...data,favourites:data.favourites.filter(x=>x.id!==f.id)})}>Delete</button></p>)}</section>
 <section className="surface card stack"><h2>Student Actions</h2><button className="btn btn-primary" onClick={feedback}>Submit trip feedback</button><button className="btn btn-ghost" onClick={addLost}>Create Lost & Found report</button><button className="btn btn-ghost" onClick={()=>alert('Emergency contact feature ready for backend integration')}>Emergency Help</button></section>
 </div></>
}
