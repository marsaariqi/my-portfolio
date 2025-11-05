// In-memory store for rate limiting: Map<IP_Address, { count: number, timer: NodeJS.Timeout }>
const rateLimitStore = new Map<
  string,
  { count: number; timer: NodeJS.Timeout }
>();

// --- Configuration ---
const MAX_REQUESTS = 3;
const TIME_WINDOW_MS = 60000;

interface RateLimitResult {
  isLimited: boolean;
  remaining: number;
}

/**
 * Checks if the given IP address is rate-limited.
 * @param ip The IP address of the client.
 * @returns An object indicating if the IP is limited and the remaining requests.
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const record = rateLimitStore.get(ip);

  // If no record exists, create a new one
  if (!record) {
    const newRecord = {
      count: 1,
      timer: setTimeout(() => {
        // Clear the record after the time window expires
        rateLimitStore.delete(ip);
      }, TIME_WINDOW_MS),
    };
    rateLimitStore.set(ip, newRecord);
    return { isLimited: false, remaining: MAX_REQUESTS - 1 };
  }

  // If the record exists, check the count
  if (record.count >= MAX_REQUESTS) {
    return { isLimited: true, remaining: 0 };
  }

  // Increment the count and reset the timer
  record.count++;

  // Refresh the timer to extend the window from the last request
  clearTimeout(record.timer);
  record.timer = setTimeout(() => {
    rateLimitStore.delete(ip);
  }, TIME_WINDOW_MS);

  return { isLimited: false, remaining: MAX_REQUESTS - record.count };
}
