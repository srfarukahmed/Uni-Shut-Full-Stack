import {useState} from 'react'
import PageHeader from '../../components/PageHeader'
import {useToast} from '../../context/ToastContext'

const seats=Array.from({length:32},(_,i)=>({id:`S-${i+1}`,taken:[2,7,13,21].includes(i+1)}))
export default function SeatReservation(){
 const [selected,setSelected]=useState(null); const {notify}=useToast()
 return <><PageHeader eyebrow="Student" title="Reserve your seat" description="Choose an available seat before confirming your shuttle reservation."/>
 <div className="surface card"><h3>Bus Seat Layout</h3><div className="seat-grid">{seats.map(s=><button key={s.id} disabled={s.taken} className={`seat ${selected===s.id?'selected':''} ${s.taken?'taken':''}`} onClick={()=>setSelected(s.id)}>{s.id}</button>)}</div><button className="btn btn-primary" disabled={!selected} onClick={()=>notify(`Seat ${selected} reserved successfully`,'success')}>Confirm {selected||'seat'}</button></div></>
}
