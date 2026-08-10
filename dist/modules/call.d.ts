import { BaseClient } from '../client.js';
import { RequestOptions } from '../types/common.js';
import { RejectCallResponse } from '../types/call.js';
export declare class CallModule extends BaseClient {
    /**
     * Reject an incoming call
     */
    rejectCall(callFrom: string, callId: string, options?: RequestOptions): Promise<RejectCallResponse>;
}
