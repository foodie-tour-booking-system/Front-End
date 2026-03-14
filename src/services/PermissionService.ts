/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface PermissionCreateRequest {
  name: string;
  description: string;
}

export interface PermissionResponse {
  permissionId?: number;
  name?: string;
  description?: string;
  status?: "ACTIVE" | "DISABLE" | "DELETED";
}


export const PermissionService = {
  /**
   * GET /api/permission
   */
  getAll_1: async (queryParams?: { status?: string }): Promise<PermissionResponse[]> => {
    const { data, error } = await apiClient.GET("/api/permission" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as PermissionResponse[];
  },

  /**
   * POST /api/permission
   */
  create_1: async (body: PermissionCreateRequest): Promise<PermissionResponse> => {
    const { data, error } = await apiClient.POST("/api/permission" as any, { body: body as any });
    if (error) throw error;
    return data as PermissionResponse;
  },

  /**
   * GET /api/permission/{id}
   */
  getById_2: async (pathParams: { id: number }): Promise<PermissionResponse> => {
    const { data, error } = await apiClient.GET("/api/permission/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as PermissionResponse;
  },

  /**
   * DELETE /api/permission/{id}
   */
  delete_1: async (pathParams: { id: number }): Promise<string> => {
    const { data, error } = await apiClient.DELETE("/api/permission/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as string;
  },

};
