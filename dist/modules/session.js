"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
class SessionModule extends client.BaseClient {
  /**
   * Connect to WhatsApp servers
   */
  async connect(request, options) {
    return this.post("/session/connect", request, options);
  }
  /**
   * Disconnect from WhatsApp servers
   */
  async disconnect(options) {
    return this.post(
      "/session/disconnect",
      void 0,
      options
    );
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
    return this.get("/session/status", void 0, options);
  }
  /**
   * Get QR code for scanning
   */
  async getQRCode(options) {
    return this.get("/session/qr", void 0, options);
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
    return this.get("/session/s3/config", void 0, options);
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
   * Request history sync from WhatsApp servers
   */
  async requestHistory(options) {
    return this.get("/session/history", void 0, options);
  }
  /**
   * Set history count for WhatsApp synchronization
   */
  async setHistoryCount(history, options) {
    const request = { history };
    return this.post(
      "/session/history",
      request,
      options
    );
  }
  /**
   * Set proxy configuration
   */
  async setProxy(proxyURL, enable = true, options) {
    const request = { proxy_url: proxyURL, enable };
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
    return this.get("/session/hmac/config", void 0, options);
  }
  /**
   * Delete HMAC configuration
   */
  async deleteHmacConfig(options) {
    return this.delete("/session/hmac/config", options);
  }
  /**
   * Get passkey status
   */
  async getPasskeyStatus(options) {
    return this.get("/session/passkey-status", void 0, options);
  }
}
exports.SessionModule = SessionModule;
//# sourceMappingURL=session.js.map
