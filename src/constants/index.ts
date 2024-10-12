export const APP = {
  PORT: process.env.PORT || 8080,
  ENVIRONMENT: process.env.NODE_ENV || "development",
};

export const DATABASE = {
  URI: process.env.DATABASE_URI || "mongodb://localhost:27017",
};

export const WHITELIST_IP = process.env.WHITELIST_IP || "";
