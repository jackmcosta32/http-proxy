import { BlockList } from './block-list';
import { describe, it, expect, vi } from 'vitest';
import { ONE_DAY } from '@/constants/time.constant';

const REQUEST_IDENTIFIER = 'test-id';

const makeSut = () => {
  return new BlockList();
};

describe('DataStructures - BlockList', () => {
  it('should allow blocking a request given its identifier', () => {
    const sut = makeSut();

    sut.block(REQUEST_IDENTIFIER);
    
    expect(sut.isBlocked(REQUEST_IDENTIFIER)).toBe(true);
  });

  it('should allow blocking a request with a custom duration', () => {
    const sut = makeSut();

    sut.block(REQUEST_IDENTIFIER, { duration: ONE_DAY });
    
    expect(sut.isBlocked(REQUEST_IDENTIFIER)).toBe(true);
  });

  it('should allow getting a block list entry', () => {
    const sut = makeSut();
    const reason = 'test-reason';
    const duration = ONE_DAY;

    sut.block(REQUEST_IDENTIFIER, { reason, duration });
    
    const blockListEntry = sut.getBlockListEntry(REQUEST_IDENTIFIER);
    
    expect(blockListEntry).toEqual({
      reason,
      duration,
      timestamp: expect.any(Number),
    });
  });

  describe('when getting the blocked status of a request...', () => {
    it('should return false for non-blocked identifier', () => {
      const sut = makeSut();

      expect(sut.isBlocked(REQUEST_IDENTIFIER)).toBe(false);
    });

    it('should return true for blocked identifier', () => {
      const sut = makeSut();

      sut.block(REQUEST_IDENTIFIER);
      
      expect(sut.isBlocked(REQUEST_IDENTIFIER)).toBe(true);
    });

    it('should return false after block duration expires', () => {
      vi.useFakeTimers();
      
      const sut = makeSut();
      const blockDuration = 1000;

      sut.block(REQUEST_IDENTIFIER, { duration: blockDuration });
      
      expect(sut.isBlocked(REQUEST_IDENTIFIER)).toBe(true);
      
      vi.advanceTimersByTime(blockDuration + 1);
      
      expect(sut.isBlocked(REQUEST_IDENTIFIER)).toBe(false);
      
      vi.useRealTimers();
    });

    it('should always return true for permanent blocks', () => {
      const sut = makeSut();

      sut.block(REQUEST_IDENTIFIER, { duration: true });
      
      expect(sut.isBlocked(REQUEST_IDENTIFIER)).toBe(true);
    });
  });

  describe('when blocking a request...', () => {
    it('should extend block duration when blocking already blocked identifier', () => {
      const sut = makeSut();

      sut.block(REQUEST_IDENTIFIER, { duration: ONE_DAY });
      sut.block(REQUEST_IDENTIFIER, { duration: ONE_DAY });
      
      const blockListEntry = sut.getBlockListEntry(REQUEST_IDENTIFIER);
      
      expect(blockListEntry?.duration).toBeCloseTo(2 * ONE_DAY);
    });

    it('should make block permanent when duration is true', () => {
      const sut = makeSut();

      sut.block(REQUEST_IDENTIFIER, { duration: ONE_DAY });
      sut.block(REQUEST_IDENTIFIER, { duration: true });
      
      const blockListEntry = sut.getBlockListEntry(REQUEST_IDENTIFIER);

      expect(sut.isBlocked(REQUEST_IDENTIFIER)).toBe(true);
      expect(blockListEntry?.duration).toEqual(true);
    });
  });
});
