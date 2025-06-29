import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

redis.on('connect', () => {
  console.log('[Redis] Conectado com sucesso');
});

redis.on('error', (err) => {
  console.error('[Redis] Erro de conexão:', err);
});

class CacheService {
  async set<T>(key: string, value: T, minutes = 60): Promise<void> {
    const data = JSON.stringify(value);
    await redis.set(key, data, 'EX', minutes);
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string): Promise<void> {
    await redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const exists = await redis.exists(key);
    return exists === 1;
  }
}

export const cache = new CacheService();
