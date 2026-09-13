Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_modules_admin = require("./modules/admin.js");
const require_modules_session = require("./modules/session.js");
const require_modules_user = require("./modules/user.js");
const require_modules_chat = require("./modules/chat.js");
const require_modules_group = require("./modules/group.js");
const require_modules_webhook = require("./modules/webhook.js");
const require_modules_newsletter = require("./modules/newsletter.js");
const require_modules_status = require("./modules/status.js");
const require_modules_call = require("./modules/call.js");
const require_modules_system = require("./modules/system.js");
//#region src/wuzapi-client.ts
var WuzapiClient = class {
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
	users;
	message;
	constructor(config) {
		this.admin = new require_modules_admin.AdminModule(config);
		this.session = new require_modules_session.SessionModule(config);
		this.user = new require_modules_user.UserModule(config);
		this.chat = new require_modules_chat.ChatModule(config);
		this.group = new require_modules_group.GroupModule(config);
		this.webhook = new require_modules_webhook.WebhookModule(config);
		this.newsletter = new require_modules_newsletter.NewsletterModule(config);
		this.status = new require_modules_status.StatusModule(config);
		this.call = new require_modules_call.CallModule(config);
		this.system = new require_modules_system.SystemModule(config);
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
};
//#endregion
exports.WuzapiClient = WuzapiClient;

//# sourceMappingURL=wuzapi-client.js.map