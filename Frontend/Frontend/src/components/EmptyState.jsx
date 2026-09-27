export default function EmptyState({ icon='🚌', title='Nothing here yet', text='There is no data to show right now.', action }) {
  return <div className="surface empty"><div className="empty-inner"><div className="empty-art">{icon}</div><h3>{title}</h3><p className="muted">{text}</p>{action}</div></div>
}
