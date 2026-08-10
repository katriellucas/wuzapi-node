import { BaseClient } from '../client.js';
import { RequestOptions } from '../types/common.js';
import { UserInfoResponse, UserCheckResponse, UserAvatarResponse, ContactsResponse, UserPresenceResponse, UserLidResponse, UserPrivacySettings, PrivacySettingValueMap, UserBlockRequest, UserBlockResponse, UserUnblockResponse, UserBlocklistResponse } from '../types/user.js';
export declare class UserModule extends BaseClient {
    /**
     * Get user details for specified phone numbers
     */
    getInfo(phones: string[], options?: RequestOptions): Promise<UserInfoResponse>;
    /**
     * Check if phone numbers are registered WhatsApp users
     */
    check(phones: string[], options?: RequestOptions): Promise<UserCheckResponse>;
    /**
     * Get user avatar/profile picture
     */
    getAvatar(phone: string, params?: {
        preview?: boolean;
    }, options?: RequestOptions): Promise<UserAvatarResponse>;
    /**
     * Get contacts list
     * @param params - Optional query filters (e.g. { savedOnly: true })
     * @param options - Optional per-request options
     */
    getContacts(params?: {
        savedOnly?: boolean;
    }, options?: RequestOptions): Promise<ContactsResponse>;
    /**
     * Send user presence (available/unavailable status)
     */
    sendPresence(presenceType: "available" | "unavailable", options?: RequestOptions): Promise<UserPresenceResponse>;
    /**
     * Subscribe to a contact's presence updates (online/offline status)
     */
    subscribePresence(phone: string, options?: RequestOptions): Promise<{
        Details: string;
    }>;
    /**
     * Get LID (Linked ID) from phone number or JID
     */
    getLid(phone: string, options?: RequestOptions): Promise<UserLidResponse>;
    /**
     * Get user privacy settings
     */
    getPrivacy(options?: RequestOptions): Promise<UserPrivacySettings>;
    /**
     * Set a user privacy setting
     */
    setPrivacy<K extends keyof PrivacySettingValueMap>(name: K, value: PrivacySettingValueMap[K], options?: RequestOptions): Promise<Partial<UserPrivacySettings>>;
    /**
     * Block a WhatsApp user
     */
    blockUser(request: UserBlockRequest, options?: RequestOptions): Promise<UserBlockResponse>;
    /**
     * Unblock a WhatsApp user
     */
    unblockUser(request: UserBlockRequest, options?: RequestOptions): Promise<UserUnblockResponse>;
    /**
     * Get the current blocklist
     */
    getBlocklist(options?: RequestOptions): Promise<UserBlocklistResponse>;
}
