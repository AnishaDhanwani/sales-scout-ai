export type LeadStatus = "hot" | "warm" | "cold" | "unqualified";

export type NextAction = "follow-up-call" | "send-email" | "nurture-campaign" | "discard" | "schedule-demo";

export interface Interaction {
  type: "email" | "call" | "chat" | "website";
  date: string;
  summary: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  companySize: string;
  industry: string;
  score: number;
  status: LeadStatus;
  reasoning: string;
  nextAction: NextAction;
  nextActionNote: string;
  interactions: Interaction[];
  dealValue: number;
  lastActivity: string;
  source: string;
}
