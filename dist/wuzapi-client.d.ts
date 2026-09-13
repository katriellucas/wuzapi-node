import { WuzapiConfig, RequestOptions } from './types/common.js';
import { AdminModule } from './modules/admin.js';
import { SessionModule } from './modules/session.js';
import { UserModule } from './modules/user.js';
import { ChatModule } from './modules/chat.js';
import { GroupModule } from './modules/group.js';
import { WebhookModule } from './modules/webhook.js';
import { NewsletterModule } from './modules/newsletter.js';
import { StatusModule } from './modules/status.js';
import { CallModule } from './modules/call.js';
import { SystemModule } from './modules/system.js';
export declare class WuzapiClient {
    readonly admin: AdminModule;
    readonly session: SessionModule;
    readonly user: UserModule;
    readonly chat: ChatModule;
    readonly group: GroupModule;
    readonly webhook: WebhookModule;
    readonly newsletter: NewsletterModule;
    readonly status: StatusModule;
    readonly call: CallModule;
    readonly system: SystemModule;
    readonly users: UserModule;
    readonly message: ChatModule;
    constructor(config: WuzapiConfig);
    /**
     * Test connection to the API
     */
    ping(options?: RequestOptions): Promise<boolean>;
}
