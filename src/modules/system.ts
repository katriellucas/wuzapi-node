import { BaseClient, WuzapiError } from "../client.js";
import type { HealthResponse } from "../types/system.js";

export class SystemModule extends BaseClient {
  /**
   * Health check
   * Endpoint to verify if the API is running correctly and retrieve service statistics.
   */
  async getHealth(): Promise<HealthResponse> {
    const url = this.buildUrl("/health");

    let response: Response;

    try {
      response = await fetch(url);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to connect to WuzAPI";

      throw new WuzapiError(0, `Network error: ${message}`);
    }

    const data = (await response.json().catch(() => ({}))) as HealthResponse;

    if (!response.ok) {
      throw new WuzapiError(
        response.status,
        `API request failed with status ${response.status}`,
        data,
      );
    }

    return data;
  }
}
