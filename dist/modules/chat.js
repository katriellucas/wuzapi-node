"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const client = require("../client.js");
class ChatModule extends client.BaseClient {
  /**
   * Send a text message
   */
  async sendText(request, options) {
    return this.post("/chat/send/text", request, options);
  }
  /**
   * Send a PIX payment request (URUPIX extension)
   */
  async sendPix(request, options) {
    return this.post("/chat/send/pix", request, options);
  }
  /**
   * Send a template message with buttons
   */
  async sendTemplate(request, options) {
    return this.post(
      "/chat/send/template",
      request,
      options
    );
  }
  /**
   * Send an audio message
   */
  async sendAudio(request, options) {
    return this.post("/chat/send/audio", request, options);
  }
  /**
   * Send an image message
   */
  async sendImage(request, options) {
    return this.post("/chat/send/image", request, options);
  }
  /**
   * Send a document message
   */
  async sendDocument(request, options) {
    return this.post(
      "/chat/send/document",
      request,
      options
    );
  }
  /**
   * Send a video message
   */
  async sendVideo(request, options) {
    return this.post("/chat/send/video", request, options);
  }
  /**
   * Send a sticker message
   */
  async sendSticker(request, options) {
    return this.post(
      "/chat/send/sticker",
      request,
      options
    );
  }
  /**
   * Send a location message
   */
  async sendLocation(request, options) {
    return this.post(
      "/chat/send/location",
      request,
      options
    );
  }
  /**
   * Send a contact message
   */
  async sendContact(request, options) {
    return this.post(
      "/chat/send/contact",
      request,
      options
    );
  }
  /**
   * Send chat presence indication (typing indicator)
   */
  async sendPresence(request, options) {
    await this.post("/chat/presence", request, options);
  }
  /**
   * Mark messages as read
   */
  async markRead(request, options) {
    return this.post("/chat/markread", request, options);
  }
  /**
   * React to a message
   */
  async react(request, options) {
    return this.post("/chat/react", request, options);
  }
  /**
   * Download an image from a message
   */
  async downloadImage(request, options) {
    return this.post(
      "/chat/downloadimage",
      request,
      options
    );
  }
  /**
   * Download a video from a message
   */
  async downloadVideo(request, options) {
    return this.post(
      "/chat/downloadvideo",
      request,
      options
    );
  }
  /**
   * Download an audio from a message
   */
  async downloadAudio(request, options) {
    return this.post(
      "/chat/downloadaudio",
      request,
      options
    );
  }
  /**
   * Download a document from a message
   */
  async downloadDocument(request, options) {
    return this.post(
      "/chat/downloaddocument",
      request,
      options
    );
  }
  /**
   * Delete (revoke for everyone) a message you sent.
   * Phone is the chat JID/number the message belongs to — required by the server.
   */
  async deleteMessage(messageId, phone, options) {
    const request = { Phone: phone, Id: messageId };
    return this.post("/chat/delete", request, options);
  }
  /**
   * Send interactive buttons message
   */
  async sendButtons(request, options) {
    return this.post(
      "/chat/send/buttons",
      request,
      options
    );
  }
  /**
   * Send list message
   */
  async sendList(phone, buttonText, description, topText, sections, footerText, id, options) {
    const request = {
      Phone: phone,
      ButtonText: buttonText,
      Desc: description,
      TopText: topText,
      Sections: sections,
      FooterText: footerText,
      Id: id
    };
    return this.post("/chat/send/list", request, options);
  }
  /**
   * Send poll message
   */
  async sendPoll(groupJID, header, options, id, requestOptions) {
    const request = {
      Group: groupJID,
      Header: header,
      Options: options,
      Id: id
    };
    return this.post(
      "/chat/send/poll",
      request,
      requestOptions
    );
  }
  /**
   * Edit a message
   */
  async editMessage(messageId, phone, newBody, options) {
    const request = {
      Id: messageId,
      Phone: phone,
      Body: newBody
    };
    return this.post("/chat/send/edit", request, options);
  }
  /**
   * Get chat message history
   */
  async getChatHistory(chatJid, params, options) {
    const query = {
      chat_jid: chatJid,
      limit: params?.limit
    };
    return this.get("/chat/history", query, options);
  }
  /**
   * Request a copy of a message that couldn't be decrypted
   */
  async requestUnavailableMessage(chat, sender, messageId, options) {
    const request = {
      chat,
      sender,
      id: messageId
    };
    return this.post(
      "/chat/request-unavailable-message",
      request,
      options
    );
  }
  /**
   * Archive or unarchive a chat
   */
  async archiveChat(jid, archive, options) {
    const request = { jid, archive };
    return this.post("/chat/archive", request, options);
  }
  /**
   * Download a sticker from a message
   */
  async downloadSticker(request, options) {
    return this.post(
      "/chat/downloadsticker",
      request,
      options
    );
  }
}
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.js.map
