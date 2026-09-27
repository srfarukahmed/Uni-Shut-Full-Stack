import BackButton from './BackButton'

export default function PageHeader({ eyebrow, title, description, back=false, actions }) {
  return <div className="page-head">
    <div className="stack" style={{gap:8}}>
      {back && <div><BackButton/></div>}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 className="page-title">{title}</h1>
      {description && <p className="subtitle">{description}</p>}
    </div>
    {actions && <div className="page-actions">{actions}</div>}
  </div>
}
