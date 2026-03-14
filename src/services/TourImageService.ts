/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface TourImageRequest {
  imageId?: number;
  isPrimary?: boolean;
  displayOrder?: number;
  status?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
}

export interface TourImageResponse {
  tourImageId?: number;
  imageId?: number;
  imageUrl?: string;
  isPrimary?: boolean;
  displayOrder?: number;
  status?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
}


export const TourImageService = {
  /**
   * GET /api/tour/{tourId}/images
   */
  getImages: async (pathParams: { tourId: number }): Promise<TourImageResponse[]> => {
    const { data, error } = await apiClient.GET("/api/tour/{tourId}/images" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as TourImageResponse[];
  },

  /**
   * POST /api/tour/{tourId}/images
   */
  addImage: async (pathParams: { tourId: number }, body: TourImageRequest): Promise<TourImageResponse> => {
    const { data, error } = await apiClient.POST("/api/tour/{tourId}/images" as any, { params: { path: pathParams }, body: body as any });
    if (error) throw error;
    return data as TourImageResponse;
  },

  /**
   * PATCH /api/tour/{tourId}/images/{tourImageId}/set-primary
   */
  setPrimary: async (pathParams: { tourId: number, tourImageId: number }): Promise<string> => {
    const { data, error } = await apiClient.PATCH("/api/tour/{tourId}/images/{tourImageId}/set-primary" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as string;
  },

};
