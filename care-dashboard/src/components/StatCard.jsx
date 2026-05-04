import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const colorMap = {
  cyan: {
    icon: 'text-cyan-400',
    iconBg: 'bg-cyan-400/10',
    glow: 'hover:shadow-cyan-500/10',
    value: 'text-cyan-400',
  },
  emerald: {
    icon: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
    glow: 'hover:shadow-emerald-500/10',
    value: 'text-emerald-400',
  },
  amber: {
    icon: 'text-amber-400',
    iconBg: 'bg-amber-400/10',
    glow: 'hover:shadow-amber-500/10',
    value: 'text-amber-400',
  },
  rose: {
    icon: 'text-rose-400',
    iconBg: 'bg-rose-400/10',
    glow: 'hover:shadow-rose-500/10',
    value: 'text-rose-400',
  },
  slate: {
    icon: 'text-slate-400',
    iconBg: 'bg-slate-400/10',
    glow: '',
    value: 'text-slate-200',
  },
}

export default function StatCard({ icon: Icon, label, value, change, changeLabel, color = 'cyan', suffix = '' }) {
  const colors = colorMap[color] || colorMap.cyan
  const isPositive = change > 0
  const isNeutral = change === 0

  return (
    <div className={`stat-card hover:shadow-lg ${colors.glow} animate-fade-in`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            isNeutral
              ? 'bg-slate-700/50 text-slate-400'
              : isPositive
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-rose-500/10 text-rose-400'
          }`}>
            {isNeutral ? (
              <Minus className="w-3 h-3" />
            ) : isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>

      <div>
        <p className={`text-2xl font-display font-bold ${colors.value} leading-none`}>
          {value}{suffix}
        </p>
        <p className="text-sm text-slate-400 mt-1.5 font-medium">{label}</p>
        {changeLabel && (
          <p className="text-xs text-slate-500 mt-1">{changeLabel}</p>
        )}
      </div>
    </div>
  )
}
