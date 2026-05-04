export default function Card({ children, className = '', hover = true }) {
  return (
    <div className={`glass-card rounded-xl ${hover ? 'hover:border-slate-700/80 transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  )
}
