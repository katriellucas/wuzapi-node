Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_webhook = require("../webhook.js");
//#region src/types/message.ts
var DisappearingModeInitiator = /* @__PURE__ */ function(DisappearingModeInitiator) {
	DisappearingModeInitiator[DisappearingModeInitiator["CHANGED_IN_CHAT"] = 0] = "CHANGED_IN_CHAT";
	DisappearingModeInitiator[DisappearingModeInitiator["INITIATED_BY_ME"] = 1] = "INITIATED_BY_ME";
	DisappearingModeInitiator[DisappearingModeInitiator["INITIATED_BY_OTHER"] = 2] = "INITIATED_BY_OTHER";
	return DisappearingModeInitiator;
}({});
var DisappearingModeTrigger = /* @__PURE__ */ function(DisappearingModeTrigger) {
	DisappearingModeTrigger[DisappearingModeTrigger["UNKNOWN"] = 0] = "UNKNOWN";
	DisappearingModeTrigger[DisappearingModeTrigger["CHAT_SETTING"] = 1] = "CHAT_SETTING";
	DisappearingModeTrigger[DisappearingModeTrigger["ACCOUNT_SETTING"] = 2] = "ACCOUNT_SETTING";
	DisappearingModeTrigger[DisappearingModeTrigger["BULK_CHANGE"] = 3] = "BULK_CHANGE";
	return DisappearingModeTrigger;
}({});
var MediaType = /* @__PURE__ */ function(MediaType) {
	MediaType[MediaType["UNKNOWN"] = 0] = "UNKNOWN";
	MediaType[MediaType["IMAGE"] = 1] = "IMAGE";
	MediaType[MediaType["VIDEO"] = 2] = "VIDEO";
	MediaType[MediaType["AUDIO"] = 3] = "AUDIO";
	MediaType[MediaType["DOCUMENT"] = 4] = "DOCUMENT";
	MediaType[MediaType["STICKER"] = 5] = "STICKER";
	return MediaType;
}({});
var VideoAttribution = /* @__PURE__ */ function(VideoAttribution) {
	VideoAttribution[VideoAttribution["NONE"] = 0] = "NONE";
	VideoAttribution[VideoAttribution["GIPHY"] = 1] = "GIPHY";
	VideoAttribution[VideoAttribution["TENOR"] = 2] = "TENOR";
	VideoAttribution[VideoAttribution["KLIPY"] = 3] = "KLIPY";
	return VideoAttribution;
}({});
var VideoSourceType = /* @__PURE__ */ function(VideoSourceType) {
	VideoSourceType[VideoSourceType["USER_VIDEO"] = 0] = "USER_VIDEO";
	VideoSourceType[VideoSourceType["AI_GENERATED"] = 1] = "AI_GENERATED";
	return VideoSourceType;
}({});
var ExtendedTextMessageFontType = /* @__PURE__ */ function(ExtendedTextMessageFontType) {
	ExtendedTextMessageFontType[ExtendedTextMessageFontType["SANS_SERIF"] = 0] = "SANS_SERIF";
	ExtendedTextMessageFontType[ExtendedTextMessageFontType["SERIF"] = 1] = "SERIF";
	ExtendedTextMessageFontType[ExtendedTextMessageFontType["NORICAN_REGULAR"] = 2] = "NORICAN_REGULAR";
	ExtendedTextMessageFontType[ExtendedTextMessageFontType["BRYNDAN_WRITE"] = 3] = "BRYNDAN_WRITE";
	ExtendedTextMessageFontType[ExtendedTextMessageFontType["BEBASNEUE_REGULAR"] = 4] = "BEBASNEUE_REGULAR";
	ExtendedTextMessageFontType[ExtendedTextMessageFontType["OSWALD_HEAVY"] = 5] = "OSWALD_HEAVY";
	return ExtendedTextMessageFontType;
}({});
var ExtendedTextMessagePreviewType = /* @__PURE__ */ function(ExtendedTextMessagePreviewType) {
	ExtendedTextMessagePreviewType[ExtendedTextMessagePreviewType["NONE"] = 0] = "NONE";
	ExtendedTextMessagePreviewType[ExtendedTextMessagePreviewType["VIDEO"] = 1] = "VIDEO";
	ExtendedTextMessagePreviewType[ExtendedTextMessagePreviewType["PLACEHOLDER"] = 4] = "PLACEHOLDER";
	ExtendedTextMessagePreviewType[ExtendedTextMessagePreviewType["IMAGE"] = 5] = "IMAGE";
	return ExtendedTextMessagePreviewType;
}({});
var ExtendedTextMessageInviteLinkGroupType = /* @__PURE__ */ function(ExtendedTextMessageInviteLinkGroupType) {
	ExtendedTextMessageInviteLinkGroupType[ExtendedTextMessageInviteLinkGroupType["DEFAULT"] = 0] = "DEFAULT";
	ExtendedTextMessageInviteLinkGroupType[ExtendedTextMessageInviteLinkGroupType["PARENT"] = 1] = "PARENT";
	ExtendedTextMessageInviteLinkGroupType[ExtendedTextMessageInviteLinkGroupType["SUB"] = 2] = "SUB";
	ExtendedTextMessageInviteLinkGroupType[ExtendedTextMessageInviteLinkGroupType["DEFAULT_SUB"] = 3] = "DEFAULT_SUB";
	return ExtendedTextMessageInviteLinkGroupType;
}({});
var InviteLinkGroupType = /* @__PURE__ */ function(InviteLinkGroupType) {
	InviteLinkGroupType[InviteLinkGroupType["DEFAULT"] = 0] = "DEFAULT";
	InviteLinkGroupType[InviteLinkGroupType["PARENT"] = 1] = "PARENT";
	InviteLinkGroupType[InviteLinkGroupType["SUB"] = 2] = "SUB";
	InviteLinkGroupType[InviteLinkGroupType["DEFAULT_SUB"] = 3] = "DEFAULT_SUB";
	return InviteLinkGroupType;
}({});
var ButtonType = /* @__PURE__ */ function(ButtonType) {
	ButtonType[ButtonType["UNKNOWN"] = 0] = "UNKNOWN";
	ButtonType[ButtonType["RESPONSE"] = 1] = "RESPONSE";
	ButtonType[ButtonType["NATIVE_FLOW"] = 2] = "NATIVE_FLOW";
	return ButtonType;
}({});
var ButtonsMessageHeaderType = /* @__PURE__ */ function(ButtonsMessageHeaderType) {
	ButtonsMessageHeaderType[ButtonsMessageHeaderType["UNKNOWN"] = 0] = "UNKNOWN";
	ButtonsMessageHeaderType[ButtonsMessageHeaderType["EMPTY"] = 1] = "EMPTY";
	ButtonsMessageHeaderType[ButtonsMessageHeaderType["TEXT"] = 2] = "TEXT";
	ButtonsMessageHeaderType[ButtonsMessageHeaderType["DOCUMENT"] = 3] = "DOCUMENT";
	ButtonsMessageHeaderType[ButtonsMessageHeaderType["IMAGE"] = 4] = "IMAGE";
	ButtonsMessageHeaderType[ButtonsMessageHeaderType["VIDEO"] = 5] = "VIDEO";
	ButtonsMessageHeaderType[ButtonsMessageHeaderType["LOCATION"] = 6] = "LOCATION";
	return ButtonsMessageHeaderType;
}({});
var ListMessageListType = /* @__PURE__ */ function(ListMessageListType) {
	ListMessageListType[ListMessageListType["UNKNOWN"] = 0] = "UNKNOWN";
	ListMessageListType[ListMessageListType["SINGLE_SELECT"] = 1] = "SINGLE_SELECT";
	ListMessageListType[ListMessageListType["PRODUCT_LIST"] = 2] = "PRODUCT_LIST";
	return ListMessageListType;
}({});
var ButtonsResponseMessageType = /* @__PURE__ */ function(ButtonsResponseMessageType) {
	ButtonsResponseMessageType[ButtonsResponseMessageType["UNKNOWN"] = 0] = "UNKNOWN";
	ButtonsResponseMessageType[ButtonsResponseMessageType["DISPLAY_TEXT"] = 1] = "DISPLAY_TEXT";
	return ButtonsResponseMessageType;
}({});
var ListResponseMessageListType = /* @__PURE__ */ function(ListResponseMessageListType) {
	ListResponseMessageListType[ListResponseMessageListType["UNKNOWN"] = 0] = "UNKNOWN";
	ListResponseMessageListType[ListResponseMessageListType["SINGLE_SELECT"] = 1] = "SINGLE_SELECT";
	return ListResponseMessageListType;
}({});
var PaymentBackgroundType = /* @__PURE__ */ function(PaymentBackgroundType) {
	PaymentBackgroundType[PaymentBackgroundType["UNKNOWN"] = 0] = "UNKNOWN";
	PaymentBackgroundType[PaymentBackgroundType["DEFAULT"] = 1] = "DEFAULT";
	return PaymentBackgroundType;
}({});
var ProtocolMessageType = /* @__PURE__ */ function(ProtocolMessageType) {
	ProtocolMessageType[ProtocolMessageType["REVOKE"] = 0] = "REVOKE";
	ProtocolMessageType[ProtocolMessageType["EPHEMERAL_SETTING"] = 3] = "EPHEMERAL_SETTING";
	ProtocolMessageType[ProtocolMessageType["EPHEMERAL_SYNC_RESPONSE"] = 4] = "EPHEMERAL_SYNC_RESPONSE";
	ProtocolMessageType[ProtocolMessageType["HISTORY_SYNC_NOTIFICATION"] = 5] = "HISTORY_SYNC_NOTIFICATION";
	ProtocolMessageType[ProtocolMessageType["APP_STATE_SYNC_KEY_SHARE"] = 6] = "APP_STATE_SYNC_KEY_SHARE";
	ProtocolMessageType[ProtocolMessageType["APP_STATE_SYNC_KEY_REQUEST"] = 7] = "APP_STATE_SYNC_KEY_REQUEST";
	ProtocolMessageType[ProtocolMessageType["MSG_FANOUT_BACKFILL_REQUEST"] = 8] = "MSG_FANOUT_BACKFILL_REQUEST";
	ProtocolMessageType[ProtocolMessageType["INITIAL_SECURITY_NOTIFICATION_SETTING_SYNC"] = 9] = "INITIAL_SECURITY_NOTIFICATION_SETTING_SYNC";
	ProtocolMessageType[ProtocolMessageType["APP_STATE_FATAL_EXCEPTION_NOTIFICATION"] = 10] = "APP_STATE_FATAL_EXCEPTION_NOTIFICATION";
	ProtocolMessageType[ProtocolMessageType["SHARE_PHONE_NUMBER"] = 11] = "SHARE_PHONE_NUMBER";
	ProtocolMessageType[ProtocolMessageType["MESSAGE_EDIT"] = 14] = "MESSAGE_EDIT";
	ProtocolMessageType[ProtocolMessageType["PEER_DATA_OPERATION_REQUEST_MESSAGE"] = 16] = "PEER_DATA_OPERATION_REQUEST_MESSAGE";
	ProtocolMessageType[ProtocolMessageType["PEER_DATA_OPERATION_REQUEST_RESPONSE_MESSAGE"] = 17] = "PEER_DATA_OPERATION_REQUEST_RESPONSE_MESSAGE";
	return ProtocolMessageType;
}({});
var BotPluginType = /* @__PURE__ */ function(BotPluginType) {
	BotPluginType[BotPluginType["REELS"] = 0] = "REELS";
	BotPluginType[BotPluginType["SEARCH"] = 1] = "SEARCH";
	return BotPluginType;
}({});
var BotPluginSearchProvider = /* @__PURE__ */ function(BotPluginSearchProvider) {
	BotPluginSearchProvider[BotPluginSearchProvider["BING"] = 0] = "BING";
	BotPluginSearchProvider[BotPluginSearchProvider["GOOGLE"] = 1] = "GOOGLE";
	return BotPluginSearchProvider;
}({});
var HistorySyncNotificationHistorySyncType = /* @__PURE__ */ function(HistorySyncNotificationHistorySyncType) {
	HistorySyncNotificationHistorySyncType[HistorySyncNotificationHistorySyncType["INITIAL_BOOTSTRAP"] = 0] = "INITIAL_BOOTSTRAP";
	HistorySyncNotificationHistorySyncType[HistorySyncNotificationHistorySyncType["INITIAL_STATUS_V3"] = 1] = "INITIAL_STATUS_V3";
	HistorySyncNotificationHistorySyncType[HistorySyncNotificationHistorySyncType["FULL"] = 2] = "FULL";
	HistorySyncNotificationHistorySyncType[HistorySyncNotificationHistorySyncType["RECENT"] = 3] = "RECENT";
	HistorySyncNotificationHistorySyncType[HistorySyncNotificationHistorySyncType["PUSH_NAME"] = 4] = "PUSH_NAME";
	HistorySyncNotificationHistorySyncType[HistorySyncNotificationHistorySyncType["NON_BLOCKING_DATA"] = 5] = "NON_BLOCKING_DATA";
	HistorySyncNotificationHistorySyncType[HistorySyncNotificationHistorySyncType["ON_DEMAND"] = 6] = "ON_DEMAND";
	return HistorySyncNotificationHistorySyncType;
}({});
var PeerDataOperationRequestType = /* @__PURE__ */ function(PeerDataOperationRequestType) {
	PeerDataOperationRequestType[PeerDataOperationRequestType["UPLOAD_STICKER"] = 0] = "UPLOAD_STICKER";
	PeerDataOperationRequestType[PeerDataOperationRequestType["SEND_RECENT_STICKER_BOOTSTRAP"] = 1] = "SEND_RECENT_STICKER_BOOTSTRAP";
	PeerDataOperationRequestType[PeerDataOperationRequestType["GENERATE_LINK_PREVIEW"] = 2] = "GENERATE_LINK_PREVIEW";
	return PeerDataOperationRequestType;
}({});
var PeerDataOperationRequestResponseMessagePeerDataOperationResult = /* @__PURE__ */ function(PeerDataOperationRequestResponseMessagePeerDataOperationResult) {
	PeerDataOperationRequestResponseMessagePeerDataOperationResult[PeerDataOperationRequestResponseMessagePeerDataOperationResult["SUCCESS"] = 0] = "SUCCESS";
	PeerDataOperationRequestResponseMessagePeerDataOperationResult[PeerDataOperationRequestResponseMessagePeerDataOperationResult["NOT_AUTHORIZED"] = 1] = "NOT_AUTHORIZED";
	PeerDataOperationRequestResponseMessagePeerDataOperationResult[PeerDataOperationRequestResponseMessagePeerDataOperationResult["NOT_FOUND"] = 2] = "NOT_FOUND";
	PeerDataOperationRequestResponseMessagePeerDataOperationResult[PeerDataOperationRequestResponseMessagePeerDataOperationResult["THROTTLED"] = 3] = "THROTTLED";
	PeerDataOperationRequestResponseMessagePeerDataOperationResult[PeerDataOperationRequestResponseMessagePeerDataOperationResult["UNKNOWN_ERROR"] = 4] = "UNKNOWN_ERROR";
	return PeerDataOperationRequestResponseMessagePeerDataOperationResult;
}({});
function getMessageContent(message) {
	if (message.conversation) return {
		type: "text",
		content: message.conversation
	};
	if (message.extendedTextMessage) return {
		type: "extendedText",
		content: message.extendedTextMessage
	};
	if (message.imageMessage) return {
		type: "image",
		content: message.imageMessage
	};
	if (message.videoMessage) return {
		type: "video",
		content: message.videoMessage
	};
	if (message.audioMessage) return {
		type: "audio",
		content: message.audioMessage
	};
	if (message.documentMessage) return {
		type: "document",
		content: message.documentMessage
	};
	if (message.stickerMessage) return {
		type: "sticker",
		content: message.stickerMessage
	};
	if (message.locationMessage) return {
		type: "location",
		content: message.locationMessage
	};
	if (message.liveLocationMessage) return {
		type: "liveLocation",
		content: message.liveLocationMessage
	};
	if (message.contactMessage) return {
		type: "contact",
		content: message.contactMessage
	};
	if (message.contactsArrayMessage) return {
		type: "contactsArray",
		content: message.contactsArrayMessage
	};
	if (message.buttonsMessage) return {
		type: "buttons",
		content: message.buttonsMessage
	};
	if (message.listMessage) return {
		type: "list",
		content: message.listMessage
	};
	if (message.templateMessage) return {
		type: "template",
		content: message.templateMessage
	};
	if (message.buttonsResponseMessage) return {
		type: "buttonsResponse",
		content: message.buttonsResponseMessage
	};
	if (message.listResponseMessage) return {
		type: "listResponse",
		content: message.listResponseMessage
	};
	if (message.groupInviteMessage) return {
		type: "groupInvite",
		content: message.groupInviteMessage
	};
	if (message.pollCreationMessage) return {
		type: "poll",
		content: message.pollCreationMessage
	};
	if (message.pollUpdateMessage) return {
		type: "pollUpdate",
		content: message.pollUpdateMessage
	};
	if (message.reactionMessage) return {
		type: "reaction",
		content: message.reactionMessage
	};
	if (message.protocolMessage) return {
		type: "protocol",
		content: message.protocolMessage
	};
	if (message.ephemeralMessage) return {
		type: "ephemeral",
		content: message.ephemeralMessage
	};
	if (message.viewOnceMessage) return {
		type: "viewOnce",
		content: message.viewOnceMessage
	};
	return null;
}
//#endregion
//#region src/types/events.ts
var EventType = /* @__PURE__ */ function(EventType) {
	EventType["MESSAGE"] = "Message";
	EventType["RECEIPT"] = "Receipt";
	EventType["PRESENCE"] = "Presence";
	EventType["CHAT_PRESENCE"] = "ChatPresence";
	EventType["CONNECTED"] = "Connected";
	EventType["DISCONNECTED"] = "Disconnected";
	EventType["LOGGED_OUT"] = "LoggedOut";
	EventType["QR"] = "QR";
	EventType["QR_SCANNED_WITHOUT_MULTIDEVICE"] = "QRScannedWithoutMultidevice";
	EventType["PAIR_SUCCESS"] = "PairSuccess";
	EventType["PAIR_ERROR"] = "PairError";
	EventType["MANUAL_LOGIN_RECONNECT"] = "ManualLoginReconnect";
	EventType["KEEP_ALIVE_RESTORED"] = "KeepAliveRestored";
	EventType["KEEP_ALIVE_TIMEOUT"] = "KeepAliveTimeout";
	EventType["GROUP_INFO"] = "GroupInfo";
	EventType["JOINED_GROUP"] = "JoinedGroup";
	EventType["CONTACT"] = "Contact";
	EventType["PUSH_NAME"] = "PushName";
	EventType["PUSH_NAME_SETTING"] = "PushNameSetting";
	EventType["PICTURE"] = "Picture";
	EventType["USER_ABOUT"] = "UserAbout";
	EventType["USER_STATUS_MUTE"] = "UserStatusMute";
	EventType["PRIVACY_SETTINGS"] = "PrivacySettings";
	EventType["APP_STATE"] = "AppState";
	EventType["APP_STATE_SYNC_COMPLETE"] = "AppStateSyncComplete";
	EventType["HISTORY_SYNC"] = "HistorySync";
	EventType["OFFLINE_SYNC_COMPLETED"] = "OfflineSyncCompleted";
	EventType["OFFLINE_SYNC_PREVIEW"] = "OfflineSyncPreview";
	EventType["IDENTITY_CHANGE"] = "IdentityChange";
	EventType["ARCHIVE"] = "Archive";
	EventType["UNARCHIVE_CHATS_SETTING"] = "UnarchiveChatsSetting";
	EventType["CLEAR_CHAT"] = "ClearChat";
	EventType["DELETE_CHAT"] = "DeleteChat";
	EventType["DELETE_FOR_ME"] = "DeleteForMe";
	EventType["MARK_CHAT_AS_READ"] = "MarkChatAsRead";
	EventType["MUTE"] = "Mute";
	EventType["PIN"] = "Pin";
	EventType["STAR"] = "Star";
	EventType["LABEL_ASSOCIATION_CHAT"] = "LabelAssociationChat";
	EventType["LABEL_ASSOCIATION_MESSAGE"] = "LabelAssociationMessage";
	EventType["LABEL_EDIT"] = "LabelEdit";
	EventType["MEDIA_RETRY"] = "MediaRetry";
	EventType["MEDIA_RETRY_ERROR"] = "MediaRetryError";
	EventType["NEWSLETTER_JOIN"] = "NewsletterJoin";
	EventType["NEWSLETTER_LEAVE"] = "NewsletterLeave";
	EventType["NEWSLETTER_LIVE_UPDATE"] = "NewsletterLiveUpdate";
	EventType["NEWSLETTER_MESSAGE_META"] = "NewsletterMessageMeta";
	EventType["NEWSLETTER_MUTE_CHANGE"] = "NewsletterMuteChange";
	EventType["UNDECRYPTABLE_MESSAGE"] = "UndecryptableMessage";
	EventType["STREAM_ERROR"] = "StreamError";
	EventType["STREAM_REPLACED"] = "StreamReplaced";
	EventType["CONNECT_FAILURE"] = "ConnectFailure";
	EventType["CLIENT_OUTDATED"] = "ClientOutdated";
	EventType["TEMPORARY_BAN"] = "TemporaryBan";
	EventType["CAT_REFRESH_ERROR"] = "CATRefreshError";
	EventType["PERMANENT_DISCONNECT"] = "PermanentDisconnect";
	EventType["BLOCKLIST"] = "Blocklist";
	EventType["BLOCKLIST_ACTION"] = "BlocklistAction";
	EventType["BLOCKLIST_CHANGE"] = "BlocklistChange";
	EventType["BUSINESS_NAME"] = "BusinessName";
	EventType["CALL_ACCEPT"] = "CallAccept";
	EventType["CALL_OFFER"] = "CallOffer";
	EventType["CALL_OFFER_NOTICE"] = "CallOfferNotice";
	EventType["CALL_PRE_ACCEPT"] = "CallPreAccept";
	EventType["CALL_REJECT"] = "CallReject";
	EventType["CALL_RELAY_LATENCY"] = "CallRelayLatency";
	EventType["CALL_TERMINATE"] = "CallTerminate";
	EventType["CALL_TRANSPORT"] = "CallTransport";
	EventType["UNKNOWN_CALL_EVENT"] = "UnknownCallEvent";
	EventType["FB_MESSAGE"] = "FBMessage";
	return EventType;
}({});
var MessageStatus = /* @__PURE__ */ function(MessageStatus) {
	MessageStatus["ERROR"] = "ERROR";
	MessageStatus["PENDING"] = "PENDING";
	MessageStatus["SERVER_ACK"] = "SERVER_ACK";
	MessageStatus["DELIVERY_ACK"] = "DELIVERY_ACK";
	MessageStatus["READ"] = "READ";
	MessageStatus["PLAYED"] = "PLAYED";
	return MessageStatus;
}({});
var ReceiptType = /* @__PURE__ */ function(ReceiptType) {
	ReceiptType["UNKNOWN"] = "";
	ReceiptType["DELIVERY"] = "delivery";
	ReceiptType["READ"] = "read";
	ReceiptType["READ_SELF"] = "read-self";
	ReceiptType["PLAYED"] = "played";
	ReceiptType["SENDER"] = "sender";
	ReceiptType["INACTIVE"] = "inactive";
	ReceiptType["PEER_MSG"] = "peer_msg";
	return ReceiptType;
}({});
var DecryptFailMode = /* @__PURE__ */ function(DecryptFailMode) {
	DecryptFailMode["UNAVAILABLE"] = "unavailable";
	DecryptFailMode["DECRYPT_FAIL"] = "decrypt_fail";
	return DecryptFailMode;
}({});
var UnavailableType = /* @__PURE__ */ function(UnavailableType) {
	UnavailableType["UNKNOWN"] = "";
	UnavailableType["VIEW_ONCE"] = "view_once";
	return UnavailableType;
}({});
var ConnectFailureReason = /* @__PURE__ */ function(ConnectFailureReason) {
	ConnectFailureReason[ConnectFailureReason["SOCKET_OPEN_TIMEOUT"] = 4001] = "SOCKET_OPEN_TIMEOUT";
	ConnectFailureReason[ConnectFailureReason["SOCKET_PING_TIMEOUT"] = 4002] = "SOCKET_PING_TIMEOUT";
	ConnectFailureReason[ConnectFailureReason["SOCKET_PONG_TIMEOUT"] = 4003] = "SOCKET_PONG_TIMEOUT";
	ConnectFailureReason[ConnectFailureReason["UNKNOWN_LOGOUT"] = 4004] = "UNKNOWN_LOGOUT";
	ConnectFailureReason[ConnectFailureReason["BAD_MAC"] = 4005] = "BAD_MAC";
	ConnectFailureReason[ConnectFailureReason["INIT_TIMEOUT"] = 4006] = "INIT_TIMEOUT";
	ConnectFailureReason[ConnectFailureReason["MULTI_DEVICE_MISMATCH"] = 4007] = "MULTI_DEVICE_MISMATCH";
	ConnectFailureReason[ConnectFailureReason["MULTI_DEVICE_DISABLED"] = 4008] = "MULTI_DEVICE_DISABLED";
	ConnectFailureReason[ConnectFailureReason["TEMP_BANNED"] = 4009] = "TEMP_BANNED";
	ConnectFailureReason[ConnectFailureReason["CLIENT_OUTDATED"] = 4010] = "CLIENT_OUTDATED";
	ConnectFailureReason[ConnectFailureReason["STREAM_ERROR"] = 4011] = "STREAM_ERROR";
	ConnectFailureReason[ConnectFailureReason["DEVICE_GONE"] = 4012] = "DEVICE_GONE";
	ConnectFailureReason[ConnectFailureReason["IDENTITY_MISSING"] = 4013] = "IDENTITY_MISSING";
	ConnectFailureReason[ConnectFailureReason["RATE_LIMIT_HIT"] = 4014] = "RATE_LIMIT_HIT";
	ConnectFailureReason[ConnectFailureReason["MAIN_DEVICE_GONE"] = 4015] = "MAIN_DEVICE_GONE";
	return ConnectFailureReason;
}({});
var TempBanReason = /* @__PURE__ */ function(TempBanReason) {
	TempBanReason[TempBanReason["SENT_TO_TOO_MANY_PEOPLE"] = 101] = "SENT_TO_TOO_MANY_PEOPLE";
	TempBanReason[TempBanReason["BLOCKED_BY_USERS"] = 102] = "BLOCKED_BY_USERS";
	TempBanReason[TempBanReason["CREATED_TOO_MANY_GROUPS"] = 103] = "CREATED_TOO_MANY_GROUPS";
	TempBanReason[TempBanReason["SENT_TOO_MANY_SAME_MESSAGE"] = 104] = "SENT_TOO_MANY_SAME_MESSAGE";
	TempBanReason[TempBanReason["BROADCAST_LIST"] = 106] = "BROADCAST_LIST";
	return TempBanReason;
}({});
//#endregion
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
exports.MessageType = require_webhook.MessageType;
exports.PaymentBackgroundType = PaymentBackgroundType;
exports.PeerDataOperationRequestResponseMessagePeerDataOperationResult = PeerDataOperationRequestResponseMessagePeerDataOperationResult;
exports.PeerDataOperationRequestType = PeerDataOperationRequestType;
exports.ProtocolMessageType = ProtocolMessageType;
exports.ReceiptType = ReceiptType;
exports.TempBanReason = TempBanReason;
exports.UnavailableType = UnavailableType;
exports.VideoAttribution = VideoAttribution;
exports.VideoSourceType = VideoSourceType;
exports.WEBHOOK_EVENTS = require_webhook.WEBHOOK_EVENTS;
exports.WebhookEventType = require_webhook.WebhookEventType;
exports.discoverMessageType = require_webhook.discoverMessageType;
exports.getMessageContent = getMessageContent;
exports.hasBase64Media = require_webhook.hasBase64Media;
exports.hasBothMedia = require_webhook.hasBothMedia;
exports.hasS3Media = require_webhook.hasS3Media;
exports.isValidWebhookPayload = require_webhook.isValidWebhookPayload;
exports.isWebhookEventType = require_webhook.isWebhookEventType;

//# sourceMappingURL=index.js.map