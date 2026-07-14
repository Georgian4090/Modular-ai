export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  isStreaming?: boolean;
}

export interface Session {
  id: string;
  messages: Message[];
}
