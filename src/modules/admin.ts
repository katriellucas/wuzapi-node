import { BaseClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
import type {
  User,
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "../types/admin.js";

export class AdminModule extends BaseClient {
  /**
   * List all users
   */
  async listUsers(options?: RequestOptions): Promise<User[]> {
    return this.get<User[]>("/admin/users", undefined, options);
  }

  /**
   * Get a user by ID
   */
  async getUser(id: string, options?: RequestOptions): Promise<User> {
    return this.get<User>(`/admin/users/${id}`, undefined, options);
  }

  /**
   * Add a new user
   */
  async addUser(
    user: CreateUserRequest,
    options?: RequestOptions
  ): Promise<CreateUserResponse> {
    return this.post<CreateUserResponse>("/admin/users", user, options);
  }

  /**
   * Update/edit a user by ID
   */
  async updateUser(
    id: string,
    user: UpdateUserRequest,
    options?: RequestOptions
  ): Promise<UpdateUserResponse> {
    return this.put<UpdateUserResponse>(`/admin/users/${id}`, user, options);
  }

  /**
   * Delete a user by ID
   */
  async deleteUser(
    id: string,
    options?: RequestOptions
  ): Promise<DeleteUserResponse> {
    return this.delete<DeleteUserResponse>(`/admin/users/${id}`, options);
  }

  /**
   * Delete a user completely (full deletion) by ID
   */
  async deleteUserComplete(
    id: string,
    options?: RequestOptions
  ): Promise<DeleteUserResponse> {
    return this.delete<DeleteUserResponse>(`/admin/users/${id}/full`, options);
  }
}