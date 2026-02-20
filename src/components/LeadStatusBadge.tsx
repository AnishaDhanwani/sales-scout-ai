import { LeadStatus } from "@/types/lead";
import { cn } from "@/lib/utils";
import { Flame, Thermometer, Snowflake, Ban } from "lucide-react";

const config: Record<LeadStatus, { label: string; className: string; icon: React.ElementType }> = {
  hot: { label: "Hot", className: "lead-hot", icon: Flame },
  warm: { label: "Warm", className: "lead-warm", icon: Thermometer },
  cold: { label: "Cold", className: "lead-cold", icon: Snowflake },
  unqualified: { label: "Not Qualified", className: "lead-unqualified", icon: Ban },
};

export function LeadStatusBadge({ status, size = "sm" }: { status: LeadStatus; size?: "sm" | "lg" }) {
  const { label, className, icon: Icon } = config[status];
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-semibold",
      size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
      className
    )}>
      <Icon className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      {label}
    </span>
  );
}
