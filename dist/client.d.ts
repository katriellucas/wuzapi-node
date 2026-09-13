import { AxiosInstance } from 'axios';
import { WuzapiConfig, RequestOptions } from './types/common.js';
export declare class WuzapiError extends Error {
    code: number;
    details?: unknown;
    constructor(code: number, message: string, details?: unknown);
}
export declare class BaseClient {
    protected axios: AxiosInstance;
    protected config: WuzapiConfig;
    protected defaultHeaders: Record<string, string>;
    /**
     * Which credential this module's endpoints authenticate with. Overridden to
     * `"admin"` by `AdminModule`; every other module is on user auth.
     */
    protected readonly authScheme: "user" | "admin";
    constructor(config: WuzapiConfig);
    /**
     * Build the auth header the endpoint requires. WuzAPI reads `token` on user
     * routes and `Authorization` on `/admin/*`, and never falls back from one to
     * the other — so the header is fixed by the module's scheme, and
     * `options.token` only overrides which credential goes in it.
     */
    private buildHeaders;
    protected request<T>(method: "GET" | "POST" | "DELETE" | "PUT", endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
    protected get<T>(endpoint: string, options?: RequestOptions): Promise<T>;
    protected post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
    protected put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
    protected delete<T>(endpoint: string, options?: RequestOptions): Promise<T>;
}
