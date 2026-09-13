import { BaseClient } from '../client.js';
import { RequestOptions } from '../types/common.js';
import { NewsletterListResponse } from '../types/newsletter.js';
export declare class NewsletterModule extends BaseClient {
    /**
     * List all subscribed newsletters
     */
    list(options?: RequestOptions): Promise<NewsletterListResponse>;
}
