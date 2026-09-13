Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_client = require("../client2.js");
//#region src/modules/newsletter.ts
var NewsletterModule = class extends require_client.BaseClient {
	/**
	* List all subscribed newsletters
	*/
	async list(options) {
		return this.get("/newsletter/list", options);
	}
};
//#endregion
exports.NewsletterModule = NewsletterModule;

//# sourceMappingURL=newsletter.js.map