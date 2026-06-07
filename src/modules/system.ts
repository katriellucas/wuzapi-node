import { BaseClient } from "../client.js";
import { HealthResponse } from "../types/system.js";
import { RequestOptions } from "../types/common.js";

export class SystemModule extends BaseClient {
  /**
   * Health check
   * Endpoint to verify if the API is running correctly and retrieve service statistics.
   */
  async getHealth(options?: RequestOptions): Promise<HealthResponse> {
    // We bypass this.request() because /health does not return the standard WuzapiResponse wrapper
    const token = options?.token || this.config.token;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Token"] = token;
      headers["Authorization"] = token;
    }
    
    const response = await this.axios.get<HealthResponse>("/health", { headers });
    return response.data;
  }
}
