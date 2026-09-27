const map = {
  ACTIVE:'success', CONFIRMED:'success', BOARDED:'success', SCHEDULED:'info',
  WAITLISTED:'warn', MAINTENANCE:'warn', CANCELLED:'danger', COMPLETED:'info', INACTIVE:'danger'
}
export default function StatusBadge({ value }) { return <span className={`badge ${map[value]||''}`}>{String(value||'UNKNOWN').replaceAll('_',' ')}</span> }
