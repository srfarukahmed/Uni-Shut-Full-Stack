import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'

export default function PublicLayout() {
  const [open,setOpen]=useState(false); const {user}=useAuth()
  const dash=user?`/${user.role.toLowerCase()}`:'/login'
  return <>
    <header className="public-nav"><div className="container nav-inner"><Logo/>
      <nav className="nav-links" aria-label="Primary"><a href="/#features">Features</a><a href="/#workflow">How it works</a><a href="/#roles">Roles</a><a href="/#about">About</a></nav>
      <div className="nav-actions"><ThemeToggle compact/><Link className="btn btn-ghost hide-mobile" to="/login">Sign in</Link><Link className="btn btn-primary hide-mobile" to={dash}>{user?'Dashboard':'Get started'}</Link><button className="btn btn-ghost icon-only mobile-menu-btn" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu"><Icon name={open?'close':'menu'}/></button></div>
    </div></header>
    {open&&<div className="mobile-public-menu container surface"><a href="/#features" onClick={()=>setOpen(false)}>Features</a><a href="/#workflow" onClick={()=>setOpen(false)}>How it works</a><a href="/#roles" onClick={()=>setOpen(false)}>Roles</a><Link to="/login" onClick={()=>setOpen(false)}>Sign in</Link><Link to={dash} onClick={()=>setOpen(false)}>Get started</Link></div>}
    <Outlet/>
  </>
}
