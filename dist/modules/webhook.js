"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
const webhook = require("../webhook.js");
class WebhookModule extends client.BaseClient {
  /**
   * Set webhook URL and events to subscribe to
   */
  async setWebhook(webhookURL, events = ["All"], options) {
    const request = { webhook: webhookURL, events };
    return this.post("/webhook", request, options);
  }
  /**
   * Get current webhook configuration
   */
  async getWebhook(options) {
    return this.get("/webhook", void 0, options);
  }
  /**
   * Update webhook URL, events, and activation status
   */
  async updateWebhook(webhookURL, events, active, options) {
    const request = {
      webhook: webhookURL,
      events,
      Active: active
    };
    return this.put("/webhook", request, options);
  }
  /**
   * Delete webhook configuration
   */
  async deleteWebhook(options) {
    return this.delete("/webhook", options);
  }
  /**
   * Get all available webhook event types
   */
  static getAvailableEvents() {
    return webhook.WEBHOOK_EVENTS;
  }
  /**
   * Get webhook event types enum for type-safe access
   */
  static get EventTypes() {
    return webhook.WebhookEventType;
  }
}
exports.WebhookModule = WebhookModule;
//# sourceMappingURL=webhook.js.map
