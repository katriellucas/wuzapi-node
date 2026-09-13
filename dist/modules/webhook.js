Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_client = require("../client2.js");
const require_webhook = require("../webhook.js");
//#region src/modules/webhook.ts
var WebhookModule = class extends require_client.BaseClient {
	/**
	* Set webhook URL and events to subscribe to
	*/
	async setWebhook(webhookURL, events = ["All"], options) {
		const request = {
			webhookurl: webhookURL,
			events
		};
		return this.post("/webhook", request, options);
	}
	/**
	* Get current webhook configuration
	*/
	async getWebhook(options) {
		return this.get("/webhook", options);
	}
	/**
	* Update webhook URL, events, and activation status
	*/
	async updateWebhook(webhookURL, events, active, options) {
		const request = {
			webhook: webhookURL,
			events,
			active
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
		return require_webhook.WEBHOOK_EVENTS;
	}
	/**
	* Get webhook event types enum for type-safe access
	*/
	static get EventTypes() {
		return require_webhook.WebhookEventType;
	}
};
//#endregion
exports.WebhookModule = WebhookModule;

//# sourceMappingURL=webhook.js.map