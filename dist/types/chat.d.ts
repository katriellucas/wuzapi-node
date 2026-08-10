import { SimpleContextInfo } from './common.js';
export interface SendMessageResponse {
    Details: string;
    Id: string;
    Timestamp: string;
}
export interface SendTextRequest {
    Phone: string;
    Body: string;
    Id?: string;
    ContextInfo?: SimpleContextInfo;
}
export interface TemplateButton {
    DisplayText: string;
    Type: "quickreply" | "url" | "call";
    Url?: string;
    PhoneNumber?: string;
}
export interface SendTemplateRequest {
    Phone: string;
    Content: string;
    Footer?: string;
    Buttons: TemplateButton[];
    ContextInfo?: SimpleContextInfo;
}
export interface SendAudioRequest {
    Phone: string;
    Audio: string;
    ContextInfo?: SimpleContextInfo;
}
export interface SendImageRequest {
    Phone: string;
    Image: string;
    Caption?: string;
    ContextInfo?: SimpleContextInfo;
}
export interface SendDocumentRequest {
    Phone: string;
    Document: string;
    FileName: string;
    ContextInfo?: SimpleContextInfo;
}
export interface SendVideoRequest {
    Phone: string;
    Video: string;
    Caption?: string;
    JpegThumbnail?: string;
    ContextInfo?: SimpleContextInfo;
}
export interface SendStickerRequest {
    Phone: string;
    Sticker: string;
    PngThumbnail?: string;
    ContextInfo?: SimpleContextInfo;
}
export interface SendLocationRequest {
    Phone: string;
    Latitude: number;
    Longitude: number;
    Name?: string;
    ContextInfo?: SimpleContextInfo;
}
export interface SendContactRequest {
    Phone: string;
    Name: string;
    Vcard: string;
    ContextInfo?: SimpleContextInfo;
}
export interface ChatPresenceRequest {
    Phone: string;
    State: "composing" | "paused";
    Media?: "audio";
}
export interface MarkReadRequest {
    id: string[];
    Chat: string;
    Sender?: string;
}
export interface MarkReadResponse {
    Details: string;
    success: boolean;
}
export interface ReactRequest {
    Phone: string;
    Body: string;
    Id: string;
}
export interface DownloadMediaRequest {
    Url: string;
    DirectPath: string;
    MediaKey: string;
    Mimetype: string;
    FileEncSHA256: string;
    FileSHA256: string;
    FileLength: number;
}
export interface DownloadMediaResponse {
    Data: string;
    Mimetype: string;
}
export interface DeleteMessageRequest {
    Phone: string;
    Id: string;
}
export interface DeleteMessageResponse {
    Details: string;
}
export interface ChatButton {
    ButtonId: string;
    ButtonText: {
        DisplayText: string;
    };
    Type: number;
}
export interface SendButtonsRequest {
    Phone: string;
    Body: string;
    Footer?: string;
    Buttons: ChatButton[];
    ContextInfo?: SimpleContextInfo;
}
export interface ListItem {
    Title: string;
    Desc?: string;
    RowId: string;
}
export interface ListSection {
    Title: string;
    Rows: ListItem[];
}
export interface SendListRequest {
    Phone: string;
    ButtonText: string;
    Desc: string;
    TopText: string;
    Sections?: ListSection[];
    List?: ListItem[];
    FooterText?: string;
    Id?: string;
}
export interface ChatPollOption {
    Name: string;
}
export interface SendPollRequest {
    Group: string;
    Header: string;
    Options: string[];
    Id?: string;
}
export interface EditMessageRequest {
    Id: string;
    Phone: string;
    Body: string;
}
export interface GetChatHistoryRequest {
    Chat: string;
    Limit?: number;
}
export interface HistoryMessage {
    chat_jid: string;
    id: number;
    media_link: string;
    message_id: string;
    message_type: string;
    sender_jid: string;
    text_content: string;
    timestamp: string;
    user_id: string;
}
export type GetChatHistoryResponse = HistoryMessage[];
export interface RequestUnavailableMessageRequest {
    chat: string;
    sender: string;
    id: string;
}
export interface RequestUnavailableMessageResponse {
    Details: string;
}
export interface ArchiveChatRequest {
    jid: string;
    archive: boolean;
}
export interface ArchiveChatResponse {
    Details: string;
}
export interface SendPixRequest {
    Phone: string;
    MerchantName: string;
    PixKey: string;
    PixKeyType?: "PHONE" | "CPF" | "CNPJ" | "EMAIL" | "EVP";
    Amount: number;
    Currency?: string;
    Id?: string;
}
