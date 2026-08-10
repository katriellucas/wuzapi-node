"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
class UserModule extends client.BaseClient {
  /**
   * Get user details for specified phone numbers
   */
  async getInfo(phones, options) {
    const request = { Phone: phones };
    return this.post("/user/info", request, options);
  }
  /**
   * Check if phone numbers are registered WhatsApp users
   */
  async check(phones, options) {
    const request = { Phone: phones };
    return this.post("/user/check", request, options);
  }
  /**
   * Get user avatar/profile picture
   */
  async getAvatar(phone, params, options) {
    const request = {
      Phone: phone,
      Preview: params?.preview ?? true
    };
    return this.post("/user/avatar", request, options);
  }
  /**
   * Get contacts list
   * @param params - Optional query filters (e.g. { savedOnly: true })
   * @param options - Optional per-request options
   */
  async getContacts(params, options) {
    const query = { saved_only: params?.savedOnly };
    return this.get("/user/contacts", query, options);
  }
  /**
   * Send user presence (available/unavailable status)
   */
  async sendPresence(presenceType, options) {
    const request = { type: presenceType };
    return this.post("/user/presence", request, options);
  }
  /**
   * Subscribe to a contact's presence updates (online/offline status)
   */
  async subscribePresence(phone, options) {
    return this.post(
      "/user/presence/subscribe",
      { Phone: phone },
      options
    );
  }
  /**
   * Get LID (Linked ID) from phone number or JID
   */
  async getLid(phone, options) {
    return this.get(
      `/user/lid/${encodeURIComponent(phone)}`,
      void 0,
      options
    );
  }
  /**
   * Get user privacy settings
   */
  async getPrivacy(options) {
    return this.get("/user/privacy", void 0, options);
  }
  /**
   * Set a user privacy setting
   */
  async setPrivacy(name, value, options) {
    const request = { Name: name, Value: value };
    return this.post("/user/privacy", request, options);
  }
  /**
   * Block a WhatsApp user
   */
  async blockUser(request, options) {
    return this.post("/user/block", request, options);
  }
  /**
   * Unblock a WhatsApp user
   */
  async unblockUser(request, options) {
    return this.post("/user/unblock", request, options);
  }
  /**
   * Get the current blocklist
   */
  async getBlocklist(options) {
    return this.get("/user/blocklist", void 0, options);
  }
}
exports.UserModule = UserModule;
//# sourceMappingURL=user.js.map
