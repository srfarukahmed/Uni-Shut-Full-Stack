import { useEffect } from 'react'
import Icon from './Icon'

export default function Modal({ open, title, children, onClose, footer }) {
  useEffect(()=>{
    if(!open) return
    const fn=e=>e.key==='Escape'&&onClose?.()
    document.addEventListener('keydown',fn)
    const old=document.body.style.overflow; document.body.style.overflow='hidden'
    return ()=>{document.removeEventListener('keydown',fn);document.body.style.overflow=old}
  },[open,onClose])
  if(!open) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onClose?.()}>
    <div className="surface modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="row-between"><h2 style={{margin:0}}>{title}</h2><button className="btn btn-ghost icon-only" onClick={onClose} aria-label="Close"><Icon name="close"/></button></div>
      <div className="divider" style={{margin:'16px 0'}}/>
      {children}
      {footer && <><div className="divider" style={{margin:'18px 0'}}/><div className="row" style={{justifyContent:'flex-end',flexWrap:'wrap'}}>{footer}</div></>}
    </div>
  </div>
}
