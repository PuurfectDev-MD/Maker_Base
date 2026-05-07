import { Redis } from 'ioredis';
import { REDIS_URI } from '$env/static/private';

// This prevents Vite from creating a new connection on every file save
const globalForRedis = global as unknown as { redis: Redis };

export const redis = globalForRedis.redis || new Redis(REDIS_URI, {
    // CRITICAL: Stop the 26-second hang by timing out fast
    connectTimeout: 5000,
    commandTimeout: 5000,
    lazyConnect: true,
    maxRetriesPerRequest: 1
});

if (process.env.NODE_ENV !== 'production') {
    globalForRedis.redis = redis;
}