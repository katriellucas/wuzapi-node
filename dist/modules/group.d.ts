import { BaseClient } from '../client.js';
import { RequestOptions } from '../types/common.js';
import { GroupListResponse, GroupInviteLinkResponse, GroupInfo, GroupPhotoResponse, GroupNameResponse, GroupCreateResponse, GroupLockedResponse, GroupEphemeralResponse, GroupPhotoRemoveResponse, GroupLeaveResponse, GroupTopicResponse, GroupAnnounceResponse, GroupJoinResponse, GroupInviteInfoResponse, GroupUpdateParticipantsResponse, GroupRequestParticipantsResponse, UpdateGroupRequestParticipantsResponse, SetGroupJoinApprovalModeResponse } from '../types/group.js';
export declare class GroupModule extends BaseClient {
    /**
     * List all subscribed groups
     */
    list(options?: RequestOptions): Promise<GroupListResponse>;
    /**
     * Get group invite link
     */
    getInviteLink(groupJID: string, params?: {
        reset?: boolean;
    }, options?: RequestOptions): Promise<GroupInviteLinkResponse>;
    /**
     * Get group information
     */
    getInfo(groupJID: string, options?: RequestOptions): Promise<GroupInfo>;
    /**
     * Change group photo (JPEG only)
     */
    setPhoto(groupJID: string, image: string, options?: RequestOptions): Promise<GroupPhotoResponse>;
    /**
     * Change group name
     */
    setName(groupJID: string, name: string, options?: RequestOptions): Promise<GroupNameResponse>;
    /**
     * Create a new group
     */
    create(name: string, participants: string[], options?: RequestOptions): Promise<GroupCreateResponse>;
    /**
     * Set group locked status
     */
    setLocked(groupJID: string, locked: boolean, options?: RequestOptions): Promise<GroupLockedResponse>;
    /**
     * Set disappearing messages timer
     */
    setEphemeral(groupJID: string, duration: "24h" | "7d" | "90d" | "off", options?: RequestOptions): Promise<GroupEphemeralResponse>;
    /**
     * Remove group photo
     */
    removePhoto(groupJID: string, options?: RequestOptions): Promise<GroupPhotoRemoveResponse>;
    /**
     * Leave a group
     */
    leave(groupJID: string, options?: RequestOptions): Promise<GroupLeaveResponse>;
    /**
     * Set group topic/description
     */
    setTopic(groupJID: string, topic: string, options?: RequestOptions): Promise<GroupTopicResponse>;
    /**
     * Set group announcement setting (only admins can send messages)
     */
    setAnnounce(groupJID: string, announce: boolean, options?: RequestOptions): Promise<GroupAnnounceResponse>;
    /**
     * Join a group using invite link
     */
    join(inviteCode: string, options?: RequestOptions): Promise<GroupJoinResponse>;
    /**
     * Get group invite information
     */
    getInviteInfo(inviteCode: string, options?: RequestOptions): Promise<GroupInviteInfoResponse>;
    /**
     * Update group participants (add/remove/promote/demote)
     */
    updateParticipants(groupJID: string, action: "add" | "remove" | "promote" | "demote", participants: string[], options?: RequestOptions): Promise<GroupUpdateParticipantsResponse>;
    /**
     * List participants who have requested to join the group
     */
    getRequestParticipants(groupJID: string, options?: RequestOptions): Promise<GroupRequestParticipantsResponse>;
    /**
     * Approve or reject pending join requests
     */
    updateRequestParticipants(groupJID: string, action: "approve" | "reject", phones: string[], options?: RequestOptions): Promise<UpdateGroupRequestParticipantsResponse>;
    /**
     * Enable or disable group join approval mode
     */
    setJoinApprovalMode(groupJID: string, mode: boolean, options?: RequestOptions): Promise<SetGroupJoinApprovalModeResponse>;
}
