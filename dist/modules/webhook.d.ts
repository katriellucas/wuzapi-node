import { BaseClient } from '../client.js';
import { WebhookEventType, SetWebhookResponse, GetWebhookResponse, UpdateWebhookResponse, DeleteWebhookResponse, WebhookEvent } from '../types/webhook.js';
import { RequestOptions } from '../types/common.js';
export declare class WebhookModule extends BaseClient {
    /**
     * Set webhook URL and events to subscribe to
     */
    setWebhook(webhookURL: string, events?: (WebhookEvent | string)[], options?: RequestOptions): Promise<SetWebhookResponse>;
    /**
     * Get current webhook configuration
     */
    getWebhook(options?: RequestOptions): Promise<GetWebhookResponse>;
    /**
     * Update webhook URL, events, and activation status
     */
    updateWebhook(webhookURL?: string, events?: (WebhookEvent | string)[], active?: boolean, options?: RequestOptions): Promise<UpdateWebhookResponse>;
    /**
     * Delete webhook configuration
     */
    deleteWebhook(options?: RequestOptions): Promise<DeleteWebhookResponse>;
    /**
     * Get all available webhook event types
     */
    static getAvailableEvents(): string[];
    /**
     * Get webhook event types enum for type-safe access
     */
    static get EventTypes(): typeof WebhookEventType;
}
