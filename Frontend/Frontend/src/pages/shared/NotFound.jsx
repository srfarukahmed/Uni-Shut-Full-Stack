import { Link } from 'react-router-dom'
import EmptyState from '../../components/EmptyState'
export default function NotFound(){return <div className="container section"><EmptyState icon="🧭" title="Page not found" text="The page you tried to open does not exist or may have moved." action={<Link className="btn btn-primary" to="/">Return home</Link>}/></div>}
