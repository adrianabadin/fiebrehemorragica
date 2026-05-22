export class Mutex {
  private current = Promise.resolve();

  async runExclusive<T>(work: () => Promise<T>) {
    const previous = this.current;
    let release!: () => void;
    this.current = new Promise<void>((resolve) => {
      release = resolve;
    });

    await previous;
    try {
      return await work();
    } finally {
      release();
    }
  }
}

export const requestQueueMutex = new Mutex();