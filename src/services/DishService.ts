/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface DishRequest {
  tourId?: number;
  dishName?: string;
  dishDescription?: string;
  isPrimary?: boolean;
  dishType?: "VEGETARIAN" | "NORMAL";
  dishStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
  createdAt?: string;
  imageId?: number;
}

export interface DishResponse {
  tourId?: number;
  dishId?: number;
  dishName?: string;
  dishDescription?: string;
  isPrimary?: boolean;
  dishType?: "VEGETARIAN" | "NORMAL";
  dishStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
  createdAt?: string;
}


export const DishService = {
  /**
   * GET /api/dishes/{id}
   */
  getDishById: async (pathParams: { id: number }, queryParams?: { dishStatus?: string }): Promise<DishResponse> => {
    const { data, error } = await apiClient.GET("/api/dishes/{id}" as any, { params: { path: pathParams, query: queryParams } });
    if (error) throw error;
    return data as DishResponse;
  },

  /**
   * PUT /api/dishes/{id}
   */
  updateDish: async (pathParams: { id: number }, body: DishRequest): Promise<DishResponse> => {
    const { data, error } = await apiClient.PUT("/api/dishes/{id}" as any, { params: { path: pathParams }, body: body as any });
    if (error) throw error;
    return data as DishResponse;
  },

  /**
   * DELETE /api/dishes/{id}
   */
  deleteDish: async (pathParams: { id: number }): Promise<string> => {
    const { data, error } = await apiClient.DELETE("/api/dishes/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as string;
  },

  /**
   * GET /api/dishes
   */
  getAllDishes: async (queryParams?: { dishStatus?: string }): Promise<DishResponse[]> => {
    const { data, error } = await apiClient.GET("/api/dishes" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as DishResponse[];
  },

  /**
   * POST /api/dishes
   */
  createDish: async (body: DishRequest): Promise<DishResponse> => {
    const { data, error } = await apiClient.POST("/api/dishes" as any, { body: body as any });
    if (error) throw error;
    return data as DishResponse;
  },

};
