import "./src/lib/env"

import withBundleAnalyzer from "@next/bundle-analyzer"
import { withSentryConfig } from "@sentry/nextjs"
import type { NextConfig } from "next"
import withNextIntl from "next-intl/plugin"
import { createSecureHeaders } from "next-secure-headers"

let config: NextConfig = {
  experimental: {
    reactCompiler: true,
  },

  // Enables hot reloading for local packages without a build step
  transpilePackages: [
    "geist",
    "@docbird/analytics",
    "@docbird/config",
    "@docbird/ui",
  ],

  // We already do linting and typechecking as separate tasks in CI
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  ...(process.env.VERCEL && {
    webpack: (webpackConfig) => {
      webpackConfig.module = {
        ...webpackConfig.module,
        exprContextCritical: false,
      }

      return webpackConfig
    },
  }),

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          // HSTS Preload: https://hstspreload.org/
          forceHTTPSRedirect: [
            true,
            { maxAge: 63_072_000, includeSubDomains: true, preload: true },
          ],
        }),
      },
    ]
  },

  async rewrites() {
    return [
      // for posthog proxy
      {
        source: "/_proxy/posthog/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/_proxy/posthog/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ]
  },
}

if (process.env.ANALYZE === "true") {
  config = withBundleAnalyzer()(config)
}

if (process.env.VERCEL) {
  config = withSentryConfig(config, {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: !process.env.CI,
    telemetry: false,
    widenClientFileUpload: true,
    tunnelRoute: "/_proxy/sentry",
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  })
}

export default withNextIntl("./src/lib/i18n/request.ts")(config)
