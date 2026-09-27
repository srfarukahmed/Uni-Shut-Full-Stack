import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function Logo({ to='/' }) {
  return <Link to={to} className="brand"><span className="brand-mark"><Icon name="bus" size={22}/></span><span>uni<span>Shut</span></span></Link>
}
