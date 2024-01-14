import { Redis } from "ioredis";

const getRedisUrl = () => {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    return process.env.UPSTASH_REDIS_REST_URL;
  }
  throw new Error("Redis Url is not defined");
};

export const redis = new Redis(getRedisUrl());
