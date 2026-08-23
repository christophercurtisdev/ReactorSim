class TickSystem {
  private static instance: TickSystem | null = null;
  private tickRate: number = 20;
  private tickInterval: number = 1000 / this.tickRate;
  private tickCount: number = 0;
  private animationFrameId: number | null = null;
  private lastTickTime: number = 0;
  private accumulator: number = 0;
  private isRunning: boolean = false;
  private tickListeners: Set<(tickCount: number) => void> = new Set();
  private stopStartListeners: Set<(isRunning: boolean) => void> = new Set();

  private constructor(tickRate: number = 20) {
    this.tickRate = tickRate;
    this.tickInterval = 1000 / tickRate;
  }

  /**
   * Get the singleton instance
   */
  static getInstance(tickRate: number = 20): TickSystem {
    if (TickSystem.instance === null) {
      TickSystem.instance = new TickSystem(tickRate);
    }
    return TickSystem.instance;
  }

  /**
   * Start the tick system
   */
  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTickTime = performance.now();
      this.accumulator = 0;

      this.notifyStopStartListeners();

      const loop = (currentTime: number) => {
        const deltaTime = currentTime - this.lastTickTime;
        this.lastTickTime = currentTime;

        this.accumulator += deltaTime;

        while (this.accumulator >= this.tickInterval) {
          this.tickCount++;
          this.notifyTickListeners();
          this.accumulator -= this.tickInterval;
        }

        this.animationFrameId = requestAnimationFrame(loop);
      };

      this.animationFrameId = requestAnimationFrame(loop);
    }
  }

  /**
   * Stop the tick system
   */
  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isRunning = false;
    this.notifyStopStartListeners();
  }

  /**
   * Subscribe to tick events
   */
  subscribeToTickEvents(listener: (tickCount: number) => void): () => void {
    this.tickListeners.add(listener);

    // Return unsubscribe function
    return () => {
      this.tickListeners.delete(listener);
    };
  }

  /**
   * Subscribe to stop and start events
   */
  subscribeToStopStartEvents(listener: (isRunning: boolean) => void): () => void {
    this.stopStartListeners.add(listener);

    // Return unsubscribe function
    return () => {
      this.stopStartListeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of a tick
   */
  private notifyTickListeners(): void {
    this.tickListeners.forEach((listener) => listener(this.tickCount));
  }

  private notifyStopStartListeners(): void {
    this.stopStartListeners.forEach((listener) => listener(this.isRunning));
  }

  /**
   * Get the current tick count
   */
  getCurrentTick(): number {
    return this.tickCount;
  }

  /**
   * Check if the system is running
   */
  isSystemRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Reset the tick count
   */
  reset(): void {
    this.tickCount = 0;
    this.accumulator = 0;
    this.lastTickTime = performance.now();
  }

  /**
   * Get the current tick rate
   */
  getTickRate(): number {
    return this.tickRate;
  }
}

export default TickSystem;