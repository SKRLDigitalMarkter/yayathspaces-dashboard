export type LeadSource = "website" | "meta_ads" | "google_ads";

export type WorkspaceType = "Hot Desk" | "Dedicated Desk" | "Private Cabin" | "Managed Office" | "Meeting Room" | "Event Space";

export type Proposal = {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  selectedWorkspaces: {
    type: WorkspaceType;
    quantity: number;
    customPrice?: string;
  }[];
  totalAmount: string;
  status: "draft" | "sent" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
};

export type Lead = {
  id: string;
  source: LeadSource;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  campaign?: string;
  status?: string;
};

export type SyncStatus = {
  source: LeadSource;
  label: string;
  lastSuccess: string | null;
  error: string | null;
};
