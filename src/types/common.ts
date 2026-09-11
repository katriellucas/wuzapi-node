// Common types used across all API modules

export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

export interface WuzapiConfig {
  apiUrl: string;
  /** User token, sent as the `token` header on every non-admin endpoint. */
  token?: string;
  /** Admin token, sent as the `Authorization` header on `/admin/*` endpoints. */
  adminToken?: string;
  debug?: boolean;
}

export interface RequestOptions {
  /**
   * Overrides the token for this call. The header is still decided by the
   * endpoint — a user token on user routes, an admin token on `/admin/*`.
   */
  token?: string;

  /** Query string parameters appended to the request URL. */
  params?: QueryParams;

  /**
   * Whether to authenticate the request.
   * Defaults to true. Public endpoints such as `/health` set this to false.
   */
  auth?: boolean;
}

export interface WuzapiResponse<T = unknown> {
  code: number;
  data: T;
  success: boolean;
  error?: string;
}

export interface SimpleContextInfo {
  StanzaID: string;
  Participant: string;
}

export interface ProxyConfig {
  enabled: boolean;
  proxyURL: string;
}

export interface S3Config {
  enabled: boolean;
  endpoint: string;
  region: string;
  bucket: string;
  accessKey: string;
  secretKey: string;
  pathStyle: boolean;
  publicURL?: string;
  mediaDelivery: "base64" | "s3" | "both";
  retentionDays: number;
}

/** Wire shape of `proxy_config` in status-style responses. */
export interface ProxyConfigResponse {
  enabled: boolean;
  proxy_url: string;
  /** Whether webhook deliveries use the configured proxy. */
  webhook_use_proxy: boolean;
}

export interface S3ConfigResponse {
  access_key: string;
  bucket: string;
  enabled: boolean;
  endpoint: string;
  media_delivery?: "base64" | "s3" | "both";
  path_style?: boolean;
  public_url?: string;
  region?: string;
  retention_days?: number;
}