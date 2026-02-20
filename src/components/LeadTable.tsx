import { Lead } from "@/types/lead";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { ScoreRing } from "./ScoreRing";
import { cn } from "@/lib/utils";
import { Building2, Mail, Calendar } from "lucide-react";

interface LeadTableProps {
  leads: Lead[];
  selectedId: string | null;
  onSelect: (lead: Lead) => void;
}

const actionLabels: Record<string, string> = {
  "follow-up-call": "📞 Follow-up Call",
  "send-email": "✉️ Send Email",
  "nurture-campaign": "🌱 Nurture",
  "schedule-demo": "🎯 Schedule Demo",
  "discard": "🗑️ Discard",
};

export function LeadTable({ leads, selectedId, onSelect }: LeadTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lead</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Score</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Next Action</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr
              key={lead.id}
              onClick={() => onSelect(lead)}
              className={cn(
                "cursor-pointer border-b border-border transition-colors hover:bg-muted/40 animate-fade-in",
                selectedId === lead.id && "bg-primary/5 hover:bg-primary/5"
              )}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-foreground">{lead.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />{lead.email}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{lead.company}</p>
                    <p className="text-xs text-muted-foreground">{lead.industry}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center">
                  <ScoreRing score={lead.score} />
                </div>
              </td>
              <td className="px-4 py-3">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3 hidden lg:table-cell">
                <span className="text-sm">{actionLabels[lead.nextAction]}</span>
              </td>
              <td className="px-4 py-3 hidden md:table-cell">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />{lead.lastActivity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {leads.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">No leads match your filters.</div>
      )}
    </div>
  );
}
