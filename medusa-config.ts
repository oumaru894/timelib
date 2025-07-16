import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import path from "path"

loadEnv(process.env.NODE_ENV || 'production', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    
  },
  

  plugins: [

    {
      resolve: "file:src/modules/medusa-cod-payment-provider",
      options: {}
    }
  ],

 // ...existing code...



})
