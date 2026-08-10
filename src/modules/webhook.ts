import { BaseClient } from "../client.js";
import { WEBHOOK_EVENTS, WebhookEventType } from "../types/webhook.js";
import type { RequestOptions } from "../types/common.js";
import type {
  SetWebhookRequest,
  SetWebhookResponse,
  GetWebhookResponse,
  UpdateWebhookRequest,
  UpdateWebhookResponse,
  DeleteWebhookResponse,
  WebhookEvent,
} from "../types/webhook.js";


export class WebhookModule extends BaseClient {
  /**
   * Set webhook URL and events to subscribe to
   */
  async setWebhook(
    webhookURL: string,
    events: (WebhookEvent | string)[] = ["All"],
    options?: RequestOptions
  ): Promise<SetWebhookResponse> {
    const request: SetWebhookRequest = { webhook: webhookURL, events };
    return this.post<SetWebhookResponse>("/webhook", request, options);
  }

  /**
   * Get current webhook configuration
   */
  async getWebhook(options?: RequestOptions): Promise<GetWebhookResponse> {
    return this.get<GetWebhookResponse>("/webhook", undefined, options);
  }

  /**
   * Update webhook URL, events, and activation status
   */
  async updateWebhook(
    webhookURL?: string,
    events?: (WebhookEvent | string)[],
    active?: boolean,
    options?: RequestOptions
  ): Promise<UpdateWebhookResponse> {
    const request: UpdateWebhookRequest = {
      webhook: webhookURL,
      events,
      Active: active,
    };
    return this.put<UpdateWebhookResponse>("/webhook", request, options);
  }

  /**
   * Delete webhook configuration
   */
  async deleteWebhook(
    options?: RequestOptions
  ): Promise<DeleteWebhookResponse> {
    return this.delete<DeleteWebhookResponse>("/webhook", options);
  }

  /**
   * Get all available webhook event types
   */
  static getAvailableEvents(): string[] {
    return WEBHOOK_EVENTS;
  }

  /**
   * Get webhook event types enum for type-safe access
   */
  static get EventTypes(): typeof WebhookEventType {
    return WebhookEventType;
  }
}