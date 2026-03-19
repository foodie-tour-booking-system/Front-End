/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface BookingCreateRequest {
  scheduleId?: number;
  customerName?: string;
  email?: string;
  phone?: string;
  date?: string;
  adultCount?: number;
  childrenCount?: number;
  pickupLocation?: string;
  customerNote?: string;
  paymentMethod?: "VNPAY" | "VISA";
  tourType?: "GROUP" | "PRIVATE";
}

export interface BookingLogResponse {
  bookingLogId?: number;
  description?: string;
  createAt?: string;
}

export interface BookingResponse {
  bookingId?: number;
  bookingCode?: string;
  totalPrice?: number;
  pickupLocation?: string;
  bookingStatus?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";
  departureTime?: string;
  deposit?: boolean;
  amountPaid?: number;
  remainingAmount?: number;
  duration?: number;
  tourId?: number;
  tourType?: "GROUP" | "PRIVATE";
}

export interface TrackingStep {
  name: string;
  time: string;
  isCompleted: boolean;
  type: "START" | "STOP" | "END";
}

export interface TrackingResponse {
  bookingCode: string;
  tourName: string;
  tourDescription: string;
  departureTime: string;
  pickupLocation: string;
  bookingStatus: string;
  adultCount: number;
  childrenCount: number;
  totalPrice: number;
  routeDescription: string;
  itinerary: TrackingStep[];
}

export interface ProcessRelocateRequest {
  relocateRequestId?: number;
  isApproved?: boolean;
}

export interface RelocateBookingRequest {
  bookingCode?: string;
  otp?: string;
  scheduleId?: number;
}

export interface RelocateBookingResponse {
  relocateRequestId?: number;
  bookingCode?: string;
  relocateRequestStatus?: "PENDING" | "REJECTED" | "APPROVED";
  departureAt?: string;
}


export interface RescheduleRequest {
  bookingId?: number;
  scheduleId?: number;
  newTourDate?: string;
  reason?: string;
}

export const BookingService = {
  /**
   * POST /api/booking/reschedule
   */
  rescheduleBooking: async (body: RescheduleRequest): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/booking/reschedule" as any, { body: body as any });
    if (error) throw error;
    return data as string;
  },

  /**
   * PUT /api/booking/relocate/process
   */
  processRequest: async (body: ProcessRelocateRequest): Promise<BookingResponse> => {
    const { data, error } = await apiClient.PUT("/api/booking/relocate/process" as any, { body: body as any });
    if (error) throw error;
    return data as BookingResponse;
  },

  /**
   * POST /api/booking
   */
  createBooking: async (body: BookingCreateRequest): Promise<BookingResponse> => {
    const { data, error } = await apiClient.POST("/api/booking" as any, { body: body as any });
    if (error) throw error;
    return data as BookingResponse;
  },

  /**
   * POST /api/booking/{bookingId}/payment
   */
  generatePaymentUrl_2: async (pathParams: { bookingId: number }): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/booking/{bookingId}/payment" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as string;
  },

  /**
   * POST /api/booking/{bookingCode}/relocate
   */
  relocateBooking: async (pathParams: { bookingCode: string }): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/booking/{bookingCode}/relocate" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as string;
  },

  /**
   * POST /api/booking/relocate/verify
   */
  verifyBooking: async (body: RelocateBookingRequest, token?: string): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/booking/relocate/verify" as any, { 
      body: body as any,
      headers: token ? { "Access-Token": token } : undefined
    });
    if (error) throw error;
    return data as string;
  },

  /**
   * GET /api/booking/{bookingCode}
   */
  getBookingById: async (pathParams: { bookingCode: string }): Promise<BookingResponse> => {
    const { data, error } = await apiClient.GET("/api/booking/{bookingCode}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as BookingResponse;
  },

  /**
   * GET /api/booking/{bookingCode}/logs
   */
  getLogsByBookingId: async (pathParams: { bookingCode: string }): Promise<BookingLogResponse[]> => {
    const { data, error } = await apiClient.GET("/api/booking/{bookingCode}/logs" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as BookingLogResponse[];
  },

  /**
   * GET /api/booking/relocate/all-request
   */
  getAllRelocateRequest: async (): Promise<RelocateBookingResponse[]> => {
    const { data, error } = await apiClient.GET("/api/booking/relocate/all-request" as any);
    if (error) throw error;
    return data as RelocateBookingResponse[];
  },

  /**
   * GET /api/booking
   */
  getAllBookings: async (): Promise<BookingResponse[]> => {
    const { data, error } = await apiClient.GET("/api/booking/all" as any);
    if (error) throw error;
    return data as BookingResponse[];
  },

  /**
   * GET /api/v1/customer/tracking/{bookingCode}
   */
  getTracking: async (pathParams: { bookingCode: string }): Promise<TrackingResponse> => {
    const { data, error } = await apiClient.GET("/api/v1/customer/tracking/{bookingCode}" as any, { params: { path: pathParams } });
    if (error) throw error;
    return data as TrackingResponse;
  },

};
