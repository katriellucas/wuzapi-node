Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_client = require("../client2.js");
//#region src/modules/call.ts
var CallModule = class extends require_client.BaseClient {
	/**
	* Reject an incoming call
	*/
	async rejectCall(callFrom, callId, options) {
		const request = {
			call_from: callFrom,
			call_id: callId
		};
		return this.post("/call/reject", request, options);
	}
};
//#endregion
exports.CallModule = CallModule;

//# sourceMappingURL=call.js.map