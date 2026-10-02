export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

export type Session = {
  id: string;
  messages: Message[];
};
