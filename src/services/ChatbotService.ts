import { apiClient } from "../lib/apiClient";

export interface ChatBotRequest {
  conversationId: string | null;
  prompt: string;
}

export interface ChatBotResponse {
  content: string;
}

export const ChatbotService = {
  createNewConversation: async (): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/rag-chat" as any);
    if (error) throw error;
    // Tùy thuộc vào kết quả trả về, API Client sẽ extract theo text() nếu backend k set json
    return data as string;
  },

  chat: async (body: ChatBotRequest): Promise<ChatBotResponse> => {
    const { data, error } = await apiClient.POST("/api/rag-chat/prompt" as any, { 
      body: body as any 
    });
    if (error) throw error;
    return data as ChatBotResponse;
  }
};
