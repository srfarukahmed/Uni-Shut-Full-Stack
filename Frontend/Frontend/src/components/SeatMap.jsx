import { useMemo } from 'react'

export default function SeatMap({capacity=42, selected, onSelect, occupied=[]}){
 const seats=useMemo(()=>Array.from({length:capacity},(_,i)=>`S-${i+1}`),[capacity])
 return <div className="surface card stack">
  <div className="row-between"><strong>Select your seat</strong><span className="muted small">Green = available • Gray = occupied</span></div>
  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginTop:14}}>
   {seats.map(s=>{
    const busy=occupied.includes(s)
    return <button key={s} disabled={busy} onClick={()=>onSelect(s)} className="btn" style={{padding:'10px 6px',background:selected===s?'#4f6df5':busy?'#d9dde8':'transparent',color:selected===s?'white':busy?'#596070':'inherit',border:'1px solid #d5daf0'}}>{s}</button>
   })}
  </div>
 </div>
}
