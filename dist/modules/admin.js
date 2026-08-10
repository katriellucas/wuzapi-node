"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
class AdminModule extends client.BaseClient {
  /**
   * List all users
   */
  async listUsers(options) {
    return this.get("/admin/users", void 0, options);
  }
  /**
   * Get a user by ID
   */
  async getUser(id, options) {
    return this.get(`/admin/users/${id}`, void 0, options);
  }
  /**
   * Add a new user
   */
  async addUser(user, options) {
    return this.post("/admin/users", user, options);
  }
  /**
   * Update/edit a user by ID
   */
  async updateUser(id, user, options) {
    return this.put(`/admin/users/${id}`, user, options);
  }
  /**
   * Delete a user by ID
   */
  async deleteUser(id, options) {
    return this.delete(`/admin/users/${id}`, options);
  }
  /**
   * Delete a user completely (full deletion) by ID
   */
  async deleteUserComplete(id, options) {
    return this.delete(`/admin/users/${id}/full`, options);
  }
}
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.js.map
