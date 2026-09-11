"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
class StatusModule extends client.BaseClient {
  /**
   * Set status text message
   */
  async setStatusText(body, options) {
    const request = { Body: body };
    return this.post("/status/set/text", request, options);
  }
}
exports.StatusModule = StatusModule;
//# sourceMappingURL=status.js.map
