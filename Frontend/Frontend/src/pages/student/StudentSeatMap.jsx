import {useState} from 'react'
import {useToast} from '../../context/ToastContext'
const seats=Array.from({length:32},(_,i)=>`S-${i+1}`)
export default function StudentSeatMap(){
 const [selected,setSelected]=useState('S-1'); const {toast}=useToast?.()||{}
 const [reserved,setReserved]=useState(['S-2','S-7','S-18'])
 const book=()=>{setReserved(r=>[...r,selected]); toast?.('Seat reserved successfully')}
 return <div className="page"><h1>🚌 Smart Seat Booking</h1><p className="muted">Choose your preferred bus seat before confirming reservation.</p>
 <div className="card" style={{maxWidth:700}}><div className="grid" style={{gridTemplateColumns:'repeat(4,1fr)',display:'grid',gap:12}}>{seats.map(s=><button disabled={reserved.includes(s)} onClick={()=>setSelected(s)} className={'btn '+(selected===s?'btn-primary':'btn-ghost')} key={s}>{s}</button>)}</div><hr/><h3>Selected: {selected}</h3><button className="btn btn-primary" onClick={book} disabled={reserved.includes(selected)}>Confirm Seat</button></div></div>
}
