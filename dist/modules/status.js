Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_client = require("../client2.js");
//#region src/modules/status.ts
var StatusModule = class extends require_client.BaseClient {
	/**
	* Set status text message
	*/
	async setStatusText(body, options) {
		const request = { Body: body };
		return this.post("/status/set/text", request, options);
	}
};
//#endregion
exports.StatusModule = StatusModule;

//# sourceMappingURL=status.js.map