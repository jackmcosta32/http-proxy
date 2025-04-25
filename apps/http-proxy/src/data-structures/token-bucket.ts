import { ONE_SECOND } from "@/constants/time.constant";

export interface ITokenBucketConstructor {
    capacity: number;
    /**
     * The rate at which tokens are added to the bucket, in tokens per second.
     * @default 1
     */
    fillRate?: number;
}

export class TokenBucket {
    private tokens: number = 0;
    private readonly capacity: number;
    private readonly fillRate: number;
    private lastRefillTimestamp: number;

    constructor(params: ITokenBucketConstructor) {
        this.tokens = params.capacity;
        this.capacity = params.capacity;
        this.fillRate = params.fillRate ?? 1;
        this.lastRefillTimestamp = Date.now();
    }

    public get isEmpty(): boolean {
        return this.capacity === 0;
    }

    private refillTokens(): void {
        const currentTimestamp = Date.now();
        const elapsedTimestamp = currentTimestamp - this.lastRefillTimestamp;
        const earnedTokens = Math.floor((elapsedTimestamp / ONE_SECOND) * this.fillRate);

        this.tokens = Math.min(this.capacity, this.tokens + earnedTokens);
    }

    public getCurrentTokens(): number {
        if (this.tokens < this.capacity) this.refillTokens();        
        
        return this.tokens;
    }

    public withdraw(): boolean {
        if (this.tokens < this.capacity) this.refillTokens();
        
        if (this.isEmpty) return false;

        this.tokens = Math.max(0, this.tokens - 1);
        this.lastRefillTimestamp = Date.now();

        return true;
    }

}