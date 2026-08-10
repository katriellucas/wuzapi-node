import { BaseClient } from '../client.js';
import { RequestOptions } from '../types/common.js';
import { User, CreateUserRequest, CreateUserResponse, DeleteUserResponse, UpdateUserRequest, UpdateUserResponse } from '../types/admin.js';
export declare class AdminModule extends BaseClient {
    /**
     * List all users
     */
    listUsers(options?: RequestOptions): Promise<User[]>;
    /**
     * Get a user by ID
     */
    getUser(id: string, options?: RequestOptions): Promise<User>;
    /**
     * Add a new user
     */
    addUser(user: CreateUserRequest, options?: RequestOptions): Promise<CreateUserResponse>;
    /**
     * Update/edit a user by ID
     */
    updateUser(id: string, user: UpdateUserRequest, options?: RequestOptions): Promise<UpdateUserResponse>;
    /**
     * Delete a user by ID
     */
    deleteUser(id: string, options?: RequestOptions): Promise<DeleteUserResponse>;
    /**
     * Delete a user completely (full deletion) by ID
     */
    deleteUserComplete(id: string, options?: RequestOptions): Promise<DeleteUserResponse>;
}
