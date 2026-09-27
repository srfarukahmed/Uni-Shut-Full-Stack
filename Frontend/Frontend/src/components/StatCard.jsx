import Icon from './Icon'
export default function StatCard({ icon='stats', label, value, note }) {
  return <div className="surface kpi"><div className="icon-box"><Icon name={icon}/></div><div><span className="muted small">{label}</span><strong>{value}</strong>{note&&<span className="muted small">{note}</span>}</div></div>
}
