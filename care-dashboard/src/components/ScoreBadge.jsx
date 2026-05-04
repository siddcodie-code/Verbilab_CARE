export default function ScoreBadge({ score, max = 20 }) {
  const pct = (score / max) * 100
  let color, label

  if (pct >= 90) { color = 'emerald'; label = 'Excellent' }
  else if (pct >= 70) { color = 'cyan'; label = 'Good' }
  else if (pct >= 40) { color = 'amber'; label = 'Needs Work' }
  else { color = 'rose'; label = 'Poor' }

  const colorMap = {
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
  }

  return (
    <span className={`badge border ${colorMap[color]} font-mono`}>
      {score}/{max} · {label}
    </span>
  )
}
