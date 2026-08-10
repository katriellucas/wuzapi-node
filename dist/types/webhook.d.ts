import { VerifiedName } from './user.js';
export declare enum WebhookEventType {
    MESSAGE = "Message",
    UNDECRYPTABLE_MESSAGE = "UndecryptableMessage",
    RECEIPT = "Receipt",
    READ_RECEIPT = "ReadReceipt",
    MEDIA_RETRY = "MediaRetry",
    GROUP_INFO = "GroupInfo",
    JOINED_GROUP = "JoinedGroup",
    PICTURE = "Picture",
    BLOCKLIST_CHANGE = "BlocklistChange",
    BLOCKLIST = "Blocklist",
    CONNECTED = "Connected",
    DISCONNECTED = "Disconnected",
    CONNECT_FAILURE = "ConnectFailure",
    KEEP_ALIVE_RESTORED = "KeepAliveRestored",
    KEEP_ALIVE_TIMEOUT = "KeepAliveTimeout",
    LOGGED_OUT = "LoggedOut",
    CLIENT_OUTDATED = "ClientOutdated",
    TEMPORARY_BAN = "TemporaryBan",
    STREAM_ERROR = "StreamError",
    STREAM_REPLACED = "StreamReplaced",
    PAIR_SUCCESS = "PairSuccess",
    PAIR_ERROR = "PairError",
    QR = "QR",
    QR_SCANNED_WITHOUT_MULTIDEVICE = "QRScannedWithoutMultidevice",
    QR_TIMEOUT = "QRTimeout",
    PRIVACY_SETTINGS = "PrivacySettings",
    PUSH_NAME_SETTING = "PushNameSetting",
    USER_ABOUT = "UserAbout",
    APP_STATE = "AppState",
    APP_STATE_SYNC_COMPLETE = "AppStateSyncComplete",
    HISTORY_SYNC = "HistorySync",
    OFFLINE_SYNC_COMPLETED = "OfflineSyncCompleted",
    OFFLINE_SYNC_PREVIEW = "OfflineSyncPreview",
    CALL_OFFER = "CallOffer",
    CALL_ACCEPT = "CallAccept",
    CALL_TERMINATE = "CallTerminate",
    CALL_OFFER_NOTICE = "CallOfferNotice",
    CALL_RELAY_LATENCY = "CallRelayLatency",
    PRESENCE = "Presence",
    CHAT_PRESENCE = "ChatPresence",
    IDENTITY_CHANGE = "IdentityChange",
    CAT_REFRESH_ERROR = "CATRefreshError",
    NEWSLETTER_JOIN = "NewsletterJoin",
    NEWSLETTER_LEAVE = "NewsletterLeave",
    NEWSLETTER_MUTE_CHANGE = "NewsletterMuteChange",
    NEWSLETTER_LIVE_UPDATE = "NewsletterLiveUpdate",
    FB_MESSAGE = "FBMessage",
    ALL = "All"
}
export declare const WEBHOOK_EVENTS: WebhookEventType[];
export type WebhookEvent = keyof typeof WebhookEventType;
export interface SetWebhookRequest {
    webhook: string;
    events: (WebhookEvent | string)[];
}
export interface SetWebhookResponse {
    WebhookURL: string;
    Events: string[];
}
export interface GetWebhookResponse {
    subscribe: string[];
    webhook: string;
}
export interface UpdateWebhookRequest {
    webhook?: string;
    events?: (WebhookEvent | string)[];
    Active?: boolean;
}
export interface UpdateWebhookResponse {
    WebhookURL: string;
    Events: string[];
    active: boolean;
}
export interface DeleteWebhookResponse {
    Details: string;
}
export interface S3MediaInfo {
    url: string;
    key: string;
    bucket: string;
    size: number;
    mimeType: string;
    fileName: string;
}
export interface WebhookPayloadBase<T = unknown> {
    event: T;
    type: string;
    token: string;
    state?: string;
}
export interface WebhookPayload<T = unknown> extends WebhookPayloadBase<T> {
    s3?: S3MediaInfo;
    base64?: string;
    mimeType?: string;
    fileName?: string;
}
export interface S3OnlyWebhookPayload<T = unknown> extends WebhookPayloadBase<T> {
    s3: S3MediaInfo;
}
export interface Base64OnlyWebhookPayload<T = unknown> extends WebhookPayloadBase<T> {
    base64: string;
    mimeType: string;
    fileName: string;
}
export interface BothMediaWebhookPayload<T = unknown> extends WebhookPayloadBase<T> {
    s3: S3MediaInfo;
    base64: string;
    mimeType: string;
    fileName: string;
}
export type AnyWebhookPayload<T = unknown> = WebhookPayload<T> | S3OnlyWebhookPayload<T> | Base64OnlyWebhookPayload<T> | BothMediaWebhookPayload<T>;
export interface WebhookMessageContextInfo {
    deviceListMetadata?: WebhookDeviceListMetadata;
    deviceListMetadataVersion?: number;
    messageSecret?: string;
    limitSharingV2?: {
        initiatedByMe: boolean;
        trigger: number;
    };
}
export interface WebhookDeviceListMetadata {
    senderKeyHash?: string;
    senderTimestamp?: number;
    recipientKeyHash?: string;
    recipientTimestamp?: number;
    senderAccountType?: number;
    receiverAccountType?: number;
}
export interface WebhookContextInfo {
    disappearingMode?: {
        initiator: number;
        initiatedByMe?: boolean;
        trigger?: number;
    };
    ephemeralSettingTimestamp?: number;
    expiration?: number;
    forwardingScore?: number;
    isForwarded?: boolean;
    pairedMediaType?: number;
    statusSourceType?: number;
    featureEligibilities?: {
        canBeReshared?: boolean;
    };
}
export interface WebhookExtendedTextMessage {
    text: string;
    contextInfo?: WebhookContextInfo;
    inviteLinkGroupTypeV2?: number;
    previewType?: number;
}
export interface WebhookImageMessage {
    URL: string;
    JPEGThumbnail?: string;
    contextInfo?: WebhookContextInfo;
    directPath: string;
    fileEncSHA256: string;
    fileLength: number;
    fileSHA256: string;
    height: number;
    imageSourceType: number;
    mediaKey: string;
    mediaKeyTimestamp: number;
    midQualityFileSHA256: string;
    mimetype: string;
    scanLengths: number[];
    scansSidecar: string;
    firstScanLength?: number;
    firstScanSidecar?: string;
    width: number;
}
export interface WebhookVideoMessage {
    URL: string;
    JPEGThumbnail?: string;
    accessibilityLabel?: string;
    caption?: string;
    contextInfo?: WebhookContextInfo;
    directPath: string;
    externalShareFullVideoDurationInSeconds?: number;
    fileEncSHA256: string;
    fileLength: number;
    fileSHA256: string;
    gifAttribution?: number;
    gifPlayback?: boolean;
    height: number;
    mediaKey: string;
    mediaKeyTimestamp: number;
    mimetype: string;
    seconds: number;
    streamingSidecar?: string;
    thumbnailDirectPath?: string;
    thumbnailEncSHA256?: string;
    thumbnailSHA256?: string;
    videoSourceType?: number;
    width: number;
}
export interface WebhookAudioMessage {
    URL?: string;
    contextInfo?: WebhookContextInfo;
    directPath?: string;
    fileEncSHA256?: string;
    fileLength?: number;
    fileSHA256?: string;
    mediaKey?: string;
    mediaKeyTimestamp?: number;
    mimetype?: string;
    seconds?: number;
    ptt?: boolean;
    streamingSidecar?: string;
    waveform?: string;
}
export interface WebhookDocumentMessage {
    URL: string;
    contactVcard: boolean;
    contextInfo?: WebhookContextInfo;
    directPath: string;
    fileEncSHA256: string;
    fileLength: number;
    fileName: string;
    fileSHA256: string;
    mediaKey: string;
    mediaKeyTimestamp: number;
    mimetype: string;
    pageCount?: number;
    title: string;
}
export interface WebhookContactMessage {
    contextInfo?: WebhookContextInfo;
    displayName: string;
    vcard: string;
}
export interface WebhookPollCreationMessageV3 {
    contextInfo?: WebhookContextInfo;
    name: string;
    options: Array<{
        optionHash: string;
        optionName: string;
    }>;
    pollContentType: number;
    selectableOptionsCount: number;
}
export interface WebhookLocationMessage {
    JPEGThumbnail?: string;
    contextInfo?: WebhookContextInfo;
    degreesLatitude: number;
    degreesLongitude: number;
}
export interface WebhookStickerMessage {
    URL: string;
    contextInfo?: WebhookContextInfo;
    directPath: string;
    fileEncSHA256: string;
    fileLength: number;
    fileSHA256: string;
    firstFrameLength?: number;
    firstFrameSidecar?: string;
    height: number;
    isAiSticker?: boolean;
    isAnimated?: boolean;
    isAvatar?: boolean;
    isLottie?: boolean;
    mediaKey: string;
    mediaKeyTimestamp: number;
    mimetype: string;
    stickerSentTS?: number;
    width: number;
}
export interface WebhookReactionMessage {
    key: WebhookMessageKey;
    senderTimestampMS?: number;
    text?: string;
}
export interface WebhookEditedMessage {
    message?: unknown;
    timestampMS?: string;
    editedMessageID?: string;
}
export interface WebhookMessageKey {
    ID: string;
    fromMe: boolean;
    participant?: string;
    remoteJID: string;
}
export interface UserReceipt {
    userJID?: string;
    receiptTimestamp?: number;
    readTimestamp?: number;
    playedTimestamp?: number;
}
export interface WebhookReaction {
    key?: WebhookMessageKey;
    text?: string;
    senderTimestampMS?: number;
}
export interface WebhookGenericMessage {
    messageContextInfo?: WebhookMessageContextInfo;
    conversation?: string;
    extendedTextMessage?: WebhookExtendedTextMessage;
    imageMessage?: WebhookImageMessage;
    videoMessage?: WebhookVideoMessage;
    audioMessage?: WebhookAudioMessage;
    documentMessage?: WebhookDocumentMessage;
    contactMessage?: WebhookContactMessage;
    locationMessage?: WebhookLocationMessage;
    stickerMessage?: WebhookStickerMessage;
    reactionMessage?: WebhookReactionMessage;
    editedMessage?: WebhookEditedMessage;
    buttonsMessage?: unknown;
    listMessage?: unknown;
    templateMessage?: unknown;
    buttonsResponseMessage?: unknown;
    listResponseMessage?: unknown;
    groupInviteMessage?: unknown;
    pollCreationMessage?: unknown;
    pollCreationMessageV3?: WebhookPollCreationMessageV3;
    pollUpdateMessage?: unknown;
    viewOnceMessage?: unknown;
    protocolMessage?: {
        type?: number;
        editedMessage?: WebhookGenericMessage;
        key?: WebhookMessageKey;
        timestampMS?: number;
        historySyncNotification?: WebhookHistorySyncNotification;
        initialSecurityNotificationSettingSync?: {
            securityNotificationEnabled: boolean;
        };
    };
    deviceSentMessage?: {
        destinationJID: string;
        message: WebhookGenericMessage;
    };
}
export declare enum MessageType {
    TEXT = "conversation",
    EXTENDED_TEXT = "extendedTextMessage",
    IMAGE = "imageMessage",
    VIDEO = "videoMessage",
    AUDIO = "audioMessage",
    DOCUMENT = "documentMessage",
    CONTACT = "contactMessage",
    LOCATION = "locationMessage",
    STICKER = "stickerMessage",
    REACTION = "reactionMessage",
    EDITED = "editedMessage",
    PROTOCOL = "protocolMessage",
    DEVICE_SENT = "deviceSentMessage",
    BUTTONS = "buttonsMessage",
    LIST = "listMessage",
    TEMPLATE = "templateMessage",
    BUTTONS_RESPONSE = "buttonsResponseMessage",
    LIST_RESPONSE = "listResponseMessage",
    GROUP_INVITE = "groupInviteMessage",
    POLL = "pollCreationMessage",
    POLL_CREATION = "pollCreationMessageV3",
    POLL_UPDATE = "pollUpdateMessage",
    VIEW_ONCE = "viewOnceMessage",
    UNKNOWN = "unknown"
}
export interface WebhookHistorySyncNotification {
    chunkOrder?: number;
    directPath: string;
    encHandle: string;
    fileEncSHA256: string;
    fileLength: number;
    fileSHA256: string;
    mediaKey: string;
    progress?: number;
    syncType: number;
}
export interface QRWebhookEvent {
}
export interface QRTimeoutWebhookEvent {
}
export interface ConnectedWebhookEvent {
}
export interface ReadReceiptWebhookEvent {
    AddressingMode: string;
    BroadcastListOwner: string;
    Chat: string;
    IsFromMe: boolean;
    IsGroup: boolean;
    MessageIDs: string[];
    MessageSender: string;
    RecipientAlt: string;
    Sender: string;
    SenderAlt: string;
    Timestamp: string;
    Type: string;
}
export interface HistorySyncWebhookEvent {
    Data: {
        pastParticipants?: Array<{
            groupJID: string;
            pastParticipants: Array<{
                leaveReason: number;
                leaveTS: number;
                userJID: string;
            }>;
        }>;
        recentStickers?: Array<{
            URL: string;
            directPath: string;
            fileEncSHA256: string;
            fileLength: number;
            fileSHA256: string;
            height: number;
            isLottie: boolean;
            lastStickerSentTS: number;
            mediaKey: string;
            mimetype: string;
            weight: number;
            width: number;
        }>;
        statusV3Messages?: Array<{
            key: WebhookMessageKey;
            message: WebhookGenericMessage;
            messageTimestamp: number;
            participant: string;
            reportingTokenInfo?: {
                reportingTag: string;
            };
        }>;
        conversations?: Array<{
            ID: string;
            messages: Array<{
                message: {
                    key: WebhookMessageKey;
                    message: WebhookGenericMessage;
                    messageTimestamp: number;
                    messageC2STimestamp?: number;
                    ephemeralStartTimestamp?: number;
                    originalSelfAuthorUserJIDString?: string;
                    status?: number;
                    userReceipt?: UserReceipt[];
                    reactions?: WebhookReaction[];
                    reportingTokenInfo?: {
                        reportingTag: string;
                    };
                };
                msgOrderID: number;
            }>;
        }>;
        phoneNumberToLidMappings?: Array<{
            lidJID: string;
            pnJID: string;
        }>;
        chunkOrder?: number;
        progress?: number;
        syncType: number;
    };
}
export interface MessageWebhookEvent {
    Info: {
        AddressingMode: string;
        BroadcastListOwner: string;
        Category: string;
        Chat: string;
        DeviceSentMeta: {
            DestinationJID: string;
            Phash: string;
        } | null;
        Edit: string;
        ID: string;
        IsFromMe: boolean;
        IsGroup: boolean;
        MediaType: string;
        MsgBotInfo: {
            EditSenderTimestampMS: string;
            EditTargetID: string;
            EditType: string;
        };
        MsgMetaInfo: {
            DeprecatedLIDSession: unknown | null;
            TargetID: string;
            TargetSender: string;
            ThreadMessageID: string;
            ThreadMessageSenderJID: string;
        };
        Multicast: boolean;
        PushName: string;
        RecipientAlt: string;
        Sender: string;
        SenderAlt: string;
        ServerID: number;
        Timestamp: string;
        Type: string;
        VerifiedName: VerifiedName | null;
    };
    IsDocumentWithCaption: boolean;
    IsEdit: boolean;
    IsEphemeral: boolean;
    IsLottieSticker: boolean;
    IsViewOnce: boolean;
    IsViewOnceV2: boolean;
    IsViewOnceV2Extension: boolean;
    Message: WebhookGenericMessage;
    NewsletterMeta: unknown | null;
    RawMessage: WebhookGenericMessage;
    RetryCount: number;
    SourceWebMsg: unknown | null;
    UnavailableRequestID: string;
}
export type QRWebhookPayload = AnyWebhookPayload<QRWebhookEvent> & {
    qrCodeBase64: string;
};
export type QRTimeoutWebhookPayload = AnyWebhookPayload<QRTimeoutWebhookEvent>;
export type ConnectedWebhookPayload = AnyWebhookPayload<ConnectedWebhookEvent>;
export type ReadReceiptWebhookPayload = AnyWebhookPayload<ReadReceiptWebhookEvent>;
export type HistorySyncWebhookPayload = AnyWebhookPayload<HistorySyncWebhookEvent>;
export type MessageWebhookPayload = AnyWebhookPayload<MessageWebhookEvent>;
export interface WebhookEventMap {
    QR: QRWebhookEvent;
    QRTimeout: QRTimeoutWebhookEvent;
    Connected: ConnectedWebhookEvent;
    ReadReceipt: ReadReceiptWebhookEvent;
    HistorySync: HistorySyncWebhookEvent;
    Message: MessageWebhookEvent;
}
export type WebhookEventHandler<T extends keyof WebhookEventMap> = (payload: AnyWebhookPayload<WebhookEventMap[T]>) => void | Promise<void>;
export type SpecificWebhookPayload = QRWebhookPayload | QRTimeoutWebhookPayload | ConnectedWebhookPayload | ReadReceiptWebhookPayload | HistorySyncWebhookPayload | MessageWebhookPayload;
export declare function isWebhookEventType<T extends keyof WebhookEventMap>(payload: WebhookPayloadBase, eventType: T): payload is AnyWebhookPayload<WebhookEventMap[T]>;
export declare function hasS3Media(payload: WebhookPayloadBase): payload is S3OnlyWebhookPayload | BothMediaWebhookPayload;
export declare function hasBase64Media(payload: WebhookPayloadBase): payload is Base64OnlyWebhookPayload | BothMediaWebhookPayload;
export declare function hasBothMedia(payload: WebhookPayloadBase): payload is BothMediaWebhookPayload;
export declare function isValidWebhookPayload(payload: unknown): payload is WebhookPayloadBase;
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
export declare function discoverMessageType(message: WebhookGenericMessage): MessageType;
