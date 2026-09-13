Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_client = require("../client2.js");
//#region src/modules/system.ts
var SystemModule = class extends require_client.BaseClient {
	/**
	* Health check
	* Endpoint to verify if the API is running correctly and retrieve service statistics.
	*
	* Takes no credentials: `/health` is mounted outside both auth middlewares.
	* It also returns bare JSON rather than the standard WuzapiResponse wrapper,
	* so this bypasses `this.request()`.
	*/
	async getHealth() {
		return (await this.axios.get("/health")).data;
	}
};
//#endregion
exports.SystemModule = SystemModule;

//# sourceMappingURL=system.js.map