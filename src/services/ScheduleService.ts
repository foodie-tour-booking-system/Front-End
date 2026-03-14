/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface ScheduleRequest {
  tourId: number;
  routeId: number;
  scheduleNote?: string;
  scheduleDescription?: string;
  minPax: number;
  maxPax?: number;
  departureAt?: string;
  scheduleStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
}

export interface ScheduleResponse {
  scheduleId?: number;
  tourId?: number;
  routeId?: number;
  scheduleNote?: string;
  scheduleDescription?: string;
  minPax?: number;
  maxPax?: number;
  departureAt?: string;
  createdAt?: string;
  updatedAt?: string;
  scheduleStatus?: "ACTIVE" | "INACTIVE" | "DELETED" | "DRAFT";
}


export const ScheduleService = {
  /**
   * PUT /api/schedules/{id}
   */
  updateSchedule: async (pathParams: { id: number }, body: ScheduleRequest): Promise<ScheduleResponse> => {
    const { data, error } = await apiClient.PUT("/api/schedules/{id}" as any, { params: { path: pathParams }, body: body as any });
    if (error) throw error;
    return data as ScheduleResponse;
  },

  /**
   * DELETE /api/schedules/{id}
   */
  deleteSchedule: async (pathParams: { id: number }): Promise<string> => {
    const { data, error } = await apiClient.DELETE("/api/schedules/{id}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as string;
  },

  /**
   * GET /api/schedules
   */
  getSchedules: async (queryParams?: { tourId?: number, routeId?: number, scheduleStatus?: string }): Promise<ScheduleResponse[]> => {
    const { data, error } = await apiClient.GET("/api/schedules" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as ScheduleResponse[];
  },

  /**
   * POST /api/schedules
   */
  createSchedule: async (body: ScheduleRequest): Promise<ScheduleResponse> => {
    const { data, error } = await apiClient.POST("/api/schedules" as any, { body: body as any });
    if (error) throw error;
    return data as ScheduleResponse;
  },

};
