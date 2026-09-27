import Icon from './Icon'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ compact=false }) {
  const { theme, toggleTheme } = useTheme()
  return <button className="btn btn-ghost theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`} title={`Switch to ${theme==='dark'?'light':'dark'} mode`}>
    <Icon name={theme==='dark'?'sun':'moon'} size={18}/>{!compact && <span>{theme==='dark'?'Light':'Dark'}</span>}
  </button>
}
