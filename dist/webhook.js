"use strict";
var WebhookEventType = /* @__PURE__ */ ((WebhookEventType2) => {
  WebhookEventType2["MESSAGE"] = "Message";
  WebhookEventType2["UNDECRYPTABLE_MESSAGE"] = "UndecryptableMessage";
  WebhookEventType2["RECEIPT"] = "Receipt";
  WebhookEventType2["READ_RECEIPT"] = "ReadReceipt";
  WebhookEventType2["MEDIA_RETRY"] = "MediaRetry";
  WebhookEventType2["GROUP_INFO"] = "GroupInfo";
  WebhookEventType2["JOINED_GROUP"] = "JoinedGroup";
  WebhookEventType2["PICTURE"] = "Picture";
  WebhookEventType2["BLOCKLIST_CHANGE"] = "BlocklistChange";
  WebhookEventType2["BLOCKLIST"] = "Blocklist";
  WebhookEventType2["CONNECTED"] = "Connected";
  WebhookEventType2["DISCONNECTED"] = "Disconnected";
  WebhookEventType2["CONNECT_FAILURE"] = "ConnectFailure";
  WebhookEventType2["KEEP_ALIVE_RESTORED"] = "KeepAliveRestored";
  WebhookEventType2["KEEP_ALIVE_TIMEOUT"] = "KeepAliveTimeout";
  WebhookEventType2["LOGGED_OUT"] = "LoggedOut";
  WebhookEventType2["CLIENT_OUTDATED"] = "ClientOutdated";
  WebhookEventType2["TEMPORARY_BAN"] = "TemporaryBan";
  WebhookEventType2["STREAM_ERROR"] = "StreamError";
  WebhookEventType2["STREAM_REPLACED"] = "StreamReplaced";
  WebhookEventType2["PAIR_SUCCESS"] = "PairSuccess";
  WebhookEventType2["PAIR_ERROR"] = "PairError";
  WebhookEventType2["QR"] = "QR";
  WebhookEventType2["QR_SCANNED_WITHOUT_MULTIDEVICE"] = "QRScannedWithoutMultidevice";
  WebhookEventType2["QR_TIMEOUT"] = "QRTimeout";
  WebhookEventType2["PRIVACY_SETTINGS"] = "PrivacySettings";
  WebhookEventType2["PUSH_NAME_SETTING"] = "PushNameSetting";
  WebhookEventType2["USER_ABOUT"] = "UserAbout";
  WebhookEventType2["APP_STATE"] = "AppState";
  WebhookEventType2["APP_STATE_SYNC_COMPLETE"] = "AppStateSyncComplete";
  WebhookEventType2["HISTORY_SYNC"] = "HistorySync";
  WebhookEventType2["OFFLINE_SYNC_COMPLETED"] = "OfflineSyncCompleted";
  WebhookEventType2["OFFLINE_SYNC_PREVIEW"] = "OfflineSyncPreview";
  WebhookEventType2["CALL_OFFER"] = "CallOffer";
  WebhookEventType2["CALL_ACCEPT"] = "CallAccept";
  WebhookEventType2["CALL_TERMINATE"] = "CallTerminate";
  WebhookEventType2["CALL_OFFER_NOTICE"] = "CallOfferNotice";
  WebhookEventType2["CALL_RELAY_LATENCY"] = "CallRelayLatency";
  WebhookEventType2["PRESENCE"] = "Presence";
  WebhookEventType2["CHAT_PRESENCE"] = "ChatPresence";
  WebhookEventType2["IDENTITY_CHANGE"] = "IdentityChange";
  WebhookEventType2["CAT_REFRESH_ERROR"] = "CATRefreshError";
  WebhookEventType2["NEWSLETTER_JOIN"] = "NewsletterJoin";
  WebhookEventType2["NEWSLETTER_LEAVE"] = "NewsletterLeave";
  WebhookEventType2["NEWSLETTER_MUTE_CHANGE"] = "NewsletterMuteChange";
  WebhookEventType2["NEWSLETTER_LIVE_UPDATE"] = "NewsletterLiveUpdate";
  WebhookEventType2["FB_MESSAGE"] = "FBMessage";
  WebhookEventType2["ALL"] = "All";
  return WebhookEventType2;
})(WebhookEventType || {});
const WEBHOOK_EVENTS = Object.values(WebhookEventType);
var MessageType = /* @__PURE__ */ ((MessageType2) => {
  MessageType2["TEXT"] = "conversation";
  MessageType2["EXTENDED_TEXT"] = "extendedTextMessage";
  MessageType2["IMAGE"] = "imageMessage";
  MessageType2["VIDEO"] = "videoMessage";
  MessageType2["AUDIO"] = "audioMessage";
  MessageType2["DOCUMENT"] = "documentMessage";
  MessageType2["CONTACT"] = "contactMessage";
  MessageType2["LOCATION"] = "locationMessage";
  MessageType2["STICKER"] = "stickerMessage";
  MessageType2["REACTION"] = "reactionMessage";
  MessageType2["EDITED"] = "editedMessage";
  MessageType2["PROTOCOL"] = "protocolMessage";
  MessageType2["DEVICE_SENT"] = "deviceSentMessage";
  MessageType2["BUTTONS"] = "buttonsMessage";
  MessageType2["LIST"] = "listMessage";
  MessageType2["TEMPLATE"] = "templateMessage";
  MessageType2["BUTTONS_RESPONSE"] = "buttonsResponseMessage";
  MessageType2["LIST_RESPONSE"] = "listResponseMessage";
  MessageType2["GROUP_INVITE"] = "groupInviteMessage";
  MessageType2["POLL"] = "pollCreationMessage";
  MessageType2["POLL_CREATION"] = "pollCreationMessageV3";
  MessageType2["POLL_UPDATE"] = "pollUpdateMessage";
  MessageType2["VIEW_ONCE"] = "viewOnceMessage";
  MessageType2["UNKNOWN"] = "unknown";
  return MessageType2;
})(MessageType || {});
function isWebhookEventType(payload, eventType) {
  return payload.type === eventType;
}
function hasS3Media(payload) {
  return !!payload.s3;
}
function hasBase64Media(payload) {
  return !!payload.base64;
}
function hasBothMedia(payload) {
  return hasS3Media(payload) && hasBase64Media(payload);
}
function isValidWebhookPayload(payload) {
  return typeof payload === "object" && payload !== null && "event" in payload && "type" in payload && "token" in payload;
}
function discoverMessageType(message) {
  if (!message) return "unknown";
  if (message.conversation) return "conversation";
  if (message.extendedTextMessage) return "extendedTextMessage";
  if (message.imageMessage) return "imageMessage";
  if (message.videoMessage) return "videoMessage";
  if (message.audioMessage) return "audioMessage";
  if (message.documentMessage) return "documentMessage";
  if (message.contactMessage) return "contactMessage";
  if (message.locationMessage) return "locationMessage";
  if (message.stickerMessage) return "stickerMessage";
  if (message.reactionMessage) return "reactionMessage";
  if (message.buttonsMessage) return "buttonsMessage";
  if (message.listMessage) return "listMessage";
  if (message.templateMessage) return "templateMessage";
  if (message.buttonsResponseMessage) return "buttonsResponseMessage";
  if (message.listResponseMessage) return "listResponseMessage";
  if (message.groupInviteMessage) return "groupInviteMessage";
  if (message.pollCreationMessage) return "pollCreationMessage";
  if (message.pollCreationMessageV3) return "pollCreationMessageV3";
  if (message.pollUpdateMessage) return "pollUpdateMessage";
  if (message.viewOnceMessage) return "viewOnceMessage";
  if (message.editedMessage) return "editedMessage";
  if (message.protocolMessage) return "protocolMessage";
  if (message.deviceSentMessage) return "deviceSentMessage";
  return "unknown";
}
exports.MessageType = MessageType;
exports.WEBHOOK_EVENTS = WEBHOOK_EVENTS;
exports.WebhookEventType = WebhookEventType;
exports.discoverMessageType = discoverMessageType;
exports.hasBase64Media = hasBase64Media;
exports.hasBothMedia = hasBothMedia;
exports.hasS3Media = hasS3Media;
exports.isValidWebhookPayload = isValidWebhookPayload;
exports.isWebhookEventType = isWebhookEventType;
//# sourceMappingURL=webhook.js.map
