import { WuzapiConfig, RequestOptions } from './types/common.js';
type HttpMethod = "GET" | "POST" | "DELETE" | "PUT";
export declare class WuzapiError extends Error {
    code: number;
    details?: unknown | undefined;
    constructor(code: number, message: string, details?: unknown | undefined);
}
export declare class BaseClient {
    protected config: WuzapiConfig;
    private readonly http;
    /**
     * Which credential this module's endpoints authenticate with. Overridden to
     * `"admin"` by `AdminModule`; every other module is on user auth.
     */
    protected readonly authScheme: "user" | "admin";
    constructor(config: WuzapiConfig);
    /**
     * Build the authentication headers required by the request.
     */
    private buildHeaders;
    /**
     * Execute an HTTP request and return its parsed response body without
     * interpreting it as a WuzAPI response envelope.
     */
    protected requestRaw<T>(method: HttpMethod, endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
    /**
     * Execute a WuzAPI request, validate its response envelope, and unwrap
     * its `.data` value.
     */
    protected request<T>(method: HttpMethod, endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
    protected get<T>(endpoint: string, options?: RequestOptions): Promise<T>;
    protected post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
    protected put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
    protected delete<T>(endpoint: string, options?: RequestOptions): Promise<T>;
}
export {};
