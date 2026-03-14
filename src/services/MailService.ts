/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface SendMailRequest {
  to?: string[];
  subject?: string;
  content?: string;
}


export const MailService = {
  /**
   * POST /api/mail/send
   */
  sendMail: async (body: SendMailRequest): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/mail/send" as any, { body: body as any });
    if (error) throw error;
    return data as string;
  },

};
