import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import path from "path"

loadEnv(process.env.NODE_ENV || 'production', process.cwd())

export default defineConfig({

  admin: {
    disable: process.env.ADMIN_DISABLED === "true" ||
      false,
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.NODE_ENV !== "development" ?
      { connection: { ssl: { rejectUnauthorized: false } } } : {},
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
    redisUrl: process.env.REDIS_URL,
    /* cookieOptions: {
      secure: "boolean",
    }, */

    
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
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
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: { 
        redisUrl: process.env.CACHE_REDIS_URL,
      },
    },
  ],

 // ...existing code...



})
