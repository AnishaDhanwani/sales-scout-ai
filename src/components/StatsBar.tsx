import { Lead } from "@/types/lead";
import { Flame, Thermometer, Snowflake, Ban, TrendingUp } from "lucide-react";

export function StatsBar({ leads }: { leads: Lead[] }) {
  const hot = leads.filter(l => l.status === "hot").length;
  const warm = leads.filter(l => l.status === "warm").length;
  const cold = leads.filter(l => l.status === "cold").length;
  const unq = leads.filter(l => l.status === "unqualified").length;
  const avgScore = Math.round(leads.reduce((s, l) => s + l.score, 0) / (leads.length || 1));
  const totalValue = leads.reduce((s, l) => s + l.dealValue, 0);

  const stats = [
    { label: "Hot Leads", value: hot, icon: Flame, color: "text-lead-hot" },
    { label: "Warm Leads", value: warm, icon: Thermometer, color: "text-lead-warm" },
    { label: "Cold Leads", value: cold, icon: Snowflake, color: "text-lead-cold" },
    { label: "Unqualified", value: unq, icon: Ban, color: "text-lead-unqualified" },
    { label: "Avg Score", value: avgScore, icon: TrendingUp, color: "text-primary" },
    { label: "Pipeline", value: `$${(totalValue / 1000).toFixed(0)}k`, icon: TrendingUp, color: "text-score-high" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}
