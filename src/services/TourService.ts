/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface PageTourResponse {
  totalElements?: number;
  totalPages?: number;
  first?: boolean;
  last?: boolean;
  size?: number;
  content?: TourResponse[];
  number?: number;
  sort?: Sortnull;
  numberOfElements?: number;
  pageable?: Pageablenull;
  empty?: boolean;
}

export interface Pageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface Pageablenull {
  offset?: number;
  sort?: Sortnull;
  paged?: boolean;
  pageSize?: number;
  pageNumber?: number;
  unpaged?: boolean;
}

export interface Sortnull {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}

export interface TourRequest {
  tourName?: string;
  tourDescription?: string;
  groupPriceAdult?: number;
  groupPriceChild?: number;
  privatePriceAdult?: number;
  privatePriceChild?: number;
  duration?: number;
  tourStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
  createdAt?: string;
  updatedAt?: string;
}

export interface TourResponse {
  tourId?: number;
  tourName?: string;
  tourDescription?: string;
  groupPriceAdult?: number;
  groupPriceChild?: number;
  privatePriceAdult?: number;
  privatePriceChild?: number;
  duration?: number;
  tourStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
  createdAt?: string;
  updatedAt?: string;
}


export const TourService = {
  /**
   * PUT /api/tour/{tourId}
   */
  updateTour: async (pathParams: { tourId: number }, body: TourRequest): Promise<TourResponse> => {
    const { data, error } = await apiClient.PUT("/api/tour/{tourId}" as any, { params: { path: pathParams }, body: body as any });
    if (error) throw error;
    return data as TourResponse;
  },

  /**
   * DELETE /api/tour/{tourId}
   */
  deleteTour: async (pathParams: { tourId: number }): Promise<string> => {
    const { data, error } = await apiClient.DELETE("/api/tour/{tourId}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as string;
  },

  /**
   * GET /api/tour
   */
  getAllTours: async (queryParams?: { status?: string }): Promise<TourResponse[]> => {
    const { data, error } = await apiClient.GET("/api/tour" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as TourResponse[];
  },

  /**
   * POST /api/tour
   */
  createTour: async (body: TourRequest): Promise<TourResponse> => {
    const { data, error } = await apiClient.POST("/api/tour" as any, { body: body as any });
    if (error) throw error;
    return data as TourResponse;
  },

  /**
   * GET /api/tour/{id}
   */
  getTourById: async (pathParams: { id: number }): Promise<TourResponse> => {
    const { data, error } = await apiClient.GET("/api/tour/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as TourResponse;
  },

  /**
   * GET /api/tour/search
   */
  searchTour: async (queryParams?: { tourName?: string, status?: string, minPrice?: number, maxPrice?: number, pageable: Pageable }): Promise<PageTourResponse> => {
    const { data, error } = await apiClient.GET("/api/tour/search" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as PageTourResponse;
  },

};
