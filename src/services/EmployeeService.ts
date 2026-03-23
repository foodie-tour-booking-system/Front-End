/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface EmployeeCreateRequest {
  employeeName: string;
  email: string;
  phone: string;
  roleId: number;
}

export interface EmployeeResponse {
  employeeId?: number;
  roleName?: string;
  employeeName?: string;
  email?: string;
  phone?: string;
  image?: string;
  status?: "ACTIVE" | "INACTIVE" | "DELETED";
}

export interface EmployeeUpdateRequest {
  employeeName: string;
  email: string;
  phone: string;
}

export interface SetPasswordRequest {
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyPasswordRequest {
  password: string;
}


export const EmployeeService = {
  /**
   * GET /api/employee/{id}
   */
  getById: async (pathParams: { id: number }): Promise<EmployeeResponse> => {
    const { data, error } = await apiClient.GET("/api/employee/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as EmployeeResponse;
  },

  /**
   * PUT /api/employee/{id}
   */
  update: async (pathParams: { id: number }, body: EmployeeUpdateRequest): Promise<EmployeeResponse> => {
    const { data, error } = await apiClient.PUT("/api/employee/{id}" as any, { params: { path: pathParams }, body: body as any });
    if (error) throw error;
    return data as EmployeeResponse;
  },

  /**
   * GET /api/employee
   */
  getAll_2: async (queryParams?: { status?: string }): Promise<EmployeeResponse[]> => {
    const { data, error } = await apiClient.GET("/api/employee" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as EmployeeResponse[];
  },

  /**
   * POST /api/employee
   */
  create_2: async (body: EmployeeCreateRequest): Promise<EmployeeResponse> => {
    const { data, error } = await apiClient.POST("/api/employee" as any, { body: body as any });
    if (error) throw error;
    return data as EmployeeResponse;
  },

  /**
   * POST /api/employee/verify-password
   * Returns a short-lived Access-Token string scoped to CHANGE_PASSWORD.
   */
  verifyCurrentPassword: async (body: VerifyPasswordRequest): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/employee/verify-password" as any, {
      body: body as any,
    });
    if (error) throw error;
    return data as string;
  },

  /**
   * PATCH /api/employee/{id}/status
   */
  changeStatus: async (pathParams: { id: number }, queryParams?: { status: string }): Promise<EmployeeResponse> => {
    const { data, error } = await apiClient.PATCH("/api/employee/{id}/status" as any, { params: { path: pathParams, query: queryParams } });
    if (error) throw error;
    return data as EmployeeResponse;
  },

  /**
   * PATCH /api/employee/{id}/role
   */
  updateRole: async (pathParams: { id: number }, queryParams?: { roleId: number }): Promise<EmployeeResponse> => {
    const { data, error } = await apiClient.PATCH("/api/employee/{id}/role" as any, { params: { path: pathParams, query: queryParams } });
    if (error) throw error;
    return data as EmployeeResponse;
  },

  /**
   * PATCH /api/employee/update-password
   * accessToken: the short-lived token returned by verifyCurrentPassword.
   */
  updatePassword: async (body: SetPasswordRequest, accessToken: string): Promise<string> => {
    const { data, error } = await apiClient.PATCH("/api/employee/update-password" as any, {
      body: body as any,
      headers: { "Access-Token": accessToken },
    });
    if (error) throw error;
    return data as string;
  },

};
