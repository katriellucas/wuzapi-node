import { BaseClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
import type {
  UserInfoRequest,
  UserInfoResponse,
  UserCheckRequest,
  UserCheckResponse,
  UserAvatarRequest,
  UserAvatarResponse,
  ContactsResponse,
  UserPresenceRequest,
  UserPresenceResponse,
  UserLidResponse,
  UserPrivacySettings,
  PrivacySettingValueMap,
  UserBlockRequest,
  UserBlockResponse,
  UserUnblockResponse,
  UserBlocklistResponse,
} from "../types/user.js";

export class UserModule extends BaseClient {
  /**
   * Get user details for specified phone numbers
   */
  async getInfo(
    phones: string[],
    options?: RequestOptions
  ): Promise<UserInfoResponse> {
    const request: UserInfoRequest = { Phone: phones };
    return this.post<UserInfoResponse>("/user/info", request, options);
  }

  /**
   * Check if phone numbers are registered WhatsApp users
   */
  async check(
    phones: string[],
    options?: RequestOptions
  ): Promise<UserCheckResponse> {
    const request: UserCheckRequest = { Phone: phones };
    return this.post<UserCheckResponse>("/user/check", request, options);
  }

  /**
   * Get user avatar/profile picture
   */
  async getAvatar(
    phone: string,
    params?: { preview?: boolean },
    options?: RequestOptions
  ): Promise<UserAvatarResponse> {
    const request: UserAvatarRequest = {
      Phone: phone,
      Preview: params?.preview ?? true,
    };
    return this.post<UserAvatarResponse>("/user/avatar", request, options);
  }

  /**
   * Get contacts list
   * @param params - Optional query filters (e.g. { savedOnly: true })
   * @param options - Optional per-request options
   */
  async getContacts(
    params?: { savedOnly?: boolean },
    options?: RequestOptions
  ): Promise<ContactsResponse> {
    const query = { saved_only: params?.savedOnly };
    return this.get<ContactsResponse>("/user/contacts", query, options);
  }

  /**
   * Send user presence (available/unavailable status)
   */
  async sendPresence(
    presenceType: "available" | "unavailable",
    options?: RequestOptions
  ): Promise<UserPresenceResponse> {
    const request: UserPresenceRequest = { type: presenceType };
    return this.post<UserPresenceResponse>("/user/presence", request, options);
  }

  /**
   * Subscribe to a contact's presence updates (online/offline status)
   */
  async subscribePresence(
    phone: string,
    options?: RequestOptions
  ): Promise<{ Details: string }> {
    return this.post<{ Details: string }>(
      "/user/presence/subscribe",
      { Phone: phone },
      options
    );
  }

  /**
   * Get LID (Linked ID) from phone number or JID
   */
  async getLid(
    phone: string,
    options?: RequestOptions
  ): Promise<UserLidResponse> {
    return this.get<UserLidResponse>(
      `/user/lid/${encodeURIComponent(phone)}`,
      undefined,
      options
    );
  }

  /**
   * Get user privacy settings
   */
  async getPrivacy(options?: RequestOptions): Promise<UserPrivacySettings> {
    return this.get<UserPrivacySettings>("/user/privacy", undefined, options);
  }

  /**
   * Set a user privacy setting
   */
  async setPrivacy<K extends keyof PrivacySettingValueMap>(
    name: K,
    value: PrivacySettingValueMap[K],
    options?: RequestOptions
  ): Promise<Partial<UserPrivacySettings>> {
    const request = { Name: name, Value: value };
    return this.post<Partial<UserPrivacySettings>>("/user/privacy", request, options);
  }

  /**
   * Block a WhatsApp user
   */
  async blockUser(
    request: UserBlockRequest,
    options?: RequestOptions
  ): Promise<UserBlockResponse> {
    return this.post<UserBlockResponse>("/user/block", request, options);
  }

  /**
   * Unblock a WhatsApp user
   */
  async unblockUser(
    request: UserBlockRequest,
    options?: RequestOptions
  ): Promise<UserUnblockResponse> {
    return this.post<UserUnblockResponse>("/user/unblock", request, options);
  }

  /**
   * Get the current blocklist
   */
  async getBlocklist(options?: RequestOptions): Promise<UserBlocklistResponse> {
    return this.get<UserBlocklistResponse>("/user/blocklist", undefined, options);
  }
}