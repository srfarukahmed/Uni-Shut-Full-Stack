import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)
let seq = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const notify = useCallback((message, type = 'info') => {
    const id = ++seq
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200)
  }, [])
  return <ToastContext.Provider value={{ notify }}>
    {children}
    <div className="toast-stack" aria-live="polite">
      {toasts.map(t => <div className="toast" key={t.id}><strong>{t.type === 'success' ? '✓' : t.type === 'error' ? '!' : '•'}</strong><span>{t.message}</span></div>)}
    </div>
  </ToastContext.Provider>
}
export const useToast = () => useContext(ToastContext)
