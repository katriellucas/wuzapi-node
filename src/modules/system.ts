import { BaseClient } from "../client.js";
import type { HealthResponse } from "../types/system.js";
import type { RequestOptions } from "../types/common.js";

export class SystemModule extends BaseClient {
  /**
   * Health check
   * Endpoint to verify if the API is running correctly and retrieve service statistics.
   */
  async getHealth(options?: RequestOptions): Promise<HealthResponse> {
    return this.getRaw<HealthResponse>("/health", undefined, options);
  }
}