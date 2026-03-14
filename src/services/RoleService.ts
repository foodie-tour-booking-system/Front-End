/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface CustomRolePermissionRequest {
  permissionIds: number[];
}

export interface PermissionDto {
  permissionId?: number;
  name?: string;
}

export interface RoleCreateRequest {
  name: string;
}

export interface RoleResponse {
  roleId?: number;
  name?: string;
  status?: "ACTIVE" | "INACTIVE" | "DELETED";
  permissionDtoList?: PermissionDto[];
}


export const RoleService = {
  /**
   * PUT /api/role/{id}/permissions
   */
  customRolePermission: async (pathParams: { id: number }, body: CustomRolePermissionRequest): Promise<RoleResponse> => {
    const { data, error } = await apiClient.PUT("/api/role/{id}/permissions" as any, { params: { path: pathParams }, body: body as any });
    if (error) throw error;
    return data as RoleResponse;
  },

  /**
   * GET /api/role
   */
  getAll: async (queryParams?: { status?: string }): Promise<RoleResponse[]> => {
    const { data, error } = await apiClient.GET("/api/role" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as RoleResponse[];
  },

  /**
   * POST /api/role
   */
  create: async (body: RoleCreateRequest): Promise<RoleResponse> => {
    const { data, error } = await apiClient.POST("/api/role" as any, { body: body as any });
    if (error) throw error;
    return data as RoleResponse;
  },

  /**
   * GET /api/role/{id}
   */
  getById_1: async (pathParams: { id: number }): Promise<RoleResponse> => {
    const { data, error } = await apiClient.GET("/api/role/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as RoleResponse;
  },

  /**
   * DELETE /api/role/{id}
   */
  delete: async (pathParams: { id: number }): Promise<string> => {
    const { data, error } = await apiClient.DELETE("/api/role/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as string;
  },

};
