import { WuzapiConfig, RequestOptions } from './types/common.js';
export declare class WuzapiError extends Error {
    code: number;
    details?: unknown;
    constructor(code: number, message: string, details?: unknown);
}
export declare class BaseClient {
    protected config: WuzapiConfig;
    protected defaultHeaders: Record<string, string>;
    constructor(config: WuzapiConfig);
    /**
     * Resolve headers with authentication token
     */
    private buildHeaders;
    /**
     * Builds a full URL object using the native Web URL API
     */
    protected buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined | null>): URL;
    /**
     * Low-level HTTP execution with native fetch.
     * Parses JSON and handles HTTP errors, returning the raw response body.
     */
    protected requestRaw<T>(method: "GET" | "POST" | "DELETE" | "PUT", endpoint: string, params?: Record<string, string | number | boolean | undefined | null>, data?: unknown, options?: RequestOptions): Promise<T>;
    /**
     * High-level WuzAPI request wrapper.
     * Calls requestRaw and unwraps the WuzAPI `.data` envelope.
     */
    protected request<T>(method: "GET" | "POST" | "DELETE" | "PUT", endpoint: string, params?: Record<string, string | number | boolean | undefined | null>, data?: unknown, options?: RequestOptions): Promise<T>;
    protected get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined | null>, options?: RequestOptions): Promise<T>;
    protected getRaw<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined | null>, options?: RequestOptions): Promise<T>;
    protected post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
    protected put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
    protected delete<T>(endpoint: string, options?: RequestOptions): Promise<T>;
}
