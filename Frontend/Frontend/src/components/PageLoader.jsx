import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageLoader(){
  const location = useLocation()
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    setLoading(true)
    const timer=setTimeout(()=>setLoading(false),450)
    return ()=>clearTimeout(timer)
  },[location.pathname])

  if(!loading) return null

  return <div className="page-loader" aria-label="Loading">
    <div className="loader-bubble">
      <span></span><span></span><span></span>
    </div>
    <p>Loading uniShut...</p>
  </div>
}
