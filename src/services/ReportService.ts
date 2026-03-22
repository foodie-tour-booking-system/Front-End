import { apiClient } from "../lib/apiClient";

export interface BookingReportResponse {
  bookingCode: string;
  totalPrice: number;
  bookingStatus: string;
  departureTime: string;
  totalCustomers: number;
}

export interface TransactionReportResponse {
  amount: number;
  createdAt: string;
  cashFlow: "INCOME" | "OUTCOME" | string;
  paymentMethod: string;
}

export interface ReportResponse {
  bookingCompleted: number;
  bookingCancelled: number;
  totalRevenue: number;
  income: number;
  outcome: number;
  totalCustomer: number;
  incomeList: TransactionReportResponse[];
  outcomeList: TransactionReportResponse[];
  bookingCompletedList: BookingReportResponse[];
}

export interface ReportFilterParams {
  from?: string; // yyyy-MM-ddTHH:mm:ss
  to?: string;   // yyyy-MM-ddTHH:mm:ss
}

export interface BookingReportFilterParams extends ReportFilterParams {
  page?: number;
  status: string;
}

export interface TransactionReportFilterParams extends ReportFilterParams {
  page?: number;
  cashFlow: string;
}

export const ReportService = {
  getOverview: async (params: ReportFilterParams): Promise<ReportResponse> => {
    const { data, error } = await apiClient.GET<ReportResponse>("/api/report", {
      params: { query: params }
    });
    if (error) throw error;
    return data as ReportResponse;
  },

  getBookings: async (params: BookingReportFilterParams): Promise<BookingReportResponse[]> => {
    const { data, error } = await apiClient.GET<BookingReportResponse[]>("/api/report/bookings", {
      params: { query: params }
    });
    if (error) throw error;
    return data || [];
  },

  getTransactions: async (params: TransactionReportFilterParams): Promise<TransactionReportResponse[]> => {
    const { data, error } = await apiClient.GET<TransactionReportResponse[]>("/api/report/transactions", {
      params: { query: params }
    });
    if (error) throw error;
    return data || [];
  }
};
