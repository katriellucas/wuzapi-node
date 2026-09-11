import { BaseClient } from '../client.js';
import { ConnectRequest, ConnectResponse, DisconnectResponse, LogoutResponse, StatusResponse, QRCodeResponse, S3TestResponse, PairPhoneResponse, HistoryResponse, ProxyResponse, HistoryCountResponse, HmacConfigResponse, HmacDeleteResponse, PasskeyStatusResponse, PasskeyResponseRequest, PasskeyResponseResult, PasskeyConfirmResult } from '../types/session.js';
import { S3Config, RequestOptions, S3ConfigResponse } from '../types/common.js';
export declare class SessionModule extends BaseClient {
    /**
     * Connect to WhatsApp servers
     */
    connect(request: ConnectRequest, options?: RequestOptions): Promise<ConnectResponse>;
    /**
     * Disconnect from WhatsApp servers.
     * @param clear also clear the stored event subscriptions (the server keeps them by default)
     */
    disconnect(clear?: boolean, options?: RequestOptions): Promise<DisconnectResponse>;
    /**
     * Logout and finish the session
     */
    logout(options?: RequestOptions): Promise<LogoutResponse>;
    /**
     * Get session status
     */
    getStatus(options?: RequestOptions): Promise<StatusResponse>;
    /**
     * Get QR code for scanning
     */
    getQRCode(options?: RequestOptions): Promise<QRCodeResponse>;
    /**
     * Configure S3 storage
     */
    configureS3(config: S3Config, options?: RequestOptions): Promise<S3ConfigResponse>;
    /**
     * Get S3 configuration
     */
    getS3Config(options?: RequestOptions): Promise<S3ConfigResponse>;
    /**
     * Test S3 connection
     */
    testS3(options?: RequestOptions): Promise<S3TestResponse>;
    /**
     * Delete S3 configuration
     */
    deleteS3Config(options?: RequestOptions): Promise<{
        Details: string;
    }>;
    /**
     * Pair phone using verification code
     */
    pairPhone(phone: string, options?: RequestOptions): Promise<PairPhoneResponse>;
    /**
     * Get pending passkey pairing status. Returns the WebAuthn challenge when
     * the device initiated passkey pairing instead of QR.
     */
    getPasskeyStatus(options?: RequestOptions): Promise<PasskeyStatusResponse>;
    /**
     * Complete passkey pairing by sending the WebAuthn response from the
     * authenticator, after receiving a `PasskeyRequest` webhook.
     */
    sendPasskeyResponse(request: PasskeyResponseRequest, options?: RequestOptions): Promise<PasskeyResponseResult>;
    /**
     * Confirm that the 8-character pairing code was displayed to the user and
     * matches the phone, after receiving a `PasskeyConfirmation` webhook.
     */
    confirmPasskey(options?: RequestOptions): Promise<PasskeyConfirmResult>;
    /**
     * Request history sync from WhatsApp servers
     */
    requestHistory(options?: RequestOptions): Promise<HistoryResponse>;
    /**
     * Set history count for WhatsApp synchronization
     */
    setHistoryCount(history: number, options?: RequestOptions): Promise<HistoryCountResponse>;
    /**
     * Set proxy configuration
     * @param webhookUseProxy route webhook deliveries through this proxy; omitted preserves the current per-user value
     */
    setProxy(proxyURL: string, enable?: boolean, webhookUseProxy?: boolean, options?: RequestOptions): Promise<ProxyResponse>;
    /**
     * Configure HMAC key for webhook signing
     */
    configureHmac(hmacKey: string, options?: RequestOptions): Promise<HmacConfigResponse>;
    /**
     * Get HMAC configuration status
     */
    getHmacConfig(options?: RequestOptions): Promise<HmacConfigResponse>;
    /**
     * Delete HMAC configuration
     */
    deleteHmacConfig(options?: RequestOptions): Promise<HmacDeleteResponse>;
}
