/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface FeedbackRequest {
  bookingCode?: string;
  email?: string;
  title?: string;
  description?: string;
  rating?: number;
  createdAt?: string;
}

export interface FeedbackResponse {
  feedbackId?: number;
  tourId?: number;
  customerName?: string;
  description?: string;
  rating?: number;
  feedbackStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
  createdAt?: string;
  departureAt?: string;
}

export interface FeedbackSummaryResponse {
  averageRating?: number;
  totalReviews?: number;
  reviews?: FeedbackResponse[];
}


export const FeedbackService = {
  /**
   * PUT /api/feedback/{id}
   */
  updateFeedback: async (pathParams: { id: number }, body: FormData): Promise<FeedbackResponse> => {
    const { data, error } = await apiClient.PUT("/api/feedback/{id}" as any, { body: body as any, params: { path: pathParams } });
    if (error) throw error;
    return data as FeedbackResponse;
  },

  /**
   * DELETE /api/feedback/{id}
   */
  deleteFeedback: async (pathParams: { id: number }): Promise<string> => {
    const { data, error } = await apiClient.DELETE("/api/feedback/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as string;
  },

  /**
   * POST /api/feedback
   */
  createFeedback: async (body: FormData): Promise<FeedbackResponse> => {
    const { data, error } = await apiClient.POST("/api/feedback" as any, { body: body as any });
    if (error) throw error;
    return data as FeedbackResponse;
  },

  /**
   * GET /api/feedback/tour/{tourId}
   */
  getFeedback: async (pathParams: { tourId: number }): Promise<FeedbackSummaryResponse> => {
    const { data, error } = await apiClient.GET("/api/feedback/tour/{tourId}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as FeedbackSummaryResponse;
  },

};
