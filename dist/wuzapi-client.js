"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const modules_admin = require("./modules/admin.js");
const modules_session = require("./modules/session.js");
const modules_user = require("./modules/user.js");
const modules_chat = require("./modules/chat.js");
const modules_group = require("./modules/group.js");
const modules_webhook = require("./modules/webhook.js");
const modules_newsletter = require("./modules/newsletter.js");
const modules_status = require("./modules/status.js");
const modules_call = require("./modules/call.js");
const modules_system = require("./modules/system.js");
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
    this.status = new modules_status.StatusModule(config);
    this.call = new modules_call.CallModule(config);
    this.system = new modules_system.SystemModule(config);
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
exports.WuzapiClient = WuzapiClient;
//# sourceMappingURL=wuzapi-client.js.map
