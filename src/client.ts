// 📁 src/client.ts
import {
  WuzapiConfig,
  WuzapiResponse,
  RequestOptions,
} from "./types/common.js";
import { logger } from "./utils/logger.js";

export class WuzapiError extends Error {
  public code: number;
  public details?: unknown;

  constructor(code: number, message: string, details?: unknown) {
    super(message);
    this.name = "WuzapiError";
    this.code = code;
    this.details = details;
  }
}

export class BaseClient {
  protected config: WuzapiConfig;
  protected defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  constructor(config: WuzapiConfig) {
    this.config = config;
  }

  /**
   * Resolve headers with authentication token
   */
  private buildHeaders(options?: RequestOptions): Record<string, string> {
    const token = options?.token || this.config.token;
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
    };
    if (!token) {
      throw new WuzapiError(
        401,
        "No authentication token provided. Either set a token in the client config or provide one in the request options."
      );
    }
    if (options?.token && options.token !== this.config.token) {
      headers.Token = options.token;
    }
    if (this.config.token) {
      headers.Authorization = this.config.token;
      headers.Token = this.config.token;
    }
    return headers;
  }

  protected async request<T>(
    method: "GET" | "POST" | "DELETE" | "PUT",
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const headers = this.buildHeaders(options);
    const url = `${this.config.apiUrl}${endpoint}`;

    if (this.config.debug) {
      logger.request(`[${method}] ${endpoint}`, { headers, data });
    }

    let res: Response;
    try {
      res = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });
    } catch (err: any) {
      throw new WuzapiError(
        0,
        `Network error: ${err.message || "Failed to connect to WuzAPI"}`
      );
    }

    const json: WuzapiResponse<T> = await res.json().catch(() => ({} as any));

    if (this.config.debug) {
      logger.response(`[${method}] ${endpoint}`, {
        status: res.status,
        data: json,
      });
    }

    if (!res.ok || json.success === false) {
      throw new WuzapiError(
        json.code || res.status,
        json.error || `API request failed with status ${res.status}`,
        json
      );
    }

    return json.data;
  }

  protected async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, options);
  }

  protected async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("POST", endpoint, data, options);
  }

  protected async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, data, options);
  }

  protected async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, options);
  }
}