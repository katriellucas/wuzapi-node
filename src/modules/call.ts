import { BaseClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
import type { RejectCallRequest, RejectCallResponse } from "../types/call.js";

export class CallModule extends BaseClient {
    /**
     * Reject an incoming call
     */
    async rejectCall(
        callFrom: string,
        callId: string,
        options?: RequestOptions
    ): Promise<RejectCallResponse> {
        const request: RejectCallRequest = { call_from: callFrom, call_id: callId };
        return this.post<RejectCallResponse>("/call/reject", request, options);
    }
}
