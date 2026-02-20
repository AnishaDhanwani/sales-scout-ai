import { useState, useMemo } from "react";
import { mockLeads } from "@/data/mockLeads";
import { Lead, LeadStatus } from "@/types/lead";
import { LeadTable } from "@/components/LeadTable";
import { LeadDetail } from "@/components/LeadDetail";
import { StatsBar } from "@/components/StatsBar";
import { Sparkles, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const filters: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All Leads" },
  { value: "hot", label: "🔥 Hot" },
  { value: "warm", label: "🌡️ Warm" },
  { value: "cold", label: "❄️ Cold" },
  { value: "unqualified", label: "🚫 Not Qualified" },
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<LeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");

  const filteredLeads = useMemo(() => {
    return mockLeads
      .filter(l => activeFilter === "all" || l.status === activeFilter)
      .filter(l =>
        !search ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.company.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.score - a.score);
  }, [activeFilter, search]);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">LeadAI</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Lead Qualification</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 rounded-lg border border-border bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        <div className={cn("flex-1 overflow-y-auto p-6 space-y-5", selectedLead && "hidden lg:block")}>
          <StatsBar leads={mockLeads} />

          {/* Filters */}
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  activeFilter === f.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <LeadTable
            leads={filteredLeads}
            selectedId={selectedLead?.id ?? null}
            onSelect={setSelectedLead}
          />
        </div>

        {/* Detail Panel */}
        {selectedLead && (
          <div className="w-full lg:w-[400px] xl:w-[440px]">
            <LeadDetail lead={selectedLead} onClose={() => setSelectedLead(null)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
