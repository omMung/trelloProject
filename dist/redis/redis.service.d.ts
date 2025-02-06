import { ConfigService } from '@nestjs/config';
export declare class RedisService {
    private configService;
    private client;
    constructor(configService: ConfigService);
    set(key: string, value: string, expireSeconds?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
}
