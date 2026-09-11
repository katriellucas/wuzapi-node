import ky, { HTTPError, type KyInstance } from "ky";
import type {
  WuzapiConfig,
  WuzapiResponse,
  RequestOptions,
} from "./types/common.js";
import { logger } from "./utils/logger.js";

type HttpMethod = "GET" | "POST" | "DELETE" | "PUT";

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

/**
 * Convert Ky transport errors into the public error shape exposed by this SDK.
 */
function toWuzapiError(error: Error): WuzapiError {
  if (error instanceof HTTPError) {
    return new WuzapiError(
      error.response.status,
      resolveErrorMessage(
        error.data,
        `API request failed with status ${error.response.status}`,
      ),
      error.data,
    );
  }

  return new WuzapiError(0, `Network error: ${error.message}`, error);
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
  private readonly http: KyInstance;

  /**
   * Which credential this module's endpoints authenticate with. Overridden to
   * `"admin"` by `AdminModule`; every other module is on user auth.
   */
  protected readonly authScheme: "user" | "admin" = "user";

  constructor(protected config: WuzapiConfig) {
    this.http = ky.create({
      prefix: config.apiUrl,
      retry: 0,
      timeout: false,
      hooks: {
        beforeError: [
          ({ error }): WuzapiError => toWuzapiError(error),
        ],
      },
    });
  }

  /**
   * Build the authentication headers required by the request.
   */
  private buildHeaders(options?: RequestOptions): Record<string, string> {
    if (options?.auth === false) return {};

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
      [isAdmin ? "Authorization" : "token"]: token,
    };
  }

  /**
   * Execute an HTTP request and return its parsed response body without
   * interpreting it as a WuzAPI response envelope.
   */
  protected requestRaw<T>(
    method: HttpMethod,
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const headers = this.buildHeaders(options);

    if (this.config.debug) {
      logger.request(`[${method}] ${endpoint}`, {
        headers,
        params: options?.params,
        data,
      });
    }

    return this.http(endpoint, {
      method,
      headers,
      searchParams: options?.params,
      ...(data === undefined ? {} : { json: data }),
    }).json<T>();
  }

  /**
   * Execute a WuzAPI request, validate its response envelope, and unwrap
   * its `.data` value.
   */
  protected async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const response = await this.requestRaw<WuzapiResponse<T>>(
      method,
      endpoint,
      data,
      options,
    );

    const validCode =
      typeof response.code !== "number" ||
      (response.code >= 200 && response.code < 300);

    if (response.success && validCode) {
      return response.data;
    }

    throw new WuzapiError(
      response.code ?? 500,
      resolveErrorMessage(response, "API request failed"),
      response,
    );
  }

  protected get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, options);
  }

  protected post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("POST", endpoint, data, options);
  }

  protected put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, data, options);
  }

  protected delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, options);
  }
}