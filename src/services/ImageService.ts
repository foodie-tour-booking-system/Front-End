/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface ImageResponse {
  imageId?: number;
  imageUrl?: string;
  imageDescription?: string;
  imageStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
  createdAt?: string;
  updatedAt?: string;
}


export const ImageService = {
  /**
   * POST /api/images/upload
   */
  uploadImage: async (body: FormData, queryParams?: { description?: string }): Promise<ImageResponse> => {
    const { data, error } = await apiClient.POST("/api/images/upload" as any, { body: body as any, params: { query: queryParams } });
    if (error) throw error;
    return data as ImageResponse;
  },

  /**
   * GET /api/images
   */
  getImage: async (queryParams?: { imageStatus?: string }): Promise<ImageResponse[]> => {
    const { data, error } = await apiClient.GET("/api/images" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as ImageResponse[];
  },

  /**
   * GET /api/images/{id}
   */
  getImageById: async (pathParams: { id: number }): Promise<ImageResponse> => {
    const { data, error } = await apiClient.GET("/api/images/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as ImageResponse;
  },

};
