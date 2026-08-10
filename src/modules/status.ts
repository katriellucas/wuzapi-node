import { BaseClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
import type { SetStatusTextRequest, SetStatusTextResponse } from "../types/status.js";

export class StatusModule extends BaseClient {
    /**
     * Set status text message
     */
    async setStatusText(
        body: string,
        options?: RequestOptions
    ): Promise<SetStatusTextResponse> {
        const request: SetStatusTextRequest = { Body: body };
        return this.post<SetStatusTextResponse>("/status/set/text", request, options);
    }
}
