/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface IntrospectRequest {
  token?: string;
}

export interface IntrospectResponse {
  valid?: boolean;
}

export interface LoginRequest {
  input: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
}


export const AuthService = {
  /**
   * POST /api/auth/logout
   */
  logout: async (): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/auth/logout" as any);
    if (error) throw error;
    return data as string;
  },

  /**
   * POST /api/auth/login
   */
  login: async (body: LoginRequest): Promise<LoginResponse> => {
    const { data, error } = await apiClient.POST("/api/auth/login" as any, { body: body as any });
    if (error) throw error;
    return data as LoginResponse;
  },

  /**
   * POST /api/auth/introspect
   */
  introspect: async (body: IntrospectRequest): Promise<IntrospectResponse> => {
    const { data, error } = await apiClient.POST("/api/auth/introspect" as any, { body: body as any });
    if (error) throw error;
    return data as IntrospectResponse;
  },

};
