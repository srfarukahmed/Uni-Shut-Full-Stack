import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

export default function BackButton({ fallback='/' }) {
  const navigate=useNavigate()
  return <button className="btn btn-ghost back-btn" onClick={()=>window.history.length>1?navigate(-1):navigate(fallback)}><Icon name="arrowLeft" size={18}/> Back</button>
}
