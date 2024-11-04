import { createEnv } from "@t3-oss/env-nextjs"
import { vercel } from "@t3-oss/env-nextjs/presets"
import { z } from "zod"

export const env = createEnv({
  extends: [vercel()],

  shared: {
    NODE_ENV: z
      .enum(["development", "preview", "production"])
      .default("development"),
  },

  server: {
    SENTRY_ORG: z.string(),
    SENTRY_PROJECT: z.string(),
    SENTRY_AUTH_TOKEN: z.string(),
  },

  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),

    NEXT_PUBLIC_SENTRY_DSN: z.string(),
  },

  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,

    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },

  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
})
