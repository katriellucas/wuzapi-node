"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
class CallModule extends client.BaseClient {
  /**
   * Reject an incoming call
   */
  async rejectCall(callFrom, callId, options) {
    const request = { call_from: callFrom, call_id: callId };
    return this.post("/call/reject", request, options);
  }
}
exports.CallModule = CallModule;
//# sourceMappingURL=call.js.map
