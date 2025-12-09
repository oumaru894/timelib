const { loadEnv, defineConfig } = require("@medusajs/framework/utils");
const path = require("path");

loadEnv(process.env.NODE_ENV || "production", process.cwd());

module.exports = defineConfig({
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true" || false,
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions:
      process.env.NODE_ENV !== "development"
        ? { connection: { ssl: { rejectUnauthorized: false } } }
        : {},
    workerMode:
      (process.env.MEDUSA_WORKER_MODE && (process.env.MEDUSA_WORKER_MODE)) || "shared",
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
      cookieSecret: process.env.COOKIE_SECRET,
      authMethodsPerActor: {
        user: ["emailpass"],
        customer: ["emailpass", "google"],
      },
    },
  },

  modules: [
    // Product SEO plugin temporarily disabled: causes "No 'exports' main defined"
    // {
    //   resolve: "@tsc_tech/medusa-plugin-product-seo",
    //   options: {},
    // },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL || process.env.EVENTS_REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.CACHE_REDIS_URL || process.env.REDIS_URL,
      },
    },
    {
      resolve: "./src/modules/availability",
    },
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.MINIO_FILE_URL,
              access_key_id: process.env.MINIO_ACCESS_KEY,
              secret_access_key: process.env.MINIO_SECRET_KEY,
              region: process.env.MINIO_REGION,
              bucket: process.env.MINIO_BUCKET,
              endpoint: process.env.MINIO_ENDPOINT,
              prefix: "TimeLib",
              download_file_duration: 3600,
              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "./src/modules/resend",
            id: "resend",
            options: {
              channels: ["email"],
              api_key: process.env.RESEND_API_KEY,
              from: "TimeLib <order@timelib.com>",
              siteTitle: "TimeLib",
              companyName: "TimeLib",
              footerLinks: [
                { url: "https://timelib.com", label: "TimeLib" },
                { url: "https://instagram.com/timelib1/", label: "Instagram" },
                { url: "https://facebook.com/timelib/", label: "Facebook" },
              ],
            },
          },
        ],
      },
    },
  ],
});