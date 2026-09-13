import { BaseClient } from '../client.js';
import { RequestOptions } from '../types/common.js';
import { SetStatusTextResponse } from '../types/status.js';
export declare class StatusModule extends BaseClient {
    /**
     * Set status text message
     */
    setStatusText(body: string, options?: RequestOptions): Promise<SetStatusTextResponse>;
}
