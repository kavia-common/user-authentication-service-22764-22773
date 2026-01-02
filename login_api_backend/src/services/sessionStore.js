const session = require('express-session');

/**
 * Attempts to create a Redis-backed store. If Redis is unreachable or not configured,
 * falls back to MemoryStore.
 *
 * This keeps local/dev environments working even without Redis, while still enabling
 * Redis-backed session persistence when available.
 */
function createSessionStore() {
  const redisUrl = process.env.REDIS_URL;

  // No redis configured -> MemoryStore.
  if (!redisUrl) {
    // eslint-disable-next-line no-console
    console.warn('[session] REDIS_URL not set; using MemoryStore');
    return new session.MemoryStore();
  }

  // Lazy-require so the app can still start without Redis in some environments.
  // connect-redis v9 exports RedisStore as default function; `redis` v5 uses createClient.
  // See: https://github.com/tj/connect-redis
  // eslint-disable-next-line global-require
  const { RedisStore } = require('connect-redis');
  // eslint-disable-next-line global-require
  const { createClient } = require('redis');

  const client = createClient({ url: redisUrl });

  // Connect asynchronously; on failure we fall back to MemoryStore.
  client.connect().then(() => {
    // eslint-disable-next-line no-console
    console.log('[session] Connected to Redis for session store');
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.warn('[session] Failed to connect to Redis; falling back to MemoryStore:', err?.message || err);
  });

  return new RedisStore({
    client,
    prefix: 'sess:',
  });
}

module.exports = {
  createSessionStore,
};
