import { ONE_SECOND } from '@/constants/time.constant';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TokenBucket, type ITokenBucketConstructor } from './token-bucket';

const BUCKET_CAPACITY = 5;

const makeSut = (params?: Partial<ITokenBucketConstructor>) => {
    return new TokenBucket({ capacity: BUCKET_CAPACITY, ...params });
};

describe('DataStructures - TokenBucket', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });


    it('should return true for isEmpty when capacity is 0', () => {
        const sut = makeSut({ capacity: 0 });

        expect(sut.isEmpty).toBe(true);
    });

    it('should return false for isEmpty when capacity is greater than 0', () => {
        const sut = makeSut();

        expect(sut.isEmpty).toBe(false);
    });

    it('should not allow withdrawal when bucket is empty', () => {
        const sut = makeSut({ capacity: 0 });

        expect(sut.withdraw()).toBe(false);
        expect(sut.getCurrentTokens()).toBe(0);
    });

    it('should allow withdrawal when bucket is not empty', () => {
        const sut = makeSut();

        expect(sut.withdraw()).toBe(true);
        expect(sut.getCurrentTokens()).toBe(BUCKET_CAPACITY - 1);
    });

    it('should refill tokens after the elapsed time', () => {
        const sut = makeSut();

        sut.withdraw();
        sut.withdraw();

        vi.advanceTimersByTime(ONE_SECOND);

        expect(sut.getCurrentTokens()).toBe(BUCKET_CAPACITY - 1);
    });

    it('should not exceed the bucket capacity when refilling', () => {
        const sut = makeSut({ fillRate: 10 });

        vi.advanceTimersByTime(ONE_SECOND);

        expect(sut.getCurrentTokens()).toBe(BUCKET_CAPACITY);
    });
});