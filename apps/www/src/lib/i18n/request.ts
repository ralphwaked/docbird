import { IntlErrorCode } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { headers } from "next/headers"

import { routing } from "~/lib/i18n/routing"

export default getRequestConfig(async ({ requestLocale }) => {
  const headersStore = await headers()

  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    // Ensure that a valid locale is used
    locale = routing.defaultLocale
  }

  const timezone = headersStore.get("x-vercel-ip-timezone")

  return {
    locale,
    timezone,
    messages: {
      ...(await import(`../../messages/${locale}.json`)).default,
      ...(await import(`../../messages/zod/${locale}.json`)).default,
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".")

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `${path} is not yet translated`
      }

      return `Dear developer, please fix this message: ${path}`
    },
  }
})
