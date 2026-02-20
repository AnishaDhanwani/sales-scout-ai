import { Lead } from "@/types/lead";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { ScoreRing } from "./ScoreRing";
import { X, Mail, Phone, MessageSquare, Globe, DollarSign, Users, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const interactionIcons = {
  email: Mail,
  call: Phone,
  chat: MessageSquare,
  website: Globe,
};

const actionConfig: Record<string, { label: string; icon: React.ElementType; variant: "default" | "secondary" }> = {
  "follow-up-call": { label: "Follow-up Call", icon: Phone, variant: "default" },
  "send-email": { label: "Send Email", icon: Mail, variant: "default" },
  "nurture-campaign": { label: "Start Nurture", icon: ArrowRight, variant: "secondary" },
  "schedule-demo": { label: "Schedule Demo", icon: Sparkles, variant: "default" },
  "discard": { label: "Discard Lead", icon: X, variant: "secondary" },
};

export function LeadDetail({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const action = actionConfig[lead.nextAction];

  return (
    <div className="animate-slide-in-right flex h-full flex-col overflow-y-auto border-l border-border bg-card">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border p-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">{lead.name}</h2>
          <p className="text-sm text-muted-foreground">{lead.title} at {lead.company}</p>
        </div>
        <button onClick={onClose} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-5 p-5">
        {/* Score & Status */}
        <div className="flex items-center gap-4">
          <ScoreRing score={lead.score} size={56} />
          <div>
            <LeadStatusBadge status={lead.status} size="lg" />
            <p className="mt-1 text-xs text-muted-foreground">Lead Score</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: DollarSign, label: "Deal Value", value: `$${lead.dealValue.toLocaleString()}` },
            { icon: Users, label: "Company Size", value: lead.companySize },
            { icon: Briefcase, label: "Industry", value: lead.industry },
            { icon: Globe, label: "Source", value: lead.source },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="h-3 w-3" />{label}
              </div>
              <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* AI Reasoning */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />AI Analysis
          </div>
          <p className="text-sm leading-relaxed text-foreground">{lead.reasoning}</p>
        </div>

        {/* Suggested Action */}
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Suggested Next Action</h3>
          <div className="rounded-lg border border-border p-3">
            <Button variant={action.variant} className="mb-2 w-full gap-2">
              <action.icon className="h-4 w-4" />{action.label}
            </Button>
            <p className="text-xs text-muted-foreground">{lead.nextActionNote}</p>
          </div>
        </div>

        {/* Interaction Timeline */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interaction History</h3>
          <div className="space-y-3">
            {lead.interactions.map((interaction, i) => {
              const Icon = interactionIcons[interaction.type];
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    {i < lead.interactions.length - 1 && <div className="mt-1 h-full w-px bg-border" />}
                  </div>
                  <div className="pb-3">
                    <p className="text-xs font-medium text-muted-foreground">{interaction.date}</p>
                    <p className="text-sm text-foreground">{interaction.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
