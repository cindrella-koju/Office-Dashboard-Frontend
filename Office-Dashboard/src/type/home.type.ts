export interface HomePageResponse {
  username: string;
  role: string;
  total_users: number;
  total_events: number;
  active_events: number;
}

export type StatusEnum = "draft" | "active" | "completed";

export interface HomePageEventResponse {
  id : string;
  title: string;
  description?: string | null;   
  startdate: Date;              
  enddate: Date;
  status: StatusEnum;
}
