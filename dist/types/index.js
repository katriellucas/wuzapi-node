"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const webhook = require("../webhook.js");
var DisappearingModeInitiator = /* @__PURE__ */ ((DisappearingModeInitiator2) => {
  DisappearingModeInitiator2[DisappearingModeInitiator2["CHANGED_IN_CHAT"] = 0] = "CHANGED_IN_CHAT";
  DisappearingModeInitiator2[DisappearingModeInitiator2["INITIATED_BY_ME"] = 1] = "INITIATED_BY_ME";
  DisappearingModeInitiator2[DisappearingModeInitiator2["INITIATED_BY_OTHER"] = 2] = "INITIATED_BY_OTHER";
  return DisappearingModeInitiator2;
})(DisappearingModeInitiator || {});
var DisappearingModeTrigger = /* @__PURE__ */ ((DisappearingModeTrigger2) => {
  DisappearingModeTrigger2[DisappearingModeTrigger2["UNKNOWN"] = 0] = "UNKNOWN";
  DisappearingModeTrigger2[DisappearingModeTrigger2["CHAT_SETTING"] = 1] = "CHAT_SETTING";
  DisappearingModeTrigger2[DisappearingModeTrigger2["ACCOUNT_SETTING"] = 2] = "ACCOUNT_SETTING";
  DisappearingModeTrigger2[DisappearingModeTrigger2["BULK_CHANGE"] = 3] = "BULK_CHANGE";
  return DisappearingModeTrigger2;
})(DisappearingModeTrigger || {});
var MediaType = /* @__PURE__ */ ((MediaType2) => {
  MediaType2[MediaType2["UNKNOWN"] = 0] = "UNKNOWN";
  MediaType2[MediaType2["IMAGE"] = 1] = "IMAGE";
  MediaType2[MediaType2["VIDEO"] = 2] = "VIDEO";
  MediaType2[MediaType2["AUDIO"] = 3] = "AUDIO";
  MediaType2[MediaType2["DOCUMENT"] = 4] = "DOCUMENT";
  MediaType2[MediaType2["STICKER"] = 5] = "STICKER";
  return MediaType2;
})(MediaType || {});
var VideoAttribution = /* @__PURE__ */ ((VideoAttribution2) => {
  VideoAttribution2[VideoAttribution2["NONE"] = 0] = "NONE";
  VideoAttribution2[VideoAttribution2["GIPHY"] = 1] = "GIPHY";
  VideoAttribution2[VideoAttribution2["TENOR"] = 2] = "TENOR";
  VideoAttribution2[VideoAttribution2["KLIPY"] = 3] = "KLIPY";
  return VideoAttribution2;
})(VideoAttribution || {});
var VideoSourceType = /* @__PURE__ */ ((VideoSourceType2) => {
  VideoSourceType2[VideoSourceType2["USER_VIDEO"] = 0] = "USER_VIDEO";
  VideoSourceType2[VideoSourceType2["AI_GENERATED"] = 1] = "AI_GENERATED";
  return VideoSourceType2;
})(VideoSourceType || {});
var ExtendedTextMessageFontType = /* @__PURE__ */ ((ExtendedTextMessageFontType2) => {
  ExtendedTextMessageFontType2[ExtendedTextMessageFontType2["SANS_SERIF"] = 0] = "SANS_SERIF";
  ExtendedTextMessageFontType2[ExtendedTextMessageFontType2["SERIF"] = 1] = "SERIF";
  ExtendedTextMessageFontType2[ExtendedTextMessageFontType2["NORICAN_REGULAR"] = 2] = "NORICAN_REGULAR";
  ExtendedTextMessageFontType2[ExtendedTextMessageFontType2["BRYNDAN_WRITE"] = 3] = "BRYNDAN_WRITE";
  ExtendedTextMessageFontType2[ExtendedTextMessageFontType2["BEBASNEUE_REGULAR"] = 4] = "BEBASNEUE_REGULAR";
  ExtendedTextMessageFontType2[ExtendedTextMessageFontType2["OSWALD_HEAVY"] = 5] = "OSWALD_HEAVY";
  return ExtendedTextMessageFontType2;
})(ExtendedTextMessageFontType || {});
var ExtendedTextMessagePreviewType = /* @__PURE__ */ ((ExtendedTextMessagePreviewType2) => {
  ExtendedTextMessagePreviewType2[ExtendedTextMessagePreviewType2["NONE"] = 0] = "NONE";
  ExtendedTextMessagePreviewType2[ExtendedTextMessagePreviewType2["VIDEO"] = 1] = "VIDEO";
  ExtendedTextMessagePreviewType2[ExtendedTextMessagePreviewType2["PLACEHOLDER"] = 4] = "PLACEHOLDER";
  ExtendedTextMessagePreviewType2[ExtendedTextMessagePreviewType2["IMAGE"] = 5] = "IMAGE";
  return ExtendedTextMessagePreviewType2;
})(ExtendedTextMessagePreviewType || {});
var ExtendedTextMessageInviteLinkGroupType = /* @__PURE__ */ ((ExtendedTextMessageInviteLinkGroupType2) => {
  ExtendedTextMessageInviteLinkGroupType2[ExtendedTextMessageInviteLinkGroupType2["DEFAULT"] = 0] = "DEFAULT";
  ExtendedTextMessageInviteLinkGroupType2[ExtendedTextMessageInviteLinkGroupType2["PARENT"] = 1] = "PARENT";
  ExtendedTextMessageInviteLinkGroupType2[ExtendedTextMessageInviteLinkGroupType2["SUB"] = 2] = "SUB";
  ExtendedTextMessageInviteLinkGroupType2[ExtendedTextMessageInviteLinkGroupType2["DEFAULT_SUB"] = 3] = "DEFAULT_SUB";
  return ExtendedTextMessageInviteLinkGroupType2;
})(ExtendedTextMessageInviteLinkGroupType || {});
var InviteLinkGroupType = /* @__PURE__ */ ((InviteLinkGroupType2) => {
  InviteLinkGroupType2[InviteLinkGroupType2["DEFAULT"] = 0] = "DEFAULT";
  InviteLinkGroupType2[InviteLinkGroupType2["PARENT"] = 1] = "PARENT";
  InviteLinkGroupType2[InviteLinkGroupType2["SUB"] = 2] = "SUB";
  InviteLinkGroupType2[InviteLinkGroupType2["DEFAULT_SUB"] = 3] = "DEFAULT_SUB";
  return InviteLinkGroupType2;
})(InviteLinkGroupType || {});
var ButtonType = /* @__PURE__ */ ((ButtonType2) => {
  ButtonType2[ButtonType2["UNKNOWN"] = 0] = "UNKNOWN";
  ButtonType2[ButtonType2["RESPONSE"] = 1] = "RESPONSE";
  ButtonType2[ButtonType2["NATIVE_FLOW"] = 2] = "NATIVE_FLOW";
  return ButtonType2;
})(ButtonType || {});
var ButtonsMessageHeaderType = /* @__PURE__ */ ((ButtonsMessageHeaderType2) => {
  ButtonsMessageHeaderType2[ButtonsMessageHeaderType2["UNKNOWN"] = 0] = "UNKNOWN";
  ButtonsMessageHeaderType2[ButtonsMessageHeaderType2["EMPTY"] = 1] = "EMPTY";
  ButtonsMessageHeaderType2[ButtonsMessageHeaderType2["TEXT"] = 2] = "TEXT";
  ButtonsMessageHeaderType2[ButtonsMessageHeaderType2["DOCUMENT"] = 3] = "DOCUMENT";
  ButtonsMessageHeaderType2[ButtonsMessageHeaderType2["IMAGE"] = 4] = "IMAGE";
  ButtonsMessageHeaderType2[ButtonsMessageHeaderType2["VIDEO"] = 5] = "VIDEO";
  ButtonsMessageHeaderType2[ButtonsMessageHeaderType2["LOCATION"] = 6] = "LOCATION";
  return ButtonsMessageHeaderType2;
})(ButtonsMessageHeaderType || {});
var ListMessageListType = /* @__PURE__ */ ((ListMessageListType2) => {
  ListMessageListType2[ListMessageListType2["UNKNOWN"] = 0] = "UNKNOWN";
  ListMessageListType2[ListMessageListType2["SINGLE_SELECT"] = 1] = "SINGLE_SELECT";
  ListMessageListType2[ListMessageListType2["PRODUCT_LIST"] = 2] = "PRODUCT_LIST";
  return ListMessageListType2;
})(ListMessageListType || {});
var ButtonsResponseMessageType = /* @__PURE__ */ ((ButtonsResponseMessageType2) => {
  ButtonsResponseMessageType2[ButtonsResponseMessageType2["UNKNOWN"] = 0] = "UNKNOWN";
  ButtonsResponseMessageType2[ButtonsResponseMessageType2["DISPLAY_TEXT"] = 1] = "DISPLAY_TEXT";
  return ButtonsResponseMessageType2;
})(ButtonsResponseMessageType || {});
var ListResponseMessageListType = /* @__PURE__ */ ((ListResponseMessageListType2) => {
  ListResponseMessageListType2[ListResponseMessageListType2["UNKNOWN"] = 0] = "UNKNOWN";
  ListResponseMessageListType2[ListResponseMessageListType2["SINGLE_SELECT"] = 1] = "SINGLE_SELECT";
  return ListResponseMessageListType2;
})(ListResponseMessageListType || {});
var PaymentBackgroundType = /* @__PURE__ */ ((PaymentBackgroundType2) => {
  PaymentBackgroundType2[PaymentBackgroundType2["UNKNOWN"] = 0] = "UNKNOWN";
  PaymentBackgroundType2[PaymentBackgroundType2["DEFAULT"] = 1] = "DEFAULT";
  return PaymentBackgroundType2;
})(PaymentBackgroundType || {});
var ProtocolMessageType = /* @__PURE__ */ ((ProtocolMessageType2) => {
  ProtocolMessageType2[ProtocolMessageType2["REVOKE"] = 0] = "REVOKE";
  ProtocolMessageType2[ProtocolMessageType2["EPHEMERAL_SETTING"] = 3] = "EPHEMERAL_SETTING";
  ProtocolMessageType2[ProtocolMessageType2["EPHEMERAL_SYNC_RESPONSE"] = 4] = "EPHEMERAL_SYNC_RESPONSE";
  ProtocolMessageType2[ProtocolMessageType2["HISTORY_SYNC_NOTIFICATION"] = 5] = "HISTORY_SYNC_NOTIFICATION";
  ProtocolMessageType2[ProtocolMessageType2["APP_STATE_SYNC_KEY_SHARE"] = 6] = "APP_STATE_SYNC_KEY_SHARE";
  ProtocolMessageType2[ProtocolMessageType2["APP_STATE_SYNC_KEY_REQUEST"] = 7] = "APP_STATE_SYNC_KEY_REQUEST";
  ProtocolMessageType2[ProtocolMessageType2["MSG_FANOUT_BACKFILL_REQUEST"] = 8] = "MSG_FANOUT_BACKFILL_REQUEST";
  ProtocolMessageType2[ProtocolMessageType2["INITIAL_SECURITY_NOTIFICATION_SETTING_SYNC"] = 9] = "INITIAL_SECURITY_NOTIFICATION_SETTING_SYNC";
  ProtocolMessageType2[ProtocolMessageType2["APP_STATE_FATAL_EXCEPTION_NOTIFICATION"] = 10] = "APP_STATE_FATAL_EXCEPTION_NOTIFICATION";
  ProtocolMessageType2[ProtocolMessageType2["SHARE_PHONE_NUMBER"] = 11] = "SHARE_PHONE_NUMBER";
  ProtocolMessageType2[ProtocolMessageType2["MESSAGE_EDIT"] = 14] = "MESSAGE_EDIT";
  ProtocolMessageType2[ProtocolMessageType2["PEER_DATA_OPERATION_REQUEST_MESSAGE"] = 16] = "PEER_DATA_OPERATION_REQUEST_MESSAGE";
  ProtocolMessageType2[ProtocolMessageType2["PEER_DATA_OPERATION_REQUEST_RESPONSE_MESSAGE"] = 17] = "PEER_DATA_OPERATION_REQUEST_RESPONSE_MESSAGE";
  return ProtocolMessageType2;
})(ProtocolMessageType || {});
var BotPluginType = /* @__PURE__ */ ((BotPluginType2) => {
  BotPluginType2[BotPluginType2["REELS"] = 0] = "REELS";
  BotPluginType2[BotPluginType2["SEARCH"] = 1] = "SEARCH";
  return BotPluginType2;
})(BotPluginType || {});
var BotPluginSearchProvider = /* @__PURE__ */ ((BotPluginSearchProvider2) => {
  BotPluginSearchProvider2[BotPluginSearchProvider2["BING"] = 0] = "BING";
  BotPluginSearchProvider2[BotPluginSearchProvider2["GOOGLE"] = 1] = "GOOGLE";
  return BotPluginSearchProvider2;
})(BotPluginSearchProvider || {});
var HistorySyncNotificationHistorySyncType = /* @__PURE__ */ ((HistorySyncNotificationHistorySyncType2) => {
  HistorySyncNotificationHistorySyncType2[HistorySyncNotificationHistorySyncType2["INITIAL_BOOTSTRAP"] = 0] = "INITIAL_BOOTSTRAP";
  HistorySyncNotificationHistorySyncType2[HistorySyncNotificationHistorySyncType2["INITIAL_STATUS_V3"] = 1] = "INITIAL_STATUS_V3";
  HistorySyncNotificationHistorySyncType2[HistorySyncNotificationHistorySyncType2["FULL"] = 2] = "FULL";
  HistorySyncNotificationHistorySyncType2[HistorySyncNotificationHistorySyncType2["RECENT"] = 3] = "RECENT";
  HistorySyncNotificationHistorySyncType2[HistorySyncNotificationHistorySyncType2["PUSH_NAME"] = 4] = "PUSH_NAME";
  HistorySyncNotificationHistorySyncType2[HistorySyncNotificationHistorySyncType2["NON_BLOCKING_DATA"] = 5] = "NON_BLOCKING_DATA";
  HistorySyncNotificationHistorySyncType2[HistorySyncNotificationHistorySyncType2["ON_DEMAND"] = 6] = "ON_DEMAND";
  return HistorySyncNotificationHistorySyncType2;
})(HistorySyncNotificationHistorySyncType || {});
var PeerDataOperationRequestType = /* @__PURE__ */ ((PeerDataOperationRequestType2) => {
  PeerDataOperationRequestType2[PeerDataOperationRequestType2["UPLOAD_STICKER"] = 0] = "UPLOAD_STICKER";
  PeerDataOperationRequestType2[PeerDataOperationRequestType2["SEND_RECENT_STICKER_BOOTSTRAP"] = 1] = "SEND_RECENT_STICKER_BOOTSTRAP";
  PeerDataOperationRequestType2[PeerDataOperationRequestType2["GENERATE_LINK_PREVIEW"] = 2] = "GENERATE_LINK_PREVIEW";
  return PeerDataOperationRequestType2;
})(PeerDataOperationRequestType || {});
var PeerDataOperationRequestResponseMessagePeerDataOperationResult = /* @__PURE__ */ ((PeerDataOperationRequestResponseMessagePeerDataOperationResult2) => {
  PeerDataOperationRequestResponseMessagePeerDataOperationResult2[PeerDataOperationRequestResponseMessagePeerDataOperationResult2["SUCCESS"] = 0] = "SUCCESS";
  PeerDataOperationRequestResponseMessagePeerDataOperationResult2[PeerDataOperationRequestResponseMessagePeerDataOperationResult2["NOT_AUTHORIZED"] = 1] = "NOT_AUTHORIZED";
  PeerDataOperationRequestResponseMessagePeerDataOperationResult2[PeerDataOperationRequestResponseMessagePeerDataOperationResult2["NOT_FOUND"] = 2] = "NOT_FOUND";
  PeerDataOperationRequestResponseMessagePeerDataOperationResult2[PeerDataOperationRequestResponseMessagePeerDataOperationResult2["THROTTLED"] = 3] = "THROTTLED";
  PeerDataOperationRequestResponseMessagePeerDataOperationResult2[PeerDataOperationRequestResponseMessagePeerDataOperationResult2["UNKNOWN_ERROR"] = 4] = "UNKNOWN_ERROR";
  return PeerDataOperationRequestResponseMessagePeerDataOperationResult2;
})(PeerDataOperationRequestResponseMessagePeerDataOperationResult || {});
function getMessageContent(message) {
  if (message.conversation) {
    return { type: "text", content: message.conversation };
  }
  if (message.extendedTextMessage) {
    return { type: "extendedText", content: message.extendedTextMessage };
  }
  if (message.imageMessage) {
    return { type: "image", content: message.imageMessage };
  }
  if (message.videoMessage) {
    return { type: "video", content: message.videoMessage };
  }
  if (message.audioMessage) {
    return { type: "audio", content: message.audioMessage };
  }
  if (message.documentMessage) {
    return { type: "document", content: message.documentMessage };
  }
  if (message.stickerMessage) {
    return { type: "sticker", content: message.stickerMessage };
  }
  if (message.locationMessage) {
    return { type: "location", content: message.locationMessage };
  }
  if (message.liveLocationMessage) {
    return { type: "liveLocation", content: message.liveLocationMessage };
  }
  if (message.contactMessage) {
    return { type: "contact", content: message.contactMessage };
  }
  if (message.contactsArrayMessage) {
    return { type: "contactsArray", content: message.contactsArrayMessage };
  }
  if (message.buttonsMessage) {
    return { type: "buttons", content: message.buttonsMessage };
  }
  if (message.listMessage) {
    return { type: "list", content: message.listMessage };
  }
  if (message.templateMessage) {
    return { type: "template", content: message.templateMessage };
  }
  if (message.buttonsResponseMessage) {
    return { type: "buttonsResponse", content: message.buttonsResponseMessage };
  }
  if (message.listResponseMessage) {
    return { type: "listResponse", content: message.listResponseMessage };
  }
  if (message.groupInviteMessage) {
    return { type: "groupInvite", content: message.groupInviteMessage };
  }
  if (message.pollCreationMessage) {
    return { type: "poll", content: message.pollCreationMessage };
  }
  if (message.pollUpdateMessage) {
    return { type: "pollUpdate", content: message.pollUpdateMessage };
  }
  if (message.reactionMessage) {
    return { type: "reaction", content: message.reactionMessage };
  }
  if (message.protocolMessage) {
    return { type: "protocol", content: message.protocolMessage };
  }
  if (message.ephemeralMessage) {
    return { type: "ephemeral", content: message.ephemeralMessage };
  }
  if (message.viewOnceMessage) {
    return { type: "viewOnce", content: message.viewOnceMessage };
  }
  return null;
}
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2["MESSAGE"] = "Message";
  EventType2["RECEIPT"] = "Receipt";
  EventType2["PRESENCE"] = "Presence";
  EventType2["CHAT_PRESENCE"] = "ChatPresence";
  EventType2["CONNECTED"] = "Connected";
  EventType2["DISCONNECTED"] = "Disconnected";
  EventType2["LOGGED_OUT"] = "LoggedOut";
  EventType2["QR"] = "QR";
  EventType2["QR_SCANNED_WITHOUT_MULTIDEVICE"] = "QRScannedWithoutMultidevice";
  EventType2["PAIR_SUCCESS"] = "PairSuccess";
  EventType2["PAIR_ERROR"] = "PairError";
  EventType2["MANUAL_LOGIN_RECONNECT"] = "ManualLoginReconnect";
  EventType2["KEEP_ALIVE_RESTORED"] = "KeepAliveRestored";
  EventType2["KEEP_ALIVE_TIMEOUT"] = "KeepAliveTimeout";
  EventType2["GROUP_INFO"] = "GroupInfo";
  EventType2["JOINED_GROUP"] = "JoinedGroup";
  EventType2["CONTACT"] = "Contact";
  EventType2["PUSH_NAME"] = "PushName";
  EventType2["PUSH_NAME_SETTING"] = "PushNameSetting";
  EventType2["PICTURE"] = "Picture";
  EventType2["USER_ABOUT"] = "UserAbout";
  EventType2["USER_STATUS_MUTE"] = "UserStatusMute";
  EventType2["PRIVACY_SETTINGS"] = "PrivacySettings";
  EventType2["APP_STATE"] = "AppState";
  EventType2["APP_STATE_SYNC_COMPLETE"] = "AppStateSyncComplete";
  EventType2["HISTORY_SYNC"] = "HistorySync";
  EventType2["OFFLINE_SYNC_COMPLETED"] = "OfflineSyncCompleted";
  EventType2["OFFLINE_SYNC_PREVIEW"] = "OfflineSyncPreview";
  EventType2["IDENTITY_CHANGE"] = "IdentityChange";
  EventType2["ARCHIVE"] = "Archive";
  EventType2["UNARCHIVE_CHATS_SETTING"] = "UnarchiveChatsSetting";
  EventType2["CLEAR_CHAT"] = "ClearChat";
  EventType2["DELETE_CHAT"] = "DeleteChat";
  EventType2["DELETE_FOR_ME"] = "DeleteForMe";
  EventType2["MARK_CHAT_AS_READ"] = "MarkChatAsRead";
  EventType2["MUTE"] = "Mute";
  EventType2["PIN"] = "Pin";
  EventType2["STAR"] = "Star";
  EventType2["LABEL_ASSOCIATION_CHAT"] = "LabelAssociationChat";
  EventType2["LABEL_ASSOCIATION_MESSAGE"] = "LabelAssociationMessage";
  EventType2["LABEL_EDIT"] = "LabelEdit";
  EventType2["MEDIA_RETRY"] = "MediaRetry";
  EventType2["MEDIA_RETRY_ERROR"] = "MediaRetryError";
  EventType2["NEWSLETTER_JOIN"] = "NewsletterJoin";
  EventType2["NEWSLETTER_LEAVE"] = "NewsletterLeave";
  EventType2["NEWSLETTER_LIVE_UPDATE"] = "NewsletterLiveUpdate";
  EventType2["NEWSLETTER_MESSAGE_META"] = "NewsletterMessageMeta";
  EventType2["NEWSLETTER_MUTE_CHANGE"] = "NewsletterMuteChange";
  EventType2["UNDECRYPTABLE_MESSAGE"] = "UndecryptableMessage";
  EventType2["STREAM_ERROR"] = "StreamError";
  EventType2["STREAM_REPLACED"] = "StreamReplaced";
  EventType2["CONNECT_FAILURE"] = "ConnectFailure";
  EventType2["CLIENT_OUTDATED"] = "ClientOutdated";
  EventType2["TEMPORARY_BAN"] = "TemporaryBan";
  EventType2["CAT_REFRESH_ERROR"] = "CATRefreshError";
  EventType2["PERMANENT_DISCONNECT"] = "PermanentDisconnect";
  EventType2["BLOCKLIST"] = "Blocklist";
  EventType2["BLOCKLIST_ACTION"] = "BlocklistAction";
  EventType2["BLOCKLIST_CHANGE"] = "BlocklistChange";
  EventType2["BUSINESS_NAME"] = "BusinessName";
  EventType2["CALL_ACCEPT"] = "CallAccept";
  EventType2["CALL_OFFER"] = "CallOffer";
  EventType2["CALL_OFFER_NOTICE"] = "CallOfferNotice";
  EventType2["CALL_PRE_ACCEPT"] = "CallPreAccept";
  EventType2["CALL_REJECT"] = "CallReject";
  EventType2["CALL_RELAY_LATENCY"] = "CallRelayLatency";
  EventType2["CALL_TERMINATE"] = "CallTerminate";
  EventType2["CALL_TRANSPORT"] = "CallTransport";
  EventType2["UNKNOWN_CALL_EVENT"] = "UnknownCallEvent";
  EventType2["FB_MESSAGE"] = "FBMessage";
  return EventType2;
})(EventType || {});
var MessageStatus = /* @__PURE__ */ ((MessageStatus2) => {
  MessageStatus2["ERROR"] = "ERROR";
  MessageStatus2["PENDING"] = "PENDING";
  MessageStatus2["SERVER_ACK"] = "SERVER_ACK";
  MessageStatus2["DELIVERY_ACK"] = "DELIVERY_ACK";
  MessageStatus2["READ"] = "READ";
  MessageStatus2["PLAYED"] = "PLAYED";
  return MessageStatus2;
})(MessageStatus || {});
var ReceiptType = /* @__PURE__ */ ((ReceiptType2) => {
  ReceiptType2["UNKNOWN"] = "";
  ReceiptType2["DELIVERY"] = "delivery";
  ReceiptType2["READ"] = "read";
  ReceiptType2["READ_SELF"] = "read-self";
  ReceiptType2["PLAYED"] = "played";
  ReceiptType2["SENDER"] = "sender";
  ReceiptType2["INACTIVE"] = "inactive";
  ReceiptType2["PEER_MSG"] = "peer_msg";
  return ReceiptType2;
})(ReceiptType || {});
var DecryptFailMode = /* @__PURE__ */ ((DecryptFailMode2) => {
  DecryptFailMode2["UNAVAILABLE"] = "unavailable";
  DecryptFailMode2["DECRYPT_FAIL"] = "decrypt_fail";
  return DecryptFailMode2;
})(DecryptFailMode || {});
var UnavailableType = /* @__PURE__ */ ((UnavailableType2) => {
  UnavailableType2["UNKNOWN"] = "";
  UnavailableType2["VIEW_ONCE"] = "view_once";
  return UnavailableType2;
})(UnavailableType || {});
var ConnectFailureReason = /* @__PURE__ */ ((ConnectFailureReason2) => {
  ConnectFailureReason2[ConnectFailureReason2["SOCKET_OPEN_TIMEOUT"] = 4001] = "SOCKET_OPEN_TIMEOUT";
  ConnectFailureReason2[ConnectFailureReason2["SOCKET_PING_TIMEOUT"] = 4002] = "SOCKET_PING_TIMEOUT";
  ConnectFailureReason2[ConnectFailureReason2["SOCKET_PONG_TIMEOUT"] = 4003] = "SOCKET_PONG_TIMEOUT";
  ConnectFailureReason2[ConnectFailureReason2["UNKNOWN_LOGOUT"] = 4004] = "UNKNOWN_LOGOUT";
  ConnectFailureReason2[ConnectFailureReason2["BAD_MAC"] = 4005] = "BAD_MAC";
  ConnectFailureReason2[ConnectFailureReason2["INIT_TIMEOUT"] = 4006] = "INIT_TIMEOUT";
  ConnectFailureReason2[ConnectFailureReason2["MULTI_DEVICE_MISMATCH"] = 4007] = "MULTI_DEVICE_MISMATCH";
  ConnectFailureReason2[ConnectFailureReason2["MULTI_DEVICE_DISABLED"] = 4008] = "MULTI_DEVICE_DISABLED";
  ConnectFailureReason2[ConnectFailureReason2["TEMP_BANNED"] = 4009] = "TEMP_BANNED";
  ConnectFailureReason2[ConnectFailureReason2["CLIENT_OUTDATED"] = 4010] = "CLIENT_OUTDATED";
  ConnectFailureReason2[ConnectFailureReason2["STREAM_ERROR"] = 4011] = "STREAM_ERROR";
  ConnectFailureReason2[ConnectFailureReason2["DEVICE_GONE"] = 4012] = "DEVICE_GONE";
  ConnectFailureReason2[ConnectFailureReason2["IDENTITY_MISSING"] = 4013] = "IDENTITY_MISSING";
  ConnectFailureReason2[ConnectFailureReason2["RATE_LIMIT_HIT"] = 4014] = "RATE_LIMIT_HIT";
  ConnectFailureReason2[ConnectFailureReason2["MAIN_DEVICE_GONE"] = 4015] = "MAIN_DEVICE_GONE";
  return ConnectFailureReason2;
})(ConnectFailureReason || {});
var TempBanReason = /* @__PURE__ */ ((TempBanReason2) => {
  TempBanReason2[TempBanReason2["SENT_TO_TOO_MANY_PEOPLE"] = 101] = "SENT_TO_TOO_MANY_PEOPLE";
  TempBanReason2[TempBanReason2["BLOCKED_BY_USERS"] = 102] = "BLOCKED_BY_USERS";
  TempBanReason2[TempBanReason2["CREATED_TOO_MANY_GROUPS"] = 103] = "CREATED_TOO_MANY_GROUPS";
  TempBanReason2[TempBanReason2["SENT_TOO_MANY_SAME_MESSAGE"] = 104] = "SENT_TOO_MANY_SAME_MESSAGE";
  TempBanReason2[TempBanReason2["BROADCAST_LIST"] = 106] = "BROADCAST_LIST";
  return TempBanReason2;
})(TempBanReason || {});
exports.MessageType = webhook.MessageType;
exports.WEBHOOK_EVENTS = webhook.WEBHOOK_EVENTS;
exports.WebhookEventType = webhook.WebhookEventType;
exports.discoverMessageType = webhook.discoverMessageType;
exports.hasBase64Media = webhook.hasBase64Media;
exports.hasBothMedia = webhook.hasBothMedia;
exports.hasS3Media = webhook.hasS3Media;
exports.isValidWebhookPayload = webhook.isValidWebhookPayload;
exports.isWebhookEventType = webhook.isWebhookEventType;
exports.BotPluginSearchProvider = BotPluginSearchProvider;
exports.BotPluginType = BotPluginType;
exports.ButtonType = ButtonType;
exports.ButtonsMessageHeaderType = ButtonsMessageHeaderType;
exports.ButtonsResponseMessageType = ButtonsResponseMessageType;
exports.ConnectFailureReason = ConnectFailureReason;
exports.DecryptFailMode = DecryptFailMode;
exports.DisappearingModeInitiator = DisappearingModeInitiator;
exports.DisappearingModeTrigger = DisappearingModeTrigger;
exports.EventType = EventType;
exports.ExtendedTextMessageFontType = ExtendedTextMessageFontType;
exports.ExtendedTextMessageInviteLinkGroupType = ExtendedTextMessageInviteLinkGroupType;
exports.ExtendedTextMessagePreviewType = ExtendedTextMessagePreviewType;
exports.HistorySyncNotificationHistorySyncType = HistorySyncNotificationHistorySyncType;
exports.InviteLinkGroupType = InviteLinkGroupType;
exports.ListMessageListType = ListMessageListType;
exports.ListResponseMessageListType = ListResponseMessageListType;
exports.MediaType = MediaType;
exports.MessageStatus = MessageStatus;
exports.PaymentBackgroundType = PaymentBackgroundType;
exports.PeerDataOperationRequestResponseMessagePeerDataOperationResult = PeerDataOperationRequestResponseMessagePeerDataOperationResult;
exports.PeerDataOperationRequestType = PeerDataOperationRequestType;
exports.ProtocolMessageType = ProtocolMessageType;
exports.ReceiptType = ReceiptType;
exports.TempBanReason = TempBanReason;
exports.UnavailableType = UnavailableType;
exports.VideoAttribution = VideoAttribution;
exports.VideoSourceType = VideoSourceType;
exports.getMessageContent = getMessageContent;
//# sourceMappingURL=index.js.map
