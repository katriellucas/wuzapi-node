//#region src/types/webhook.ts
var WebhookEventType = /* @__PURE__ */ function(WebhookEventType) {
	WebhookEventType["MESSAGE"] = "Message";
	WebhookEventType["UNDECRYPTABLE_MESSAGE"] = "UndecryptableMessage";
	WebhookEventType["RECEIPT"] = "Receipt";
	WebhookEventType["READ_RECEIPT"] = "ReadReceipt";
	WebhookEventType["MEDIA_RETRY"] = "MediaRetry";
	WebhookEventType["GROUP_INFO"] = "GroupInfo";
	WebhookEventType["JOINED_GROUP"] = "JoinedGroup";
	WebhookEventType["PICTURE"] = "Picture";
	WebhookEventType["BLOCKLIST_CHANGE"] = "BlocklistChange";
	WebhookEventType["BLOCKLIST"] = "Blocklist";
	WebhookEventType["CONNECTED"] = "Connected";
	WebhookEventType["DISCONNECTED"] = "Disconnected";
	WebhookEventType["CONNECT_FAILURE"] = "ConnectFailure";
	WebhookEventType["KEEP_ALIVE_RESTORED"] = "KeepAliveRestored";
	WebhookEventType["KEEP_ALIVE_TIMEOUT"] = "KeepAliveTimeout";
	WebhookEventType["LOGGED_OUT"] = "LoggedOut";
	WebhookEventType["CLIENT_OUTDATED"] = "ClientOutdated";
	WebhookEventType["TEMPORARY_BAN"] = "TemporaryBan";
	WebhookEventType["STREAM_ERROR"] = "StreamError";
	WebhookEventType["STREAM_REPLACED"] = "StreamReplaced";
	WebhookEventType["PAIR_SUCCESS"] = "PairSuccess";
	WebhookEventType["PAIR_ERROR"] = "PairError";
	WebhookEventType["PASSKEY_REQUEST"] = "PasskeyRequest";
	WebhookEventType["PASSKEY_CONFIRMATION"] = "PasskeyConfirmation";
	WebhookEventType["PAIR_PASSKEY_ERROR"] = "PairPasskeyError";
	WebhookEventType["QR"] = "QR";
	WebhookEventType["QR_SCANNED_WITHOUT_MULTIDEVICE"] = "QRScannedWithoutMultidevice";
	WebhookEventType["QR_TIMEOUT"] = "QRTimeout";
	WebhookEventType["PRIVACY_SETTINGS"] = "PrivacySettings";
	WebhookEventType["PUSH_NAME_SETTING"] = "PushNameSetting";
	WebhookEventType["USER_ABOUT"] = "UserAbout";
	WebhookEventType["APP_STATE"] = "AppState";
	WebhookEventType["APP_STATE_SYNC_COMPLETE"] = "AppStateSyncComplete";
	WebhookEventType["HISTORY_SYNC"] = "HistorySync";
	WebhookEventType["OFFLINE_SYNC_COMPLETED"] = "OfflineSyncCompleted";
	WebhookEventType["OFFLINE_SYNC_PREVIEW"] = "OfflineSyncPreview";
	WebhookEventType["CALL_OFFER"] = "CallOffer";
	WebhookEventType["CALL_ACCEPT"] = "CallAccept";
	WebhookEventType["CALL_TERMINATE"] = "CallTerminate";
	WebhookEventType["CALL_OFFER_NOTICE"] = "CallOfferNotice";
	WebhookEventType["CALL_RELAY_LATENCY"] = "CallRelayLatency";
	WebhookEventType["PRESENCE"] = "Presence";
	WebhookEventType["CHAT_PRESENCE"] = "ChatPresence";
	WebhookEventType["IDENTITY_CHANGE"] = "IdentityChange";
	WebhookEventType["CAT_REFRESH_ERROR"] = "CATRefreshError";
	WebhookEventType["NEWSLETTER_JOIN"] = "NewsletterJoin";
	WebhookEventType["NEWSLETTER_LEAVE"] = "NewsletterLeave";
	WebhookEventType["NEWSLETTER_MUTE_CHANGE"] = "NewsletterMuteChange";
	WebhookEventType["NEWSLETTER_LIVE_UPDATE"] = "NewsletterLiveUpdate";
	WebhookEventType["FB_MESSAGE"] = "FBMessage";
	WebhookEventType["ALL"] = "All";
	return WebhookEventType;
}({});
var WEBHOOK_EVENTS = Object.values(WebhookEventType);
var MessageType = /* @__PURE__ */ function(MessageType) {
	MessageType["TEXT"] = "conversation";
	MessageType["EXTENDED_TEXT"] = "extendedTextMessage";
	MessageType["IMAGE"] = "imageMessage";
	MessageType["VIDEO"] = "videoMessage";
	MessageType["AUDIO"] = "audioMessage";
	MessageType["DOCUMENT"] = "documentMessage";
	MessageType["CONTACT"] = "contactMessage";
	MessageType["LOCATION"] = "locationMessage";
	MessageType["STICKER"] = "stickerMessage";
	MessageType["REACTION"] = "reactionMessage";
	MessageType["EDITED"] = "editedMessage";
	MessageType["PROTOCOL"] = "protocolMessage";
	MessageType["DEVICE_SENT"] = "deviceSentMessage";
	MessageType["BUTTONS"] = "buttonsMessage";
	MessageType["LIST"] = "listMessage";
	MessageType["TEMPLATE"] = "templateMessage";
	MessageType["BUTTONS_RESPONSE"] = "buttonsResponseMessage";
	MessageType["LIST_RESPONSE"] = "listResponseMessage";
	MessageType["GROUP_INVITE"] = "groupInviteMessage";
	MessageType["POLL"] = "pollCreationMessage";
	MessageType["POLL_CREATION"] = "pollCreationMessageV3";
	MessageType["POLL_UPDATE"] = "pollUpdateMessage";
	MessageType["VIEW_ONCE"] = "viewOnceMessage";
	MessageType["UNKNOWN"] = "unknown";
	return MessageType;
}({});
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
/**
* Utility function to discover the type of a GenericMessage
* @param message - The GenericMessage to analyze
* @returns MessageType enum value indicating the message type
*
* @example
* ```typescript
* import { discoverMessageType, MessageType } from "wuzapi";
*
* const messageType = discoverMessageType(webhookPayload.event.Message);
*
* switch (messageType) {
*   case MessageType.IMAGE:
*     console.log("Received an image message");
*     break;
*   case MessageType.EXTENDED_TEXT:
*     console.log("Received a text message");
*     break;
*   // ... handle other types
* }
* ```
*/
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
//#endregion
Object.defineProperty(exports, "MessageType", {
	enumerable: true,
	get: function() {
		return MessageType;
	}
});
Object.defineProperty(exports, "WEBHOOK_EVENTS", {
	enumerable: true,
	get: function() {
		return WEBHOOK_EVENTS;
	}
});
Object.defineProperty(exports, "WebhookEventType", {
	enumerable: true,
	get: function() {
		return WebhookEventType;
	}
});
Object.defineProperty(exports, "discoverMessageType", {
	enumerable: true,
	get: function() {
		return discoverMessageType;
	}
});
Object.defineProperty(exports, "hasBase64Media", {
	enumerable: true,
	get: function() {
		return hasBase64Media;
	}
});
Object.defineProperty(exports, "hasBothMedia", {
	enumerable: true,
	get: function() {
		return hasBothMedia;
	}
});
Object.defineProperty(exports, "hasS3Media", {
	enumerable: true,
	get: function() {
		return hasS3Media;
	}
});
Object.defineProperty(exports, "isValidWebhookPayload", {
	enumerable: true,
	get: function() {
		return isValidWebhookPayload;
	}
});
Object.defineProperty(exports, "isWebhookEventType", {
	enumerable: true,
	get: function() {
		return isWebhookEventType;
	}
});

//# sourceMappingURL=webhook.js.map