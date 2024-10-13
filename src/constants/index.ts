export const APP = {
  PORT: process.env.PORT || 8080,
  ENVIRONMENT: process.env.NODE_ENV || "development",
};

export const DATABASE = {
  URI: process.env.DATABASE_URI || "mongodb://localhost:27017/calo-jobs-db",
};

export const WHITELIST_IP = process.env.WHITELIST_IP || "";

export const REDIS = {
  HOST: process.env.REDIS_HOST || "localhost",
  PORT: process.env.REDIS_PORT || "6379",
};

export const UNSPLASH = {
  PHOTO_API:
    process.env.UNSPLASH_PHOTO_API || "https://api.unsplash.com/photos",
  CLIENT_ID: process.env.UNSPLASH_CLIENT_ID,
  PHOTO_TOPIC_ID: process.env.UNSPLASH_PHOTO_TOPIC_ID,
};
