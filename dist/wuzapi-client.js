"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("./modules/admin.js");
require("./modules/session.js");
require("./modules/user.js");
require("./modules/chat.js");
require("./modules/group.js");
require("./modules/webhook.js");
require("./modules/newsletter.js");
const wuzapiClient = require("./wuzapi-client2.js");
exports.WuzapiClient = wuzapiClient.WuzapiClient;
//# sourceMappingURL=wuzapi-client.js.map
