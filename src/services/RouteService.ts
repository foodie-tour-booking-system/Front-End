/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface RouteDetailRequest {
  routeDetailId?: number;
  locationName?: string;
  locationOrder?: number;
  durationAtLocation?: number;
  routeDetailStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
  imageUrls?: string[];
}

export interface RouteRequest {
  routeName?: string;
  routeStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
  tourId?: number;
  routeDetails?: RouteDetailRequest[];
}

export interface RouteResponse {
  routeId?: number;
  tourId?: number;
  routeName?: string;
  routeDetails?: RouteDetailRequest[];
  createdAt?: string;
  updatedAt?: string;
}

export interface RouteDetailImage {
  imageId?: number;
  imageUrl?: string;
  createdAt?: string;
}

export interface RouteDetailResponse {
  routeDetailId?: number;
  locationName?: string;
  locationOrder?: number;
  durationAtLocation?: number;
  routeDetailStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
  imageUrls?: string[];
  images?: RouteDetailImage[];
}

export const RouteService = {
  /**
   * GET /api/routes/{id}
   */
  getRouteById: async (pathParams: { id: number }, queryParams?: { routeStatus?: string }): Promise<RouteResponse> => {
    const { data, error } = await apiClient.GET("/api/routes/{id}" as any, { params: { path: pathParams, query: queryParams } });
    if (error) throw error;
    return data as RouteResponse;
  },

  /**
   * PUT /api/routes/{id}
   */
  updateRoute: async (pathParams: { id: number }, body: RouteRequest): Promise<RouteResponse> => {
    const { data, error } = await apiClient.PUT("/api/routes/{id}" as any, { params: { path: pathParams }, body: body as any });
    if (error) throw error;
    return data as RouteResponse;
  },

  /**
   * GET /api/routes
   */
  getAllRoutes: async (queryParams?: { routeStatus?: string }): Promise<RouteResponse[]> => {
    const { data, error } = await apiClient.GET("/api/routes" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as RouteResponse[];
  },

  /**
   * POST /api/routes
   */
  createRoute: async (body: RouteRequest): Promise<RouteResponse> => {
    const { data, error } = await apiClient.POST("/api/routes" as any, { body: body as any });
    if (error) throw error;
    return data as RouteResponse;
  },

  /**
   * GET /api/routes/tour/{tourId}
   */
  getRouteByTourId: async (pathParams: { tourId: number }, queryParams?: { routeStatus?: string }): Promise<RouteResponse[]> => {
    const { data, error } = await apiClient.GET("/api/routes/tour/{tourId}" as any, { params: { path: pathParams, query: queryParams } });
    if (error) throw error;
    return data as RouteResponse[];
  },

  /**
   * POST /api/routes/details/{routeDetailId}/images/upload
   */
  uploadRouteDetailImages: async (pathParams: { routeDetailId: number }, files: File[]): Promise<RouteDetailResponse> => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1];
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/routes/details/${pathParams.routeDetailId}/images/upload`,
      {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      }
    );
    if (!res.ok) {
      const msg = await res.text().catch(() => "Upload failed");
      throw new Error(msg);
    }
    return res.json() as Promise<RouteDetailResponse>;
  },

  /**
   * GET /api/routes/details/{routeDetailId}
   */
  getRouteDetail: async (pathParams: { routeDetailId: number }): Promise<RouteDetailResponse> => {
    const { data, error } = await apiClient.GET("/api/routes/details/{routeDetailId}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as RouteDetailResponse;
  },

};
