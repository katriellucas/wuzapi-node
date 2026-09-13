Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_client = require("../client2.js");
//#region src/modules/admin.ts
var AdminModule = class extends require_client.BaseClient {
	/** `/admin/*` authenticates with the server's admin token via `Authorization`. */
	authScheme = "admin";
	/**
	* List all users
	*/
	async listUsers(options) {
		return this.get("/admin/users", options);
	}
	/**
	* Get a user by ID
	*/
	async getUser(id, options) {
		return this.get(`/admin/users/${id}`, options);
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
};
//#endregion
exports.AdminModule = AdminModule;

//# sourceMappingURL=admin.js.map