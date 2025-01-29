export interface Email {
  id: string;
  from: string;
  to?: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  category: string;
  starred: boolean;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}