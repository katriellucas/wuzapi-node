"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
class SystemModule extends client.BaseClient {
  /**
   * Health check
   * Endpoint to verify if the API is running correctly and retrieve service statistics.
   */
  async getHealth(options) {
    return this.requestRaw(
      "GET",
      "/health",
      void 0,
      {
        ...options,
        auth: false
      }
    );
  }
}
exports.SystemModule = SystemModule;
//# sourceMappingURL=system.js.map
