export interface IBlockListEntry {
  reason?: string;
  timestamp: number;
  
  duration: number | true;
}

export class BlockList {
  private readonly blockList = new Map<string, IBlockListEntry>();

  private getRemainingBlockedTime(blockListEntry: IBlockListEntry, currentTimestamp: number = Date.now()) {
    const { duration, timestamp } = blockListEntry;

    if (duration === true) return true;

    const remainingTime = Math.max((timestamp + duration) - currentTimestamp, 0);

    return remainingTime;
  }

  public isBlocked(requestIdentifier: string) {
    const blockListEntry = this.blockList.get(requestIdentifier);

    if (!blockListEntry) return false;

    return Boolean(this.getRemainingBlockedTime(blockListEntry));
  }

  public block(requestIdentifier: string, options?: Partial<IBlockListEntry>) {
    const { reason, duration = true } = options ?? {};
    const currentTimestamp = Date.now();
    const blockListEntry = this.blockList.get(requestIdentifier);

    if (!blockListEntry) {
      this.blockList.set(requestIdentifier, {
        reason,
        duration,
        timestamp: currentTimestamp,
      });
      
      return;
    }

    const remainingTime = this.getRemainingBlockedTime(blockListEntry, currentTimestamp);
    
    if (duration === true || remainingTime === true) {
      blockListEntry.duration = true;
    } else {
      blockListEntry.duration = duration + remainingTime;
    }

    blockListEntry.timestamp = currentTimestamp;
    blockListEntry.reason = reason ?? blockListEntry.reason;
  }

  public unblock(requestIdentifier: string) {
    this.blockList.delete(requestIdentifier);
  }

  public getBlockListEntry(requestIdentifier: string) {
    const blockListEntry = this.blockList.get(requestIdentifier);

    if (!blockListEntry) return;

    const remainingTime = this.getRemainingBlockedTime(blockListEntry);
    
    if (remainingTime) return blockListEntry;
    
    this.unblock(requestIdentifier);
  }
}