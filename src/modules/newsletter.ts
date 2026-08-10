import { BaseClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
import type { NewsletterListResponse } from "../types/newsletter.js";

export class NewsletterModule extends BaseClient {
  /**
   * List all subscribed newsletters
   */
  async list(options?: RequestOptions): Promise<NewsletterListResponse> {
    return this.get<NewsletterListResponse>("/newsletter/list", undefined, options);
  }
}