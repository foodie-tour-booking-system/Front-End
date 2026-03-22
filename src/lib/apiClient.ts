import Cookies from "js-cookie";

//const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const BASE_URL = import.meta.env.VITE_API_SERVER_URL;

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: any;
  params?: {
    path?: Record<string, string | number>;
    query?: Record<string, any>;
  };
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<{ data?: T; error?: any }> {
  try {
    const token = Cookies.get("token");
    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    let url = endpoint;

    // Handle path params
    if (options.params?.path) {
      for (const [key, value] of Object.entries(options.params.path)) {
        url = url.replace(`{${key}}`, String(value));
      }
    }

    // Handle query params
    if (options.params?.query) {
      const qs = new URLSearchParams();
      for (const [key, value] of Object.entries(options.params.query)) {
        if (value !== undefined && value !== null) {
          qs.append(key, String(value));
        }
      }
      const qsString = qs.toString();
      if (qsString) url += `?${qsString}`;
    }

    // Handle body
    let body = options.body;
    if (body && !(body instanceof FormData)) {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      if (typeof body !== "string") {
        body = JSON.stringify(body);
      }
    }

    const fetchOptions: RequestInit = {
      ...options,
      headers,
      body,
    };

    const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = errorText;
      }
      return { error: errorData || response.statusText };
    }

    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return { data: undefined as any };
    }

    // Attempt to parse JSON response
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return { data };
    }

    // Fallback to text
    const textData = await response.text();
    return { data: textData as any };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export const apiClient = {
  GET: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),
  POST: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "POST" }),
  PUT: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "PUT" }),
  DELETE: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
  PATCH: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "PATCH" }),
};
