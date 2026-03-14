/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";


export const OnePayService = {
  /**
   * POST /api/onepay/generate-payment-url
   */
  generatePaymentUrl_1: async (body: number): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/onepay/generate-payment-url" as any, { body: body as any });
    if (error) throw error;
    return data as string;
  },

  /**
   * GET /api/onepay/result
   */
  handleCallback: async (queryParams?: { params: any }): Promise<string> => {
    const { data, error } = await apiClient.GET("/api/onepay/result" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as string;
  },

};
