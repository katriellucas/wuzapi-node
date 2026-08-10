"use strict";
const modules_admin = require("./modules/admin.js");
const modules_session = require("./modules/session.js");
const modules_user = require("./modules/user.js");
const modules_chat = require("./modules/chat.js");
const modules_group = require("./modules/group.js");
const modules_webhook = require("./modules/webhook.js");
const modules_newsletter = require("./modules/newsletter.js");
const client = require("./client.js");
class StatusModule extends client.BaseClient {
  /**
   * Set status text message
   */
  async setStatusText(body, options) {
    const request = { Body: body };
    return this.post("/status/set/text", request, options);
  }
}
class CallModule extends client.BaseClient {
  /**
   * Reject an incoming call
   */
  async rejectCall(callFrom, callId, options) {
    const request = { call_from: callFrom, call_id: callId };
    return this.post("/call/reject", request, options);
  }
}
class SystemModule extends client.BaseClient {
  /**
   * Health check
   * Endpoint to verify if the API is running correctly and retrieve service statistics.
   */
  async getHealth(options) {
    return this.getRaw("/health", void 0, options);
  }
}
class WuzapiClient {
  admin;
  session;
  user;
  chat;
  group;
  webhook;
  newsletter;
  status;
  call;
  system;
  // Legacy aliases for convenience
  users;
  message;
  constructor(config) {
    this.admin = new modules_admin.AdminModule(config);
    this.session = new modules_session.SessionModule(config);
    this.user = new modules_user.UserModule(config);
    this.chat = new modules_chat.ChatModule(config);
    this.group = new modules_group.GroupModule(config);
    this.webhook = new modules_webhook.WebhookModule(config);
    this.newsletter = new modules_newsletter.NewsletterModule(config);
    this.status = new StatusModule(config);
    this.call = new CallModule(config);
    this.system = new SystemModule(config);
    this.users = this.user;
    this.message = this.chat;
  }
  /**
   * Test connection to the API
   */
  async ping(options) {
    try {
      await this.session.getStatus(options);
      return true;
    } catch {
      return false;
    }
  }
}
exports.CallModule = CallModule;
exports.StatusModule = StatusModule;
exports.SystemModule = SystemModule;
exports.WuzapiClient = WuzapiClient;
//# sourceMappingURL=wuzapi-client2.js.map
