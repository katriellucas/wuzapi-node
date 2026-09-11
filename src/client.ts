import type {
  WuzapiConfig,
  WuzapiResponse,
  RequestOptions,
} from "./types/common.js";
import { logger } from "./utils/logger.js";

type HttpMethod = "GET" | "POST" | "DELETE" | "PUT";

type QueryParams = Record<string, string | number | boolean | undefined | null>;

/**
 * WuzAPI reports a failure reason in `error`, or occasionally as a bare string
 * `data`. `message` only appears on responses that are not WuzAPI envelopes.
 */
function resolveErrorMessage(body: unknown, fallback: string): string {
  if (typeof body !== "object" || body === null) return fallback;

  const { error, message, data } = body as Record<string, unknown>;

  if (typeof error === "string") return error;
  if (typeof message === "string") return message;
  if (typeof data === "string") return data;

  return fallback;
}

export class WuzapiError extends Error {
  constructor(
    public code: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "WuzapiError";
  }
}

export class BaseClient {
  private readonly defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  /**
   * Which credential this module's endpoints authenticate with. Overridden to
   * `"admin"` by `AdminModule`; every other module is on user auth.
   */
  protected readonly authScheme: "user" | "admin" = "user";

  constructor(protected config: WuzapiConfig) {}

  /**
   * Build the auth header the endpoint requires.
   */
  private buildHeaders(options?: RequestOptions): Record<string, string> {
    const isAdmin = this.authScheme === "admin";

    const token =
      options?.token ?? (isAdmin ? this.config.adminToken : this.config.token);

    if (!token) {
      throw new WuzapiError(
        401,
        isAdmin
          ? "No admin token provided. Set `adminToken` in the client config, or pass `{ token }` in the request options."
          : "No user token provided. Set `token` in the client config, or pass `{ token }` in the request options.",
      );
    }

    return {
      ...this.defaultHeaders,
      [isAdmin ? "Authorization" : "token"]: token,
    };
  }

  /**
   * Builds a full URL using the native URL API.
   */
  protected buildUrl(endpoint: string, params?: QueryParams): URL {
    const url = new URL(
      `${this.config.apiUrl}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1"),
    );

    for (const [key, value] of Object.entries(params ?? {})) {
      if (value == null || value === "") continue;

      url.searchParams.set(key, String(value));
    }

    return url;
  }

  /**
   * Execute an authenticated WuzAPI request and unwrap its `.data` envelope.
   */
  protected async request<T>(
    method: HttpMethod,
    endpoint: string,
    params?: QueryParams,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const headers = this.buildHeaders(options);
    const url = this.buildUrl(endpoint, params);

    if (this.config.debug) {
      logger.request(`[${method}] ${url.pathname}${url.search}`, {
        headers,
        data,
      });
    }

    let response: Response;

    try {
      response = await fetch(url, {
        method,
        headers,
        body: data === undefined ? undefined : JSON.stringify(data),
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to connect to WuzAPI";

      throw new WuzapiError(0, `Network error: ${message}`);
    }

    const json = (await response.json().catch(() => ({}))) as WuzapiResponse<T>;

    if (this.config.debug) {
      logger.response(`[${method}] ${url.pathname}${url.search}`, {
        status: response.status,
        data: json,
      });
    }

    if (!response.ok) {
      throw new WuzapiError(
        response.status,
        resolveErrorMessage(
          json,
          `API request failed with status ${response.status}`,
        ),
        json,
      );
    }

    const invalidCode =
      typeof json.code === "number" && (json.code < 200 || json.code >= 300);

    if (!json.success || invalidCode) {
      throw new WuzapiError(
        json.code ?? 500,
        resolveErrorMessage(json, "API request failed"),
        json,
      );
    }

    return json.data;
  }

  protected get<T>(
    endpoint: string,
    params?: QueryParams,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("GET", endpoint, params, undefined, options);
  }

  protected post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("POST", endpoint, undefined, data, options);
  }

  protected put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, undefined, data, options);
  }

  protected delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, undefined, options);
  }
}