Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_client = require("../client2.js");
//#region src/modules/session.ts
var SessionModule = class extends require_client.BaseClient {
	/**
	* Connect to WhatsApp servers
	*/
	async connect(request, options) {
		return this.post("/session/connect", request, options);
	}
	/**
	* Disconnect from WhatsApp servers.
	* @param clear also clear the stored event subscriptions (the server keeps them by default)
	*/
	async disconnect(clear, options) {
		const path = clear ? "/session/disconnect?clear=true" : "/session/disconnect";
		return this.post(path, void 0, options);
	}
	/**
	* Logout and finish the session
	*/
	async logout(options) {
		return this.post("/session/logout", void 0, options);
	}
	/**
	* Get session status
	*/
	async getStatus(options) {
		return this.get("/session/status", options);
	}
	/**
	* Get QR code for scanning
	*/
	async getQRCode(options) {
		return this.get("/session/qr", options);
	}
	/**
	* Configure S3 storage
	*/
	async configureS3(config, options) {
		return this.post("/session/s3/config", config, options);
	}
	/**
	* Get S3 configuration
	*/
	async getS3Config(options) {
		return this.get("/session/s3/config", options);
	}
	/**
	* Test S3 connection
	*/
	async testS3(options) {
		return this.post("/session/s3/test", void 0, options);
	}
	/**
	* Delete S3 configuration
	*/
	async deleteS3Config(options) {
		return this.delete("/session/s3/config", options);
	}
	/**
	* Pair phone using verification code
	*/
	async pairPhone(phone, options) {
		const request = { Phone: phone };
		return this.post("/session/pairphone", request, options);
	}
	/**
	* Get pending passkey pairing status. Returns the WebAuthn challenge when
	* the device initiated passkey pairing instead of QR.
	*/
	async getPasskeyStatus(options) {
		return this.get("/session/passkey-status", options);
	}
	/**
	* Complete passkey pairing by sending the WebAuthn response from the
	* authenticator, after receiving a `PasskeyRequest` webhook.
	*/
	async sendPasskeyResponse(request, options) {
		return this.post("/session/passkey-response", request, options);
	}
	/**
	* Confirm that the 8-character pairing code was displayed to the user and
	* matches the phone, after receiving a `PasskeyConfirmation` webhook.
	*/
	async confirmPasskey(options) {
		return this.post("/session/passkey-confirm", void 0, options);
	}
	/**
	* Request history sync from WhatsApp servers
	*/
	async requestHistory(options) {
		return this.get("/session/history", options);
	}
	/**
	* Set history count for WhatsApp synchronization
	*/
	async setHistoryCount(history, options) {
		const request = { history };
		return this.post("/session/history", request, options);
	}
	/**
	* Set proxy configuration
	* @param webhookUseProxy route webhook deliveries through this proxy; omitted preserves the current per-user value
	*/
	async setProxy(proxyURL, enable = true, webhookUseProxy, options) {
		const request = {
			proxy_url: proxyURL,
			enable,
			...webhookUseProxy !== void 0 && { webhook_use_proxy: webhookUseProxy }
		};
		return this.post("/session/proxy", request, options);
	}
	/**
	* Configure HMAC key for webhook signing
	*/
	async configureHmac(hmacKey, options) {
		const request = { hmac_key: hmacKey };
		return this.post("/session/hmac/config", request, options);
	}
	/**
	* Get HMAC configuration status
	*/
	async getHmacConfig(options) {
		return this.get("/session/hmac/config", options);
	}
	/**
	* Delete HMAC configuration
	*/
	async deleteHmacConfig(options) {
		return this.delete("/session/hmac/config", options);
	}
};
//#endregion
exports.SessionModule = SessionModule;

//# sourceMappingURL=session.js.map