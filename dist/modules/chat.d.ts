import { BaseClient } from '../client.js';
import { RequestOptions } from '../types/common.js';
import { SendMessageResponse, SendTextRequest, SendTemplateRequest, SendAudioRequest, SendImageRequest, SendDocumentRequest, SendVideoRequest, SendStickerRequest, SendLocationRequest, SendContactRequest, ChatPresenceRequest, MarkReadRequest, MarkReadResponse, ReactRequest, DownloadMediaRequest, DownloadMediaResponse, DeleteMessageResponse, SendButtonsRequest, ListSection, GetChatHistoryResponse, RequestUnavailableMessageResponse, ArchiveChatResponse, SendPixRequest } from '../types/chat.js';
export declare class ChatModule extends BaseClient {
    /**
     * Send a text message
     */
    sendText(request: SendTextRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send a PIX payment request (URUPIX extension)
     */
    sendPix(request: SendPixRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send a template message with buttons
     */
    sendTemplate(request: SendTemplateRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send an audio message
     */
    sendAudio(request: SendAudioRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send an image message
     */
    sendImage(request: SendImageRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send a document message
     */
    sendDocument(request: SendDocumentRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send a video message
     */
    sendVideo(request: SendVideoRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send a sticker message
     */
    sendSticker(request: SendStickerRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send a location message
     */
    sendLocation(request: SendLocationRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send a contact message
     */
    sendContact(request: SendContactRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send chat presence indication (typing indicator)
     */
    sendPresence(request: ChatPresenceRequest, options?: RequestOptions): Promise<void>;
    /**
     * Mark messages as read
     */
    markRead(request: MarkReadRequest, options?: RequestOptions): Promise<MarkReadResponse>;
    /**
     * React to a message
     */
    react(request: ReactRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Download an image from a message
     */
    downloadImage(request: DownloadMediaRequest, options?: RequestOptions): Promise<DownloadMediaResponse>;
    /**
     * Download a video from a message
     */
    downloadVideo(request: DownloadMediaRequest, options?: RequestOptions): Promise<DownloadMediaResponse>;
    /**
     * Download an audio from a message
     */
    downloadAudio(request: DownloadMediaRequest, options?: RequestOptions): Promise<DownloadMediaResponse>;
    /**
     * Download a document from a message
     */
    downloadDocument(request: DownloadMediaRequest, options?: RequestOptions): Promise<DownloadMediaResponse>;
    /**
     * Delete (revoke for everyone) a message you sent.
     * Phone is the chat JID/number the message belongs to — required by the server.
     */
    deleteMessage(messageId: string, phone: string, options?: RequestOptions): Promise<DeleteMessageResponse>;
    /**
     * Send interactive buttons message
     */
    sendButtons(request: SendButtonsRequest, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send list message
     */
    sendList(phone: string, buttonText: string, description: string, topText: string, sections?: ListSection[], footerText?: string, id?: string, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Send poll message
     */
    sendPoll(groupJID: string, header: string, options: string[], id?: string, requestOptions?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Edit a message
     */
    editMessage(messageId: string, phone: string, newBody: string, options?: RequestOptions): Promise<SendMessageResponse>;
    /**
     * Get chat message history
     */
    getChatHistory(chatJid: string, params?: {
        limit?: number;
    }, options?: RequestOptions): Promise<GetChatHistoryResponse>;
    /**
     * Request a copy of a message that couldn't be decrypted
     */
    requestUnavailableMessage(chat: string, sender: string, messageId: string, options?: RequestOptions): Promise<RequestUnavailableMessageResponse>;
    /**
     * Archive or unarchive a chat
     */
    archiveChat(jid: string, archive: boolean, options?: RequestOptions): Promise<ArchiveChatResponse>;
    /**
     * Download a sticker from a message
     */
    downloadSticker(request: DownloadMediaRequest, options?: RequestOptions): Promise<DownloadMediaResponse>;
}
