import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../components/Logo'
import Icon from '../components/Icon'
import ThemeToggle from '../components/ThemeToggle'
import { useAuth } from '../context/AuthContext'

const roleLinks = {
  STUDENT:[['/student','home','Dashboard',true],['/student/trips','route','Browse trips'],['/student/reservations','ticket','My reservations'],['/student/live','map','Live tracking'],['/student/notifications','bell','Notifications'],['/student/tools','settings','Student tools'],['/student/seats','bus','Seat reservation'],['/student/history','clock','Trip history'],['/student/seat-map','bus','Bus seat map'],['/student/qr','ticket','QR boarding'],['/student/analytics','chart','Travel analytics'],['/student/profile','user','Profile']],
  ADMIN:[['/admin','home','Dashboard',true],['/admin/buses','bus','Buses'],['/admin/routes','route','Routes'],['/admin/trips','clock','Trips'],['/admin/reservations','ticket','Reservations'],['/admin/live','map','Live operations'],['/admin/analytics','chart','Analytics'],['/admin/profile','user','Profile']],
  DRIVER:[['/driver','home','Dashboard',true],['/driver/trip','route','Assigned trip'],['/driver/tracking','location','GPS simulator'],['/driver/history','clock','Trip history'],['/driver/profile','user','Profile']]
}

export default function AppLayout() {
  const {user,logout}=useAuth(); const navigate=useNavigate(); const [open,setOpen]=useState(false)
  const links=roleLinks[user.role]||[]
  const signout=()=>{logout();navigate('/')}
  return <div className="app-shell">
    <div className={`sidebar-overlay ${open?'open':''}`} onClick={()=>setOpen(false)}/>
    <aside className={`sidebar ${open?'open':''}`}><div className="sidebar-head"><Logo to={`/${user.role.toLowerCase()}`}/><button className="btn btn-ghost icon-only mobile-sidebar-trigger" onClick={()=>setOpen(false)}><Icon name="close"/></button></div>
      <nav className="sidebar-nav">{links.map(([to,icon,label,end])=><NavLink key={to} to={to} end={!!end} onClick={()=>setOpen(false)} className={({isActive})=>`sidebar-link ${isActive?'active':''}`}><Icon name={icon} size={19}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-foot"><div className="user-chip"><div className="row"><div className="avatar">{user.name?.slice(0,1)?.toUpperCase()||'U'}</div><div style={{minWidth:0}}><strong style={{display:'block',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{user.name}</strong><span className="muted small">{user.role}</span></div></div></div><button className="btn btn-ghost" style={{width:'100%',marginTop:10}} onClick={signout}><Icon name="logout" size={18}/> Sign out</button></div>
    </aside>
    <main className="app-main"><div className="app-topbar"><div className="app-topbar-inner"><div className="row"><button className="btn btn-ghost icon-only mobile-sidebar-trigger" onClick={()=>setOpen(true)}><Icon name="menu"/></button><span className="muted small">Smart campus mobility</span></div><ThemeToggle compact/></div></div><div className="app-content"><Outlet/></div></main>
  </div>
}
