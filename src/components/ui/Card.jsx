const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-xl border bg-white dark:bg-slate-900 
      border-slate-200 dark:border-slate-800 
      shadow-sm transition ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
