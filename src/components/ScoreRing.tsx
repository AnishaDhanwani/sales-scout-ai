import { cn } from "@/lib/utils";

export function ScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const colorClass = score >= 70 ? "text-score-high" : score >= 40 ? "text-score-mid" : "text-score-low";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={3} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("transition-all duration-700", colorClass)}
        />
      </svg>
      <span className={cn("absolute text-xs font-bold", colorClass)}>{score}</span>
    </div>
  );
}
