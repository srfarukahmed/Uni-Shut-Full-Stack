import { Link } from 'react-router-dom'
import Icon from './Icon'
import StatusBadge from './StatusBadge'
import { formatDateTime } from '../utils/format'

export default function TripCard({ trip, route, bus, actionTo }) {
  const capacity=bus?.capacity||0, left=Math.max(0,capacity-(trip?.reserved||0)), pct=capacity?Math.min(100,Math.round((trip.reserved/capacity)*100)):0
  return <article className="surface card card-hover trip-card">
    <div className="row-between"><div className="row"><div className="icon-box"><Icon name="route"/></div><div><strong>{route?.name||'Unknown route'}</strong><div className="muted small">{bus?.number||'Unassigned bus'}</div></div></div><StatusBadge value={trip.status}/></div>
    <div className="trip-meta"><span><Icon name="clock" size={16}/>{formatDateTime(trip.startTime)}</span><span><Icon name="users" size={16}/>{left} seats left</span></div>
    <div className="capacity"><div className="row-between small"><span>Seat capacity</span><span>{trip.reserved}/{capacity}</span></div><div className="capacity-track"><span style={{width:`${pct}%`}}/></div></div>
    <div className="row-between"><span className="muted small">{trip.waitlisted?`${trip.waitlisted} in waiting list`:'No waiting list'}</span>{actionTo&&<Link className="btn btn-soft" to={actionTo}>View <Icon name="arrowRight" size={16}/></Link>}</div>
  </article>
}
