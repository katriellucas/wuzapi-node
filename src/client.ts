import type {
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
    if (!token) {
      throw new WuzapiError(
        401,
        "No authentication token provided. Either set a token in the client config or provide one in the request options."
      );
    }
    return {
      ...this.defaultHeaders,
      Authorization: token,
      Token: token,
    };
  }

  /**
   * Builds a full URL object using the native Web URL API
   */
  protected buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined | null>
  ): URL {
    const fullUrl = `${this.config.apiUrl}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
    const url = new URL(fullUrl);

    for (const [key, value] of Object.entries(params ?? {})) {
      if (value != null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }

    return url;
  }

  /**
   * Low-level HTTP execution with native fetch.
   * Parses JSON and handles HTTP errors, returning the raw response body.
   */
  protected async requestRaw<T>(
    method: "GET" | "POST" | "DELETE" | "PUT",
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined | null>,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const headers = this.buildHeaders(options);
    const url = this.buildUrl(endpoint, params);

    if (this.config.debug) {
      logger.request(`[${method}] ${url.pathname}${url.search}`, { headers, data });
    }

    let res: Response;
    try {
      res = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect to WuzAPI";
      throw new WuzapiError(0, `Network error: ${errorMessage}`);
    }

    const json = (await res.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;

    if (this.config.debug) {
      logger.response(`[${method}] ${url.pathname}${url.search}`, {
        status: res.status,
        data: json,
      });
    }

    if (!res.ok) {
      let errorMessage = `API request failed with status ${res.status}`;
      if (typeof json.error === "string" && json.error) {
        errorMessage = json.error;
      } else if (typeof json.message === "string" && json.message) {
        errorMessage = json.message;
      }

      throw new WuzapiError(res.status, errorMessage, json);
    }

    return json as T;
  }

  /**
   * High-level WuzAPI request wrapper.
   * Calls requestRaw and unwraps the WuzAPI `.data` envelope.
   */
  protected async request<T>(
    method: "GET" | "POST" | "DELETE" | "PUT",
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined | null>,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const json = await this.requestRaw<WuzapiResponse<T>>(
      method,
      endpoint,
      params,
      data,
      options
    );

    if (json.success === false) {
      throw new WuzapiError(
        json.code || 500,
        json.error || "API request failed",
        json
      );
    }

    return json.data;
  }

  protected async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined | null>,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("GET", endpoint, params, undefined, options);
  }

  protected async getRaw<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined | null>,
    options?: RequestOptions
  ): Promise<T> {
    return this.requestRaw<T>("GET", endpoint, params, undefined, options);
  }

  protected async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("POST", endpoint, undefined, data, options);
  }

  protected async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, undefined, data, options);
  }

  protected async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, undefined, options);
  }
}