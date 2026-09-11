"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
class NewsletterModule extends client.BaseClient {
  /**
   * List all subscribed newsletters
   */
  async list(options) {
    return this.get("/newsletter/list", options);
  }
}
exports.NewsletterModule = NewsletterModule;
//# sourceMappingURL=newsletter.js.map
