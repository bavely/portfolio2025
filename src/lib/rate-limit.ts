// Fixed-window in-memory rate limiter.
//
// Scope note: state lives in the process, so on a serverless host each instance
// keeps its own counters and the effective limit is per-instance. That still
// blunts casual abuse, which is what this is for. If the contact form ever
// attracts real abuse, move these counters to a shared store (Firestore,
// Upstash, Vercel KV).

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 10_000;

function sweepExpired(now: number) {
  // `forEach` rather than `for...of`: the project compiles without
  // downlevelIteration, so iterating a Map directly is a type error.
  // Deleting during forEach is well defined.
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) buckets.delete(key);
  });
}

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets. Only meaningful when `allowed` is false. */
  retryAfterSeconds: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  // Bound memory growth: only sweep when the map is large, so the common path
  // stays O(1).
  if (buckets.size > MAX_TRACKED_KEYS) sweepExpired(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
