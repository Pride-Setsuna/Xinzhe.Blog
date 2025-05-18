const notionCache = new Map();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchNotionSmart(key, fetcher, { retries = 3, delay = 1000, throttle = 300 } = {}) {
  if (notionCache.has(key)) {
    return notionCache.get(key);
  }
  for (let i = 0; i < retries; i++) {
    try {
      if (throttle > 0) await sleep(throttle);
      const data = await fetcher();
      notionCache.set(key, data);
      return data;
    } catch (err) {
      if (err.status === 429 || (err.message && err.message.includes('429'))) {
        await sleep(delay);
      } else {
        throw err;
      }
    }
  }
  throw new Error('Too Many Requests: Notion API rate limit exceeded');
} 