/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";


export const S3Service = {
  /**
   * POST /api/aws/s3/upload-custom-prefix
   */
  uploadCustomPrefix: async (body: any): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/aws/s3/upload-custom-prefix" as any, { body: body as any });
    if (error) throw error;
    return data as string;
  },

  /**
   * DELETE /api/aws/s3
   */
  deleteFile: async (body: string): Promise<string> => {
    const { data, error } = await apiClient.DELETE("/api/aws/s3" as any, { body: body as any });
    if (error) throw error;
    return data as string;
  },

};
