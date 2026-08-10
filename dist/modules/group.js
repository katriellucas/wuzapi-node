"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
class GroupModule extends client.BaseClient {
  /**
   * List all subscribed groups
   */
  async list(options) {
    return this.get("/group/list", void 0, options);
  }
  /**
   * Get group invite link
   */
  async getInviteLink(groupJID, params, options) {
    const query = {
      groupJID,
      reset: params?.reset
    };
    return this.get("/group/invitelink", query, options);
  }
  /**
   * Get group information
   */
  async getInfo(groupJID, options) {
    const query = { groupJID };
    return this.get("/group/info", query, options);
  }
  /**
   * Change group photo (JPEG only)
   */
  async setPhoto(groupJID, image, options) {
    const request = { GroupJID: groupJID, Image: image };
    return this.post("/group/photo", request, options);
  }
  /**
   * Change group name
   */
  async setName(groupJID, name, options) {
    const request = { GroupJID: groupJID, Name: name };
    return this.post("/group/name", request, options);
  }
  /**
   * Create a new group
   */
  async create(name, participants, options) {
    const request = {
      Name: name,
      Participants: participants
    };
    return this.post("/group/create", request, options);
  }
  /**
   * Set group locked status
   */
  async setLocked(groupJID, locked, options) {
    const request = { GroupJID: groupJID, Locked: locked };
    return this.post("/group/locked", request, options);
  }
  /**
   * Set disappearing messages timer
   */
  async setEphemeral(groupJID, duration, options) {
    const request = {
      GroupJID: groupJID,
      Duration: duration
    };
    return this.post(
      "/group/ephemeral",
      request,
      options
    );
  }
  /**
   * Remove group photo
   */
  async removePhoto(groupJID, options) {
    const request = { GroupJID: groupJID };
    return this.post(
      "/group/photo/remove",
      request,
      options
    );
  }
  /**
   * Leave a group
   */
  async leave(groupJID, options) {
    const request = { GroupJID: groupJID };
    return this.post("/group/leave", request, options);
  }
  /**
   * Set group topic/description
   */
  async setTopic(groupJID, topic, options) {
    const request = { GroupJID: groupJID, Topic: topic };
    return this.post("/group/topic", request, options);
  }
  /**
   * Set group announcement setting (only admins can send messages)
   */
  async setAnnounce(groupJID, announce, options) {
    const request = {
      GroupJID: groupJID,
      Announce: announce
    };
    return this.post(
      "/group/announce",
      request,
      options
    );
  }
  /**
   * Join a group using invite link
   */
  async join(inviteCode, options) {
    const request = { Code: inviteCode };
    return this.post("/group/join", request, options);
  }
  /**
   * Get group invite information
   */
  async getInviteInfo(inviteCode, options) {
    const request = { Code: inviteCode };
    return this.post(
      "/group/inviteinfo",
      request,
      options
    );
  }
  /**
   * Update group participants (add/remove/promote/demote)
   */
  async updateParticipants(groupJID, action, participants, options) {
    const request = {
      GroupJID: groupJID,
      Action: action,
      Participants: participants
    };
    return this.post(
      "/group/updateparticipants",
      request,
      options
    );
  }
  /**
   * List participants who have requested to join the group
   */
  async getRequestParticipants(groupJID, options) {
    const query = { groupJID };
    return this.get(
      "/group/requestparticipants",
      query,
      options
    );
  }
  /**
   * Approve or reject pending join requests
   */
  async updateRequestParticipants(groupJID, action, phones, options) {
    const request = {
      GroupJID: groupJID,
      Action: action,
      Phone: phones
    };
    return this.post(
      "/group/updaterequestparticipants",
      request,
      options
    );
  }
  /**
   * Enable or disable group join approval mode
   */
  async setJoinApprovalMode(groupJID, mode, options) {
    const request = {
      groupjid: groupJID,
      mode
    };
    return this.post(
      "/group/joinapprovalmode",
      request,
      options
    );
  }
}
exports.GroupModule = GroupModule;
//# sourceMappingURL=group.js.map
