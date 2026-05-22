import { describe, expect, it } from "vitest";
import { reserveBatchIfReady } from "./request-queue";

describe("reserveBatchIfReady", () => {
  it("returns null when fewer than 10 requests are pending", async () => {
    const result = await reserveBatchIfReady();
    expect(result).toBeNull();
  });

  it("reserves exactly 10 requests when the queue reaches 10", async () => {
    const result = await reserveBatchIfReady();
    expect(result?.requests).toHaveLength(10);
  });
});