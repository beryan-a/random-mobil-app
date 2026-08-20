export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface SendMessageResponse {
  success: boolean;
  data?: {
    response: string;
    success: boolean;
  };
  error?: string;
}
