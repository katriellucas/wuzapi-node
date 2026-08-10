import { BaseClient } from '../client.js';
import { ConnectRequest, ConnectResponse, DisconnectResponse, LogoutResponse, StatusResponse, QRCodeResponse, S3TestResponse, PairPhoneResponse, HistoryResponse, ProxyResponse, HistoryCountResponse, HmacConfigResponse, HmacDeleteResponse, PasskeyStatusResponse } from '../types/session.js';
import { S3Config, RequestOptions, S3ConfigResponse } from '../types/common.js';
export declare class SessionModule extends BaseClient {
    /**
     * Connect to WhatsApp servers
     */
    connect(request: ConnectRequest, options?: RequestOptions): Promise<ConnectResponse>;
    /**
     * Disconnect from WhatsApp servers
     */
    disconnect(options?: RequestOptions): Promise<DisconnectResponse>;
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
     * Request history sync from WhatsApp servers
     */
    requestHistory(options?: RequestOptions): Promise<HistoryResponse>;
    /**
     * Set history count for WhatsApp synchronization
     */
    setHistoryCount(history: number, options?: RequestOptions): Promise<HistoryCountResponse>;
    /**
     * Set proxy configuration
     */
    setProxy(proxyURL: string, enable?: boolean, options?: RequestOptions): Promise<ProxyResponse>;
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
    /**
     * Get passkey status
     */
    getPasskeyStatus(options?: RequestOptions): Promise<PasskeyStatusResponse>;
}
